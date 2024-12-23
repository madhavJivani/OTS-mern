import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { create_notice } from "../../utils/notice.index.js";  // Assuming create_notice API function exists
import { Loader } from "../index.js";
import { Link } from "react-router-dom";

const AddNotice = () => {
    const [title, setTitle] = useState("");
    const [short_description, setShortDescription] = useState("");
    const [detailed_description, setDetailedDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await create_notice({ title, short_description, detailed_description });

        if (response.success) {
            toast.success(response.message);
            navigate("/notices");  // Redirect to notices list
        } else {
            toast.error(response.error || "Failed to add the notice");
        }

        setLoading(false);
    };

    return (
        loading ? <Loader messages={["Adding the notice...", "Please wait while we create the notice."]} interval={500}/> :
            <div className="min-h-screen bg-[#101218] text-[#fafafa] py-8 px-4 relative">
                {/* Back Button */}
                <Link
                    to="/notices"
                    className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                    title="Back to Notices"
                >
                    <FaArrowLeft size={18} />
                </Link>

                {/* Top Section */}
                <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                    <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Issue a Notice</h1>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-4xl mx-auto bg-[#1a1d25] p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-[#6588cb] mb-6">New Notice</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {/* Title Field */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter notice title"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            />
                        </div>

                        {/* Short Description Field */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Short Description</label>
                            <input
                                type="text"
                                name="short_description"
                                value={short_description}
                                onChange={(e) => setShortDescription(e.target.value)}
                                placeholder="Enter short description"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            />
                        </div>

                        {/* Detailed Description Field */}
                        <div>
                            <label className="block text-lg font-semibold mb-2">Detailed Description</label>
                            <textarea
                                name="detailed_description"
                                value={detailed_description}
                                onChange={(e) => setDetailedDescription(e.target.value)}
                                placeholder="Enter detailed description"
                                rows="6"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 rounded-lg text-white font-bold transition-all ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-[#6588cb] hover:bg-[#4a6aa9]"}`
                            }
                        >
                            {loading ? "Adding Notice..." : "Add Notice"}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default AddNotice;
