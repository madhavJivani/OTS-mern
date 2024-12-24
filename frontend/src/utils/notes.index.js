import axios from 'axios';
const server = 'http://localhost:8000';

export const create_note = async (formData) => {
    let url = `${server}/api/v1/notes/create-`
    const { title, description, subject, option, materialUrl, materialFile } = formData;
    if (option === "self") { 
        url += "link";
        try {
            const response = await axios.post(url, { title, description, subject, material_url: materialUrl}, {
                withCredentials: true,
            });
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log("Error in create_note:", error);
            return error.response.data;
        }
    }
    else {
        url += "file";
        try {
            const response = await axios.post(url, { title, description, subject, material: materialFile }, {
                withCredentials: true,
            });
            // console.log(response);
            return response.data;
        } catch (error) {
            console.log("Error in create_note:", error);
            return error.response.data;
        }
    }
};

export const get_notes = async () => { 
    const url = `${server}/api/v1/notes/get-notes`
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });
        // console.log(response);
        return response.data;
    } catch (error) {
        console.log("Error in get_notes:", error);
        return error.response.data;
    }
}