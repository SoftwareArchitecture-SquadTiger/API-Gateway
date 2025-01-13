import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";
import { sendKafkaMessageWithResponse } from "../../services/kafkaServices.js";

// Login User
export const loginUser = async (req, res) => {
  try {
    const { userType, email, password } = req.body;
    console.log("User Type: ", userType);
    // Send a Kafka message to authenticate the user
    const response = await sendKafkaMessageWithResponse("login-request", {
      data: { userType, email, password },
    });
    // Check if login was successful and a JWE token is present
    if (response.status === "success") {
      const jwe = response.JWE; // Extract the JWE token from the response
      console.log("JWE: ", jwe);
      // Set the token as an HTTP-only cookie
      res.cookie('authToken', jwe, {
        httpOnly: true,
        secure: false, // Set to 'true' in production
        sameSite: 'Lax',
        path: '/', // Adjust as necessary
        maxAge: 24 * 60 * 60 * 1000,
      });   
      console.log("Cookie set");
      // Send a success response
      res.json({ status: "success"});
      console.log("Login successful");
    } else {
      res.status(401).json({ message: "Login failed", details: response.details });
    }
  } catch (error) {
    // Handle errors and send appropriate response
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

export const logoutUser = async (req, res) => {
  try {
    // Clear the auth token cookie
    res.clearCookie('authToken');
    res.json({ status: "success" });
  } catch (error) {
    handleAxiosErrorResponse(error, res);
  }
};

export const validateToken = async (req, res) => {
  const token = req.cookies.authToken; // Access the cookie
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
    res.status(200).json({ message: 'Authenticated', user: decoded });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};
