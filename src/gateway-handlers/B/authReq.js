import "dotenv/config";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";
import {createNewCharity,getCharityById} from "./charityReq.js";
import {createNewDonor,getDonorById} from "./donorReq.js";
// Login User
export const loginUser = async (req, res) => {
  try {
    const {userType, username, password } = req.body;

    const response = await sendKafkaMessageWithResponse("login-request", {
      action: "LOGIN",
      data: { username, password },
    });

    // Response should include userdata and JWE
    const { userId, JWE } = response;
    switch(userType){
      case "donor":
        await getDonorById(response.userId,res);
        break;
      case "charity":
        await getCharityById(response.userId,res);
        break;
    }
    res.json({ requestId, userId, JWE }); // Return the ID in the response

  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const {userType, username, password, email } = req.body;

    // Generate a unique ID for the request

    const response = await sendKafkaMessageWithResponse("register-request", {
      action: "REGISTER",
      data: { username, password, email },
    });

    // Response should include JWE
    const { JWE } = response;
    switch(userType){
      case "donor":
        await createNewDonor(req,res);
        break;
      case "charity":
        await createNewCharity(req,res);
        break;
    }
    res.json({ requestId, JWE }); // Return the ID in the response
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};
