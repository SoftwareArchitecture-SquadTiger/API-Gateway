import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

// Login User
export const loginUser = async (req, res) => {
  try {
    const {userType, email, password } = req.body;
    const response = await sendKafkaMessageWithResponse("login-request", {
      data: {userType, email, password },
    });
    res.json(response); // Return the ID in the response
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { userType, password, email, ...userData } = req.body;

    // Prepare the message for the registration service
    const response = await sendKafkaMessageWithResponse("register-request", {
      data: { userType, password, email, ...userData },
    });

    res.json(response); // Return the ID in the response
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
