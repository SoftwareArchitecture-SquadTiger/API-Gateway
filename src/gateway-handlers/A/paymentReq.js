import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

export const initiatePayment = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/payments`, req.body);
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}

export const capturePayment = async (req, res, next) => {
        try {
            // Extract the payment token (e.g., order ID) from the query parameters
            const { token } = req.query;
    
            // Forward the capture payment request to the appropriate service
            const response = await axios.get(`${TEAM_A_BASE_URL}/api/payments/capture`, { token });
    
            // Respond to the client with the status received from the payment service
            if (response.data.status === "completed") {
                res.status(200).json({ message: "Payment captured successfully" });
            } else {
                // Handle any failure response from the payment service
                res.status(500).json({ error: "Payment failed to capture" });
            }
        } catch (error) {
            console.error("Error capturing payment through API Gateway:", error);
            // Forward the error response to the client
            handleAxiosErrorResponse(error, res);
        }
    };
    export const handlePaypalWebhook = async (req, res, next) => {  
        try {
            // 1. Verify the webhook signature to ensure the request is from PayPal.
            // Use the PayPal SDK or a library to verify the signature. This step is essential for security.
    
            // 2. Extract relevant data from the webhook payload
            const eventType = req.body.event_type; // Event type (e.g., PAYMENT.CAPTURE.COMPLETED)
            const resource = req.body.resource;   // Event resource data
    
            // 3. Handle different event types
            switch (eventType) {
                case "CHECKOUT.ORDER.APPROVED":
                    // Event triggered when a user approves an order on PayPal
                    console.log("Checkout order approved:", resource);
                    break;
    
                case "PAYMENT.CAPTURE.COMPLETED":
                    // Event triggered when a payment is successfully captured
                    const orderId = resource.supplementary_data.related_ids.order_id;
                    console.log(`Payment captured for Order ID: ${orderId}`);
    
                    // Forward to the appropriate service or update the database
                    const captureResponse = await axios.post(`${TEAM_A_BASE_URL}/api/payments/capture`, { orderId });
                    
                    if (captureResponse.data.status === "completed") {
                        console.log(`Payment successfully captured for Order ID: ${orderId}`);
                    } else {
                        console.error(`Payment capture failed for Order ID: ${orderId}`);
                    }
                    break;
    
                case "PAYMENT.CAPTURE.DENIED":
                case "PAYMENT.CAPTURE.FAILED":
                case "PAYMENT.CAPTURE.PENDING":
                    // Handle failed, denied, or pending payments
                    console.warn(`Payment status update required: ${eventType}`, resource);
                    break;
    
                default:
                    // Log unhandled event types
                    console.warn(`Unhandled PayPal webhook event type: ${eventType}`);
            }
    
            // 4. Respond with a 200 OK status to acknowledge receipt of the webhook
            res.status(200).send("Webhook received");
        } catch (error) {
            // Handle errors and send a 500 response to indicate server issues
            console.error("Error handling PayPal webhook:", error);
            handleAxiosErrorResponse(error, res);
        }
    };