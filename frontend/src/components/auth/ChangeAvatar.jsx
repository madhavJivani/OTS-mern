import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from '../../../store/func/userSlice.js';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader } from "../index.js";
import { update_avatar } from "../../utils/user.index.js"; // Assuming this function handles the avatar update logic.

const ChangeAvatar = () => {
    const [avatar, setAvatar] = useState(null); // Avatar state
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (avatar) {

            const response = await update_avatar({avatar : avatar});
            if (response.success) {
                toast.success("Avatar updated successfully!");
                dispatch(loginUser(response.user)); // Assuming the avatar update might return the updated user data
            } else {
                toast.error(response.error || "Failed to update avatar.");
            }
        } else {
            toast.error("Please select an avatar.");
        }

        setLoading(false);
    };

    return (
        loading ? <Loader messages={["Uploading new avatar...", "Processing image...", "Saving changes...", "Finalizing update...", "Almost there..."]} interval={500}  /> :
            <div className="min-h-screen flex items-center justify-center bg-[#101218] py-8 px-4 relative">
                {/* Back Button */}
                                <button
                                    className="absolute top-4 right-4 flex items-center gap-2 text-[#6588cb] hover:text-[#4a6aa9] px-3 py-2 rounded-lg transition-all"
                                    onClick={() => navigate('/profile')}
                                >
                                    <FaArrowLeft className="text-xl" />
                                    <span className="font-semibold">Back</span>
                                </button>
                <div className="bg-[#3c4352] text-[#fafafa] p-8 rounded-md shadow-md w-96">
                    <h2 className="text-2xl font-bold text-center mb-6">Change Avatar</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden bg-[#2d3343]">
                                {avatar ? (
                                    <img
                                        src={URL.createObjectURL(avatar)}
                                        alt="Selected Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-[#6588cb]">
                                        No Avatar
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Choose Avatar</label>
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
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#6588cb] text-[#fafafa] py-2 rounded-md hover:bg-[#5774ad] transition"
                            disabled={loading}
                        >
                            {loading ? "Updating..." : "Update Avatar"}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default ChangeAvatar;
