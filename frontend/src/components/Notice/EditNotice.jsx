import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { get_notice, update_notice } from "../../utils/notice.index.js";
import { Loader } from "../index.js";
import { Link } from "react-router-dom";

const EditNotice = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [short_description, setShortDescription] = useState("");
    const [detailed_description, setDetailedDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await update_notice(id, { title, short_description, detailed_description });
        if (response.success) {
            toast.success(response.message);
            navigate(`/notices/${id}`);
        } else {
            toast.error(response.error || "Failed to update the notice");
        }
    };

    useEffect(() => {
        const fetchNotice = async () => {
            const res = await get_notice(id);
            if (res.success) {
                setTitle(res.notice.title);
                setShortDescription(res.notice.short_description);
                setDetailedDescription(res.notice.detailed_description);
                setLoading(false);
            } else {
                toast.error(res.error || "Failed to fetch notice");
                setLoading(false);
            }
        };
        fetchNotice();
    }, [id]);

    return (
        loading ? <Loader messages={["Fetching notice data"]} /> :
            <div className="min-h-screen bg-[#101218] text-[#fafafa] py-8 px-4 relative">
                {/* Back Button */}
                <Link
                    to={`/notices/${id}`}
                    className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                    title="Back to Notice"
                >
                    <FaArrowLeft size={18} />
                </Link>

                {/* Top Section */}
                <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                    <h1 className="text-4xl font-bold text-[#6588cb] mb-2">Edit Notice</h1>
                </div>

                {/* Form Section */}
                <div className="w-full max-w-4xl mx-auto bg-[#1a1d25] p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-[#6588cb] mb-6">Update Notice Details</h2>
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
                            <span className="text-sm font-bold text-[#5785ca] mb-6">You can use markdown text structure to beatify this</span>
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
                            <span className="text-sm font-bold text-[#5785ca] mb-6">You can use markdown text structure to beatify this</span>
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
                            {loading ? "Updating..." : "Update Notice"}
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default EditNotice;
