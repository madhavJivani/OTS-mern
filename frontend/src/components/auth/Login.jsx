import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loginRequest } from '../../utils/index.js'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../../store/func/userSlice.js'
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { email, password };
        // console.log("Login form data:", formData);
        // Add API call here
        const response = await loginRequest(formData);
        console.log(`response from loginRequest:`, response);
        
        if (response.success) {
            dispatch(loginUser(response.user));
            navigate("/");
        } else {
            alert("Login failed");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101218]">
            <div className="bg-[#3c4352] text-[#fafafa] p-8 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <button
                        type="submit"
                        className="w-full bg-[#6588cb] text-[#fafafa] py-2 rounded-md hover:bg-[#5774ad] transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#6588cb] hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
