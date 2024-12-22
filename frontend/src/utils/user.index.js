import axios from 'axios';
const server = 'http://localhost:8000';


export const register_user = async (formData) => {
    const url = `${server}/api/v1/users/register`;
    try {
        const registerResponse = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // never ignore this multipart header while sending files
        });
        // console.log(registerResponse.data);
        return registerResponse.data;
    } catch (registerError) {
        if (registerError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.log(registerError.response.data.error);
        return registerError.response.data;
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
        if (loginError.code === "ERR_NETWORK") { 
            return {error: "Network Error Please try again later", success: false};
        }
        console.log(`Login error response: `, loginError.response.data.error);
        return loginError.response.data;
    }
};

export const logout_user = async () => { 
    const url = 'http://localhost:8000/api/v1/users/logout';
    try {
        // Send the login request
        const logoutResponse = await axios.post(url, {}, {
            withCredentials: true,
        });
        // console.log("Logout Response:", logoutResponse);
        return logoutResponse.data;
    } catch (logoutError) {
        if (logoutError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.error("Logout Error:", logoutError);
        return logoutError.response.data;
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
        if (fetchUserError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.error("fetchUserError Error:", fetchUserError);
        return fetchUserError.response.data;
    }
};

export const update_avatar = async (formData) => { 
    // accept avatar as file only one file
    const url = `${server}/api/v1/users/update-avatar`
    try {
        const response = await axios.patch(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        if (response.data) {
            const userResponse = await get_user();
            return userResponse;
        }
        else { 
            return response.data;
        }
    } catch (avatarUpdateError) {
        if (avatarUpdateError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.log(`Error in updateAvatar: `, avatarUpdateError);
        return avatarUpdateError.response.data;
    }
}

export const update_password = async (formData) => { 
    // accept oldPassword and newPassword both compulsory
    const url = `${server}/api/v1/users/change-password`
    try {
        const response = await axios.post(url, formData, {
            withCredentials: true,
        })
        // console.log(response)
        return response.data;
    } catch (passwordUpdateError) {
        if (passwordUpdateError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.log(`Error in updatePassword: `, passwordUpdateError);
        return passwordUpdateError.response.data;
    }
};

export const update_user_details = async (formData) => { 
    // expect either name or email or both
    const url = `${server}/api/v1/users/update-account`
    try {
        const response = await axios.patch(url, formData, {
            withCredentials: true,
        });
        return response.data;
    } catch (detailsUpdateError) {
        if (detailsUpdateError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.log(`Error in updateUserDetails: `, detailsUpdateError);
        return detailsUpdateError.response.data;
    }
};

export const refresh_tokens = async () => { 
    const url = `${server}/api/v1/users/refresh-tokens`
    try {
        const response = await axios.post(url, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (refreshTokenError) {
        if (refreshTokenError.code === "ERR_NETWORK") {
            return { error: "Network Error Please try again later", success: false };
        }
        console.log(`Error in refreshTokens: `, refreshTokenError);
        return refreshTokenError.response.data;
    }
}

export const handle_login_request = async (formData) => { 
    try {
        const loginResponse = await login_user(formData);
        console.log(`loginResponse:`, loginResponse);
        if (loginResponse.success) {
            try {
                const getUserResponse = await get_user();
                console.log(`getUserResponse:`, getUserResponse);
                return getUserResponse;
            } catch (error) {
                console.log(`Error in getUserResponse from handle_login_request: ${error}`);
                return error.response.data;
            }
        }
        else { 
            return loginResponse;
        }
    } catch (error) {
        console.log(`Error in loginResponse from handle_login_request: ${error}`);
        return error.response.data;
    }
}

export const handle_signup_request = async (formData) => {
    try {
        const signupResponse = await register_user(formData);
        if (signupResponse.success) {
            try {
                const loginResponse = await login_user({ email: formData.email, password: formData.password });
                if (loginResponse.success) {
                    try {
                        const getUserResponse = await get_user();
                        return getUserResponse;
                    } catch (error) {
                        console.log(`Error in getUserResponse from handle_signup_request: ${error}`);
                        return error.response.data;
                    }
                }
                else { 
                    return loginResponse;
                }
            } catch (error) {
                console.log(`Error in loginResponse from handle_signup_request: ${error}`);
                return error.response.data;
            }
        }
        else { 
            return signupResponse;
        }
    } catch (error) {
        console.log(`Error in signupResponse from handle_signup_request: ${error}`);
        return error.response.data;
    }
}