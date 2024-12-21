import axios from 'axios';

const server = 'http://localhost:8000';

export const registerRequest = async (formData) => {
    const register_url = `${server}/api/v1/users/register`;
    try {
        const response = await axios.post(register_url, formData, {
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
    const login_url = 'http://localhost:8000/api/v1/users/login';
    try {
        // Send the login request
        const loginResponse = await axios.post(login_url, formData, {
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
    const logout_url = 'http://localhost:8000/api/v1/users/logout';
    try {
        // Send the login request
        const logoutResponse = await axios.post(logout_url, {}, {
            withCredentials: true,
        });
        console.log("Logout Response:", logoutResponse);
        return logoutResponse.data;
    } catch (loginError) {
        console.error("Login Error:", loginError);
        return { response: loginError.response?.data.error, success: false };
    }
};