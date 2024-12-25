import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

/**
 * Encrypt a JWS token using JWE and return the encrypted token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const encryptUsingJWE = async (req, res) => {
    try {
        const { jws, entityId } = req.body;

        if (!jws || !entityId) {
            return res.status(400).json({ error: "JWS and entityId are required" });
        }

        // Forward the request to Team A's encryption API
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/jws/encrypt`, { jws, entityId });

        // Return the response from Team A's service
        res.status(response.status).json({ encryptedToken: response.data.encryptedToken });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Decrypt a JWE token and return the original JWS.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
export const decryptUsingJWE = async (req, res) => {
    try {
        const { encryptedToken, entityId } = req.body;

        if (!encryptedToken || !entityId) {
            return res.status(400).json({ error: "Encrypted token and entityId are required" });
        }

        // Forward the request to Team A's decryption API
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/jws/decrypt`, { encryptedToken, entityId });

        // Return the response from Team A's service
        res.status(response.status).json({ jws: response.data.jws });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};
/**
 * Generate a new key pair for a specific entity.
 */
export const generateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;

        const response = await axios.post(`${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`);
        res.status(response.status).json({ message: response.data.message });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Fetch the public key for a specific entity.
 */
export const fetchPublicKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;

        const response = await axios.get(`${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`);
        res.status(response.status).json({ publicKey: response.data.publicKey });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Fetch the private key for a specific entity.
 */
export const fetchPrivateKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;

        const response = await axios.get(`${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}/private`);
        res.status(response.status).json({ privateKey: response.data.privateKey });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Update the key pair for a specific entity.
 */
export const updateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;

        const response = await axios.put(`${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`);
        res.status(response.status).json({ message: response.data.message });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Delete the key pair for a specific entity.
 */
export const deleteKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;

        const response = await axios.delete(`${TEAM_A_BASE_URL}/api/keys/model/${model}/entity/${entityId}`);
        res.status(response.status).json({ message: response.data.message });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Encrypt data for a specific entity.
 */
export const encryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { data } = req.body;

        const response = await axios.post(`${TEAM_A_BASE_URL}/api/keys/encrypt/model/${model}/entity/${entityId}`, { data });
        res.status(response.status).json({ encryptedData: response.data.encryptedData });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

/**
 * Decrypt data for a specific entity.
 */
export const decryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { encryptedData } = req.body;

        const response = await axios.post(`${TEAM_A_BASE_URL}/api/keys/decrypt/model/${model}/entity/${entityId}`, { encryptedData });
        res.status(response.status).json({ decryptedData: response.data.decryptedData });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};



//get
export const getAllProjects = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects`);
        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};

export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/${id}`);

        res.status(response.status).json({ projectResponse: response.data })
    } catch (error) {
        handleAxiosErrorResponse(error, res);        
    }
};
export const getProjectByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/category/${category}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getCharityByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/charity/${id}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByTargetAmountGte = async (req, res, next) => {
    try {
        const { targetAmount } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/target-amount/gte/${targetAmount}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByTargetAmountLte = async (req, res, next) => {
    try {
        const { targetAmount } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/target-amount/lte/${targetAmount}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sortProjectByTargetAmountAsc = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/target-amount/asc`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sortProjectByTargetAmountDesc = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/target-amount/desc`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByCurrentAmountGte = async (req, res, next) => {
    try {
        const { currentAmount } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/current-amount/gte/${currentAmount}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByCurrentAmountLte = async (req, res, next) => {
    try {
        const { currentAmount } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/current-amount/lte/${currentAmount}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sortProjectByCurrentAmountAsc = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/current-amount/asc`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const sortProjectByCurrentAmountDesc = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/current-amount/desc`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const filterProjectByDate = async (req, res, next) => {
    try {
        const response = await axios.get(`${TEAM_A_BASE_URL}/from/${startDate}/to/${endDate}`);
        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByCountry = async (req, res, next) => {
    try {
        const { country } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/country/${country}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByCharityName = async (req, res, next) => { 
    try{
        const { charityName } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/charity-name/${charityName}`);
        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/title/${title}`);

        res.status(response.status).json({ projectResponse: response.data });
    }
    catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}
export const getProjectByRegion = async (req, res, next) => {
    try {
        const { region } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/region/${region}`);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}

export const getProjectByStatus = async (req, res, next) => {
    try {
        console.log('Request received:', req.params);
        const { status } = req.params;
        console.log('Status:', status);

        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/status/${status}`);
        console.log('Response received:', response);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        console.error('Error occurred:', error);
        handleAxiosErrorResponse(error, res);
    }
}

//post
export const createNewProject = async (req, res, next) => {
    try {
        const response = await axios.post(`${TEAM_A_BASE_URL}/api/projects`, req.body);


        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};
export const getProjectByCharityId = async (req, res, next) => { 
    try{
        const { charityId } = req.params;
        const response = await axios.get(`${TEAM_A_BASE_URL}/api/projects/charity/${charityId}`);
        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
}

//put
export const updateProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await axios.put(`${TEAM_A_BASE_URL}/api/projects/${id}`,req.body);

        res.status(response.status).json({ projectResponse: response.data });
    } catch (error) {
        handleAxiosErrorResponse(error, res);
    }
};
//delete
export const deleteProjectById = async (req, res, next) => {
    try{
        const { id } = req.params;
        const response = await axios.delete(`${TEAM_A_BASE_URL}/api/projects/${id}`);

    }catch(error){
        handleAxiosErrorResponse(error, res);
    }
};






