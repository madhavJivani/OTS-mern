import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // For navigation
import { get_user, update_user_details } from '../../utils/user.index.js';
import { loginUser, logoutUser } from '../../../store/func/userSlice.js';
import { Loader } from '../index.js';
import { Link } from "react-router-dom";

const ChangeUserDetails = () => {
    const { user } = useSelector((state) => state.user);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Navigation function

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await update_user_details({ name, email });
        console.log(response);
        if (response.success) {
            toast.success(response.message);
            dispatch(loginUser({ ...user, name, email }));
        } else {
            toast.error(response.error || "Failed to update details");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await get_user();
            if (res.success) {
                dispatch(loginUser(res.user));
                setLoading(false);
            } else {
                toast.error("Failed to fetch user");
                dispatch(logoutUser());
                setLoading(false);
            }
        };
        fetchUser();
    }, [dispatch]);

    return (
        loading ? <Loader messages={["Fetching your info"]} /> :
            <div className="min-h-screen bg-[#101218] text-[#fafafa] py-8 px-4 relative">
                {/* Back Button */}
                <Link
                    to="/profile"
                    className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                    title="Back to Home"
                >
                    <FaArrowLeft size={18} />
                </Link>

                {/* Top Section */}
                <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                    <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Change User Details</h1>
                    <div className="flex w-full gap-8">
                        {/* Left: User Details */}
                        <div className="w-1/2">
                            <p className="text-lg mb-4">
                                <span className="font-bold text-[#6588cb]">Name:</span> {user.name}
                            </p>
                            <p className="text-lg mb-4">
                                <span className="font-bold text-[#6588cb]">Email:</span> {user.email}
                            </p>
                            <p className="text-lg mb-4">
                                <span className="font-bold text-[#6588cb]">Role:</span>{" "}
                                {user.role.toUpperCase()}
                            </p>
                        </div>

                        {/* Right: User Avatar */}
                        <div className="w-1/2 flex flex-row items-center justify-end">
                            <img
                                src={user.avatar_url}
                                alt="User Avatar"
                                className="w-40 h-40 rounded-lg object-cover shadow-lg"
                            />
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-4xl mx-auto bg-[#1a1d25] p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-[#6588cb] mb-6">Update User Details</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg text-white font-bold transition-all ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-[#6588cb] hover:bg-[#4a6aa9]"
                                }`}
                        >
                            {loading ? "Updating..." : "Update Details"}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default ChangeUserDetails;
