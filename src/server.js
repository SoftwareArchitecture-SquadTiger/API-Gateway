import "dotenv/config";
import app from "./app.js";
import { runKafkaResponseConsumer } from "./services/kafkaServices.js";

const PORT = process.env.PORT;
const HOST = process.env.HOST;
const responseTopics = ["donor-response", "charity-response"]

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway running in http://${HOST}:${PORT}`);
});

runKafkaResponseConsumer(responseTopics).catch((error) => {
    console.error(`Error starting Kafka: ${error}`);
});





