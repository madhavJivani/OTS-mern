import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null); // File input for avatar
    const [role, setRole] = useState("user"); // Default role
    const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility

    const registerRequest = async (formData) => { 
        const register_url = 'http://localhost:8000/api/v1/users/register';
        try {
            const response = await axios.post(register_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                // never ignore this multipart header while sending files
            });
            console.log(response.data);
            return response;
        } catch (error) {
            // console.log(error);
            console.log(error.response.data.error); // --- perfect error msg
            // console.log(`Error in registerUser: ${error}`);
            return {response: error.response.data.error};
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData;
        console.log(`Avatar: ${avatar}`);
        if (avatar) { 
            formData = { name, email, password, avatar, role };
        }
        else { 
            formData = { name, email, password, role };
        }

        // console.log("Signup form data:", formData);
        // console.log(name, email, password, avatar, role);
        // Add API call here
        const response = registerRequest(formData);
        // console.log(response);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };
    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101218]">
            <div className="bg-[#3c4352] text-[#fafafa] p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 bg-[#2d3343] text-[#fafafa] rounded-md focus:outline-none focus:ring focus:ring-[#6588cb]"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 bg-[#2d3343] text-[#fafafa] rounded-md focus:outline-none focus:ring focus:ring-[#6588cb]"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"} // Toggle password visibility
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-2 bg-[#2d3343] text-[#fafafa] rounded-md focus:outline-none focus:ring focus:ring-[#6588cb]"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                            >
                                {passwordVisible ? (
                                    <FaEyeSlash className="text-[#fafafa]" />
                                ) : (
                                    <FaEye className="text-[#fafafa]" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Avatar (optional)</label>
                        <div className="relative">
                            <label
                                htmlFor="avatar"
                                className="block w-full bg-[#6588cb] text-[#fafafa] py-2 text-center rounded-md cursor-pointer hover:bg-[#5774ad] transition"
                            >
                                {avatar ? avatar.name : "Choose File"}
                            </label>
                            <input
                                id="avatar"
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 bg-[#2d3343] text-[#fafafa] rounded-md focus:outline-none focus:ring focus:ring-[#6588cb]"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#6588cb] text-[#fafafa] py-2 rounded-md hover:bg-[#5774ad] transition"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#6588cb] hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
