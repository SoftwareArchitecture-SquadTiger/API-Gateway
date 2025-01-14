import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import crypto from "crypto";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

// Initiate a new payment
export const initiatePayment = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/payments`, req.body);

        if (response.data && response.data.approvalUrl) {
            res.status(200).json({ approvalUrl: response.data.approvalUrl });
        } else {
            res.status(500).json({
                error: {
                    code: "PAYMENT_INITIATION_FAILED",
                    message: "Failed to initiate payment: approvalUrl not found",
                },
            });
        }
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

// Capture a PayPal payment (Used internally by handlePaypalWebhook)
export const capturePayment = async (orderId) => {
    try {
        const response = await axios.post(
            `${TEAM_A_BASE_URL}/api/payments/capture`,
            { orderId }
        );
        return response.data; // Return the response from Team A
    } catch (error) {
        console.error("Error capturing payment:", error);
        throw new Error("Failed to capture payment"); // Re-throw for handling in webhook
    }
};

// Handle PayPal Webhook
export const handlePaypalWebhook = async (req, res, next) => {
    try {
        // 1. Verify the webhook signature (IMPORTANT!)
        const signature = req.headers["paypal-transmission-sig"];
        const timestamp = req.headers["paypal-transmission-time"];
        const webhookId = process.env.PAYPAL_WEBHOOK_ID; // Store securely!
        const eventBody = JSON.stringify(req.body);

        const verificationString = `${timestamp}|${webhookId}|${eventBody}`;
        const secret = process.env.PAYPAL_WEBHOOK_SECRET; // Store securely!
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(verificationString);
        const expectedSignature = hmac.digest("hex");

        if (signature !== expectedSignature) {
            console.error("Invalid PayPal webhook signature!");
            return res.status(401).send("Invalid signature");
        }

        // 2. Extract relevant data
        const eventType = req.body.event_type;
        const resource = req.body.resource;

        // 3. Handle event types
        switch (eventType) {
            case "CHECKOUT.ORDER.APPROVED":
                console.log("Checkout order approved:", resource);
                break;

            case "PAYMENT.CAPTURE.COMPLETED":
                const orderId = resource.supplementary_data.related_ids.order_id;
                console.log(`Payment captured for Order ID: ${orderId}`);

                // Capture the payment
                const paymentResponse = await capturePayment(orderId);

                if (paymentResponse.status !== "completed") {
                    console.error(
                        `Payment capture failed for Order ID: ${orderId}`,
                        paymentResponse
                    );
                } else {
                    console.log("Payment captured successfully.");
                    // Trigger donation creation (either here or via another webhook/event)
                }
                break;

            case "PAYMENT.CAPTURE.DENIED":
            case "PAYMENT.CAPTURE.FAILED":
            case "PAYMENT.CAPTURE.PENDING":
                console.warn(`Payment status update required: ${eventType}`, resource);
                break;

            default:
                console.warn(`Unhandled PayPal webhook event type: ${eventType}`);
        }

        // 4. Acknowledge receipt
        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Error handling PayPal webhook:", error);
        res.status(500).json({
            error: { code: "WEBHOOK_ERROR", message: error.message },
        });
    }
};