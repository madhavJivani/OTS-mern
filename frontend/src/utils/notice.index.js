import axios from 'axios';
const server = 'http://localhost:8000';

export const create_notice = async (formData) => { 
    const url = `${server}/api/v1/notices/create-notice`
    try {
        const response = await axios.post(url, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Error in create_notice:", error);
        return error.response.data;
    }
};

export const get_notices = async () => { 
    const url = `${server}/api/v1/notices/get-notices`
    try {
        const response = await axios.get(url,{
            withCredentials: true,
        });
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log("Error in get_notices:", error);
        return error.response.data;
    }
}

export const get_notice = async (id) => { 
    const url = `${server}/api/v1/notices/get-notice/${id}`
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log("Error in getting single notice:", error);
        return error.response.data;
    }
}
