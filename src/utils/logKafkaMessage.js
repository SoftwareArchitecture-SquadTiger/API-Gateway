import { getIndochinaTime } from "./timeFormat.js";

export const logKafkaMessage = (type, topic, correlationId) => {
  const timestamp = getIndochinaTime();

  console.log(
    `[${timestamp}] ${
      type === "producer" ? "Message Sent" : "Message Received"
    } | Topic: ${topic} | CorrelationID: ${correlationId}`
  );
};
