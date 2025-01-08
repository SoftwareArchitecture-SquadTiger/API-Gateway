import axios from "axios";
import "dotenv/config";
import { handleAxiosErrorResponse } from "../../utils/errorHandler.js";

const HOST = process.env.HOST;
const PORT_A = process.env.TEAM_A_PORT;
const TEAM_A_BASE_URL = `http://${HOST}:${PORT_A}`;

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

        res.status(response.status).json({ projectResponse: "Project deleted!"})
    }catch(error){
        handleAxiosErrorResponse(error, res);
    }
};






