import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get_notice, delete_notice } from "../../utils/notice.index.js";
import { FaArrowLeft, FaCalendarAlt, FaEnvelope, FaUserTie, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux"; // To access the current user role from the store
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "../index.js";
import ReactMarkdown from "react-markdown";

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

const LongNotice = () => {
    const { id } = useParams();
    const [notice, setNotice] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user); // Access the user from Redux store
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await get_notice(id);
                if (res?.success && res.notice) {
                    setNotice(res.notice);
                }
            } catch (err) {
                toast.error(err.message || "Error fetching notice");
                console.error("Error fetching notice:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotice();
    }, [id]);

    if (loading) {
        return <Loader messages={["Fetching notice details..."]} />;
    }

    if (!notice) {
        toast.error("Notice not found, may be it was deleted or never existed");
        return (
            <div className="text-center mt-8 text-red-500">
                Unable to load the notice. Please try again later.
            </div>
        );
    }

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen py-8 px-4 md:px-12 relative">
            {/* Back Button */}
            <Link
                to="/notices"
                className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                title="Back to Notices"
            >
                <FaArrowLeft size={18} />
            </Link>

            {/* Main Section */}
            <section className="max-w-4xl mx-auto bg-[#161a24] p-6 rounded-lg shadow-lg my-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-[#6588cb]">{notice.title}</h1>
                {/* Dates */}
                <div className="flex justify-between text-[#b0b5c1] text-sm mb-6">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>
                            <strong>Created:</strong> {formatDate(notice.createdAt)}
                        </span>
                    </div>
                    {notice.updatedAt && (
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>
                                <strong>Updated:</strong> {formatDate(notice.updatedAt)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Short Description */}
                <div className="text-[#b0b5c1] text-sm mb-6">
                    <strong className="block mb-1 text-[#fafafa]">Short Description:</strong>
                    <ReactMarkdown className="prose prose-invert">{notice.short_description}</ReactMarkdown>
                </div>
                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Long Description */}
                <div className="text-[#fafafa] text-base mb-6">
                    <strong className="block mb-1 text-[#fafafa] text-3xl ">Detailed Description:</strong>
                    <br />
                    <ReactMarkdown className="prose prose-invert">{notice.detailed_description}</ReactMarkdown>
                </div>

                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Author Info */}
                <div className="flex justify-between items-start text-[#b0b5c1] text-sm">
                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={
                                notice.author_avatar ||
                                "https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png"
                            }
                            alt="Author Avatar"
                            className="w-16 h-16 rounded-full border-2 border-[#6588cb] object-cover"
                        />
                        <div>
                            <p className="flex items-center gap-2">
                                <FaUserTie />
                                <span>{notice.author_name}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaEnvelope />
                                <span>{notice.author_email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Edit & Delete Buttons */}
                    {user?.role === "admin" && (
                        <div className="flex flex-col items-end gap-4">
                            {/* Edit Button */}
                            <Link
                                to={`/notices/edit-notice/${notice._id}`}
                                className="bg-yellow-500 text-white p-3 rounded-full hover:bg-yellow-600 transition-all"
                                title="Edit Notice"
                            >
                                <FaEdit size={16} />
                            </Link>

                            {/* Delete Button */}
                            <button
                                className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                                title="Delete Notice"
                                onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this notice?")) {
                                        delete_notice(notice._id)
                                            .then(() => {
                                                toast.success("Notice deleted successfully");
                                                navigate("/notices");
                                            })
                                            .catch(() => {
                                                toast.error("Failed to delete the notice");
                                            });
                                    }
                                }}
                            >
                                <FaTrashAlt size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LongNotice;
