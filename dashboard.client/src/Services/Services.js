import axios from 'axios';

const BASE_URL = 'https://localhost:7084/api/';

const Services = {
    get: async (controller, id) => {
        try {
            const response = await axios.get(`${BASE_URL}${controller}${id ? `/${id}` : ''}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    update: async (controller, id, data) => {
        try {
            const response = await axios.put(`${BASE_URL}${controller}/${id}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    create: async (controller, data) => {
        try {
            const response = await axios.post(`${BASE_URL}${controller}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    delete: async (controller, id) => {
        try {
            const response = await axios.delete(`${BASE_URL}${controller}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getComputerName: async () => {
        try {
            const response = await axios.get(`${BASE_URL}$'sistema'`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getTableFields: async (tableName) => {
        try {
            const response = await axios.get(`${BASE_URL}reflection/${tableName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default Services;
