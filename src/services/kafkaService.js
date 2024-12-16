import "dotenv/config";
import { Kafka } from 'kafkajs';

const BROKER_PORT = process.env.BROKER_PORT;

const kafka = new Kafka ({
  clientId: 'api-gateway',
  brokers: [`localhost:${BROKER_PORT}`],
});

const producer = kafka.producer();

export const sendKafkaMessage = async (topic, message) => {
    try {
        await producer.connect();
        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(message) }],
        });
        console.log(`Message sent to ${topic}`);
    } catch (error) {
        console.error(error);
    } finally {
        await producer.disconnect();
    }
};

