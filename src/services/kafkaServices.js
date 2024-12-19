import "dotenv/config";
import { Kafka, logLevel } from "kafkajs";
import { v4 as uuidv4 } from "uuid";
import { logKafkaMessage, formatKafkaLog } from "../utils/kafkaLogHandler.js";
import {
  addPendingRequest,
  deletePendingRequest,
  resolvePendingRequest,
} from "../utils/requestHandler.js";

const BROKER_PORT = process.env.BROKER_PORT;

const kafka = new Kafka({
  clientId: "api-gateway",
  brokers: [`localhost:${BROKER_PORT}`],
  logLevel: logLevel.INFO,
  logCreator: formatKafkaLog,
});

const producer = kafka.producer();
const consumer = kafka.consumer({
  groupId: "api-gateway",
  sessionTimeout: 10000, //Duration of Kafka waits to detect a dc consumer
  heartbeatInterval: 3000, //Sends heartbeat frequently to make sure consumer is alive
  rebalanceTimeout: 15000, //Duration of Kafka waits during a rebalance process
});

export const sendKafkaMessageWithResponse = async (topic, message) => {
  const correlationId = uuidv4();
  const timeoutMs = 20000; //The wait time for the response from kafka (20s)

  return new Promise(async (resolve, reject) => {
    const timeoutId = setTimeout(() => {
      deletePendingRequest(correlationId);
      reject(new Error(`Timeout: The consumer may not listening to Kafka`));
    }, timeoutMs);

    addPendingRequest(correlationId, resolve, timeoutId);

    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: JSON.stringify({ ...message, correlationId }) }],
      });
      logKafkaMessage("producer", topic, correlationId);
    } catch (error) {
      deletePendingRequest(correlationId); // Clean up on failure by deleting the stored id
      reject(error); // Reject the promise if sending fails
    } finally {
      await producer.disconnect();
    }
  });
};

export const runKafkaResponseConsumer = async (topics) => {
  try {
    await consumer.connect();

    await consumer.subscribe({ topics: topics, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        const { correlationId, ...response } = JSON.parse(
          message.value.toString()
        );

        logKafkaMessage("consumer", topic, correlationId);

        resolvePendingRequest(correlationId, response);
      },
    });
  } catch (error) {
    console.error(`Error running Kafka Response Consumer - ${error}`);
  }
};
