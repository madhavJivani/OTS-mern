import axios from 'axios';
const server = 'http://localhost:8000';

export const create_notice = async (formData) => { 
    const url = `{server}/api/v1/notices/create-notice`
    try {
        const response = axios.post(url, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Error in create_notice:", error);
        return { response: error.response.data.error, success: false };
    }
};

export const get_notices = async () => { 
    const url = `{server}/api/v1/notices/get-notices`
    try {
        const response = axios.get(url, {},{
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Error in get_notices:", error);
        return { response: error.response.data.error, success: false };
    }
}
