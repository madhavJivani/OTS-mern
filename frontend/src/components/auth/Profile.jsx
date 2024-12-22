import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FiEdit, FiEye, FiLock, FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { get_user } from "../../utils/user.index.js";
import { loginUser } from "../../../store/func/userSlice.js";
import toast from "react-hot-toast";
import { Loader } from "../index.js";

const Profile = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const res = await get_user();
            if (res.success) {
                dispatch(loginUser(res.user));
                // toast.success(`Hey there! Welcome ${res.user.name}`);
            } else {
                console.log("Response:", res);
                toast.error("Failed to fetch user");
            }
            setLoading(false);
        };
        fetchUser();
    }, [dispatch]);

    return loading ? (
        <Loader messages={["Fetching your info"]} />
    ) : (
        <div className="min-h-screen bg-[#101218] text-[#fafafa] flex flex-col py-8 px-4">
            {/* Upper Section */}
            <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Profile</h1>
                <div className="flex w-full gap-8">
                    {/* Left: User Details */}
                    <div className="w-1/2 relative bg-[#161a24] p-4 rounded-lg shadow-lg">
                        {/* Top-right icons */}
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Link
                                to="/change-password"
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    title="Change Password"
                            >
                                <FiLock size={18} />
                            </Link>
                            <Link
                                to="/edit-details"
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                    title="Edit Details"
                            >
                                <FiEdit size={18} />
                            </Link>
                        </div>
                        <p className="text-lg mb-4">
                            <span className="font-bold text-[#6588cb]">Name:</span> {user.name}
                        </p>
                        <p className="text-lg mb-4">
                            <span className="font-bold text-[#6588cb]">Email:</span>{" "}
                            {user.email}
                        </p>
                        <p className="text-lg mb-4">
                            <span className="font-bold text-[#6588cb]">Role:</span>{" "}
                            {user.role.toUpperCase()}
                        </p>
                    </div>

                    {/* Right: User Avatar */}
                    <div className="w-1/2 relative bg-[#161a24] p-4 rounded-lg shadow-lg flex flex-col items-center">
                        {/* Top-right icons */}
                        <div className="absolute top-2 right-2 flex gap-2">
                            <button
                                onClick={() => setIsPreviewOpen(true)}
                                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                    title="View Avatar"
                            >
                                <FiEye size={18} />
                            </button>
                            <Link
                                to="/change-avatar"
                                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                                    title="Change Avatar"
                            >
                                <FiEdit size={18} />
                            </Link>
                        </div>
                        <img
                            src={user.avatar_url}
                            alt="User Avatar"
                            className="w-40 h-40 rounded-lg object-cover shadow-lg"
                        />
                    </div>
                </div>
            </div>

            {/* Horizontal Divider */}
            <hr className="border-[#6588cb] my-8 w-full max-w-4xl mx-auto" />

            {/* Lower Section */}
            <div className="w-full max-w-4xl mx-auto bg-[#161a24] p-6 rounded-lg shadow-lg">
                {user.role === "user" ? (
                    <h2 className="text-2xl font-semibold text-[#6588cb]">
                        Watch History
                    </h2>
                ) : (
                    <h2 className="text-2xl font-semibold text-[#6588cb]">Uploads</h2>
                )}
            </div>

            {/* React Modal for Image Preview */}
            <Modal
                isOpen={isPreviewOpen}
                onRequestClose={() => setIsPreviewOpen(false)}
                overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center"
                className="bg-[#101218] rounded-lg shadow-lg p-6 max-w-sm w-full relative"
            >
                <div className="flex flex-col items-center">
                    <img
                        src={user.avatar_url}
                        alt="Preview Avatar"
                        className="rounded-lg max-h-96 object-contain"
                    />
                    <button
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;
