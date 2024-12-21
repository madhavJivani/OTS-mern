import axios from 'axios';

const server = 'http://localhost:8000';

export const registerRequest = async (formData) => {
    const url = `${server}/api/v1/users/register`;
    try {
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // never ignore this multipart header while sending files
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        // console.log(error);
        console.log(error.response.data.error); // --- perfect error msg
        // console.log(`Error in registerUser: ${error}`);
        return { response: error.response.data.error };
    }
}

export const loginRequest = async (formData) => {
    const url = 'http://localhost:8000/api/v1/users/login';
    try {
        // Send the login request
        const loginResponse = await axios.post(url, formData, {
            withCredentials: true,
        });
        // console.log("Login Response:", loginResponse);
        return loginResponse.data;
    } catch (loginError) {
        console.error("Login Error:", loginError);
        return { response: loginError.response?.data.error || "Login failed" };
    }
};

export const logoutUser = async () => { 
    const url = 'http://localhost:8000/api/v1/users/logout';
    try {
        // Send the login request
        const logoutResponse = await axios.post(url, {}, {
            withCredentials: true,
        });
        console.log("Logout Response:", logoutResponse);
        return logoutResponse.data;
    } catch (logoutError) {
        console.error("Login Error:", logoutError);
        return { response: logoutError.response?.data.error, success: false };
    }
};

export const getCurrentUser = async () => { 
    const url = `${server}/api/v1/users/current-user`
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });
        // console.log(response)
        return response.data;
    } catch (fetchUserError) {
        console.error("fetchUserError Error:", fetchUserError);
        return { response: fetchUserError.response?.data.error, success: false };
    }
};