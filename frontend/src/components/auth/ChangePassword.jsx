import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { get_user, update_password } from '../../utils/user.index.js'
import { loginUser, logoutUser } from '../../../store/func/userSlice.js'
import { Loader } from '../index.js'
import { useNavigate } from "react-router-dom";
// import { update_password } from "../../utils/profile.utils";

const ChangePassword = () => {
    const { user } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible((prevState) => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await update_password({ oldPassword, newPassword });

        if (response.success) {
            toast.success(response.message);
            setOldPassword("");
            setNewPassword("");
        } else {
            toast.error(response.error || "Failed to change password");
        }

        setLoading(false);
    };

    useEffect(() => {
        const fetchUser = async () => {
            const res = await get_user();
            if (res.success) {
                dispatch(loginUser(res.user));
                setLoading(false);
            }
            else {
                console.log("Response:", res);
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
                <button
                    className="absolute top-4 right-4 flex items-center gap-2 text-[#6588cb] hover:text-[#4a6aa9] px-3 py-2 rounded-lg transition-all"
                    onClick={() => navigate('/profile')}
                >
                    <FaArrowLeft className="text-xl" />
                    <span className="font-semibold">Back</span>
                </button>
                {/* Top Section */}
                <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                    <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Change Password</h1>
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
                    <h2 className="text-2xl font-bold text-[#6588cb] mb-6">Update Password</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Old Password */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Old Password</label>
                            <div className="relative">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    placeholder="Enter your current password"
                                    className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
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

                        {/* New Password */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">New Password</label>
                            <div className="relative">

                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    placeholder="Enter your new password"
                                    className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg text-white font-bold transition-all ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-[#6588cb] hover:bg-[#4a6aa9]"
                                }`}
                        >
                            {loading ? "Updating..." : "Change Password"}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default ChangePassword;
