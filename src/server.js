import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`API Gateway running in http://${HOST}:${PORT}`);
});





