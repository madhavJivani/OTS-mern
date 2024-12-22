import axios from 'axios';
const server = 'http://localhost:8000';


export const register_user = async (formData) => {
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

export const login_user = async (formData) => {
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

export const logout_user = async () => { 
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

export const get_user = async () => { 
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

export const update_avatar = async (formData) => { 
    const url = `${server}/api/v1/users/update-avatar`
    try {
        const response = axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(`Error in updateAvatar: ${error}`);
        return { response: error.response.data.error ,success: false};
    }
}

export const update_password = async (formData) => { 
    const url = `${server}/api/v1/users/change-password`
    try {
        const response = axios.post(url, formData, {
            withCredentials: true,
        })
        return response.data;
    } catch (error) {
        console.log(`Error in updatePassword: ${error}`);
        return { response: error.response.data.error , success: false};
    }
};

export const update_user_details = async (formData) => { 
    // expect either name or email or both
    const url = `${server}/api/v1/users/update-account`
    try {
        const response = axios.patch(url, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(`Error in updateUserDetails: ${error}`);
        return { response: error.response.data.error , success: false};
    }
};

export const refresh_tokens = async () => { 
    const url = `${server}/api/v1/users/refresh-tokens`
    try {
        const response = axios.post(url, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(`Error in refreshTokens: ${error}`);
        return { response: error.response.data.error , success: false};
    }
}