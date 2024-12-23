import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { get_notices } from "../../utils/notice.index.js";
import ShortNotice from "./ShortNotice";
import { Loader } from "../index.js";
import { useSelector } from "react-redux";

const ListNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await get_notices();
                if (res?.success && res.notices) {
                    setNotices(res.notices);
                }
            } catch (err) {
                console.error("Error fetching notices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    if (loading) {
        return <Loader messages={["Fetching your notices"]} interval={500} />;
    }

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen py-8 px-4 md:px-12 relative">
            {/* Back Button */}
            <Link
                to="/"
                className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                title="Back to Home"
            >
                <FaArrowLeft size={18} />
            </Link>
            {user.role !== "user" && (<button
                className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all z-50"
                onClick={() => navigate("/notices/add-notice")}
                title="Add a Notice"
            >
                <FaPlus size={24} />
            </button>)}
            {/* Floating Add Button */}

            {/* Header Section */}
            <header className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#6588cb]">All Notices</h2>
                <p className="text-sm text-[#b0b5c1]">Browse through the latest notices</p>
            </header>

            {/* Notices List */}
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-8 px-4 md:px-12">
                    {notices.length > 0 ? (
                        notices.map((notice) => (
                            <ShortNotice key={notice._id} notice={notice} />
                        ))
                    ) : (
                        <p className="text-center text-[#b0b5c1]">
                            No notices found. Please check back later.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListNotices;
