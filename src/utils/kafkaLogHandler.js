import { getIndochinaTime } from "./timeFormat.js";

export const logKafkaMessage = (type, topic, correlationId) => {
  const timestamp = getIndochinaTime();

  console.log(
    `[${timestamp}] ${
      type === "producer" ? "Message Sent" : "Message Received"
    } | Topic: ${topic} | CorrelationID: ${correlationId}`
  );
};

export const formatKafkaLog = logCreator => {
  return ({ namespace, level, label, log }) => {
    const { message,  groupId} = log;
    const timestamp = getIndochinaTime();

    console.log(
      `[${timestamp}] Level: ${label.toUpperCase()} | Namespace: ${namespace} | Message: ${message} | GroupID: ${groupId}`
    );
  }
};