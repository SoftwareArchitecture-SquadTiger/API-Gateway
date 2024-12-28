import "dotenv/config";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

// Login User
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const response = await sendKafkaMessageWithResponse("login-request", {
      action: "LOGIN",
      data: { username, password },
    });

    // Response should include userdata and JWE
    const { userdata, JWE } = response;
    res.json({ requestId, userdata, JWE }); // Return the ID in the response
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Generate a unique ID for the request

    const response = await sendKafkaMessageWithResponse("register-request", {
      action: "REGISTER",
      data: { username, password, email },
    });

    // Response should include JWE
    const { JWE } = response;
    res.json({ requestId, JWE }); // Return the ID in the response
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
