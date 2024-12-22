import React, { useState,useEffect} from "react";
import Modal from "react-modal";
import { FiEdit, FiEye } from "react-icons/fi";
import { useSelector,useDispatch } from "react-redux";
import { get_user } from "../../utils/user.index.js";
import { loginUser } from '../../../store/func/userSlice.js'
import toast from "react-hot-toast";
import {Loader } from '../index.js'

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
                toast.success(`Hey there! Welcome ${res.user.name}`);
                setLoading(false);
                // console.log(res)
            }
            else { 
                console.log("Response:", res);
                toast.error("Failed to fetch user");
            }
        };
        fetchUser();
        setLoading(false);
    }, [])

    return (
        loading ? <Loader messages={["Fetching your info"]} /> :
        <div className="min-h-screen bg-[#101218] text-[#fafafa] flex flex-col items-center py-8 px-4">
            {/* Profile Header */}
            <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Profile</h1>

            {/* Profile Content */}
            <div className="flex gap-8 w-full max-w-4xl">
                {/* Left Section: User Info */}
                <div className="w-1/2">
                    <p className="text-lg mb-4">
                        <span className="font-bold text-[#6588cb]">Name:</span> {user.name}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-bold text-[#6588cb]">Email:</span> {user.email}
                    </p>
                    <p className="text-lg mb-4">
                        <span className="font-bold text-[#6588cb]">Role:</span> {user.role.toUpperCase()}
                    </p>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 mt-4">
                        Change Password
                    </button>
                </div>

                {/* Right Section: User Avatar */}
                <div className="w-1/2 flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={user.avatar_url}
                            alt="User Avatar"
                            className="w-40 h-40 rounded-lg object-cover shadow-lg"
                        />
                    </div>

                    {/* Buttons Below Image */}
                    <div className="flex gap-4 mt-4">
                        <button
                            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                            onClick={() => setIsPreviewOpen(true)}
                        >
                            <FiEye />
                            Preview
                        </button>
                        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                            <FiEdit />
                            Edit
                        </button>
                    </div>
                </div>
            </div>

            {/* Horizontal Ruler */}
            <hr className="my-8 border-[#6588cb] w-full max-w-4xl" />

            {/* Additional Section Based on Role */}
            <div className="w-full max-w-4xl">
                {user.role === "user" ? (
                    <p className="text-lg text-[#b0b5c1]">
                        <strong>Watch History:</strong> You haven’t watched any videos yet.
                    </p>
                ) : (
                    <p className="text-lg text-[#b0b5c1]">
                        <strong>Uploads:</strong> You haven’t uploaded any content yet.
                    </p>
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
