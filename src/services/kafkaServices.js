import "dotenv/config";
import { Kafka } from "kafkajs";
import { v4 as uuidv4 } from "uuid";

const BROKER_PORT = process.env.BROKER_PORT;

const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: [`localhost:${BROKER_PORT}`],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "api-gateway" });

//Pending reuqests map to track responses
const pendingRequests = new Map();

export const sendKafkaMessageWithResponse = async (topic, message) => {
  const correlationId = uuidv4();
  const timeout = 20000;

  return new Promise(async (resolve, reject) => {
    //Store pending requests
    pendingRequests.set(correlationId, {
      resolve,
      reject,
      timeoutId: setTimeout(() => {
        pendingRequests.delete(correlationId);
        reject(new Error("Timeout: No response from Kafka"));
      }, timeout),
    });

    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify({ ...message, correlationId }) }],
      });
      console.log(
        `Message sent to ${topic} with correlationId: ${correlationId}`
      );
    } catch (error) {
      pendingRequests.delete(correlationId); // Clean up on failure by deleting the stored id
      reject(error); // Reject the promise if sending fails
    } finally {
      await producer.disconnect();
    }
  });
};

export const runKafkaResponseConsumer = async (topic) => {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ message }) => {
        const { correlationId, ...response } = JSON.parse(
          message.value.toString()
        );

        if (pendingRequests.has(correlationId)) {
          const { resolve, timeoutId } = pendingRequests.get(correlationId);
          clearTimeout(timeoutId);
          pendingRequests.delete(correlationId);
          resolve(response);
        } else {
            console.warn(`No pending request found for correlationId: ${correlationId}`)
        }
      },
    });
  } catch (error) {
    console.error(`Error running Kafka Response Consumer: ${error}`);
  }
};
