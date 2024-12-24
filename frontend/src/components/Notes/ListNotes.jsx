import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { get_notes } from "../../utils/notes.index.js";
import ShortNote from "./ShortNote";
import { Loader } from "../index.js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ListNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await get_notes();
                if (res?.success && res.notes) {
                    setNotes(res.notes);
                }
            } catch (err) {
                toast.error(err?.response?.data?.error || "Failed to fetch notes");
                console.error("Error fetching notes:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <Loader messages={["Fetching your notes", "Loading data...", "Please wait a moment", "Almost there..."]} interval={500} />;
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

            {/* Floating Add Button */}
            {user.role !== "user" && (
                <button
                    className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 rounded-full flex justify-center items-center shadow-lg hover:bg-green-600 transition-all z-50"
                    onClick={() => navigate("/notes/add-note")}
                    title="Add a Note"
                >
                    <FaPlus size={24} />
                </button>
            )}

            {/* Header Section */}
            <header className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#6588cb]">All Notes</h2>
                <p className="text-sm text-[#b0b5c1]">Browse through the latest notes</p>
            </header>

            {/* Notes List */}
            <div className="container mx-auto">
                <div className="flex flex-col items-center gap-8 px-4 md:px-12">
                    {notes.length > 0 ? (
                        notes.map((note) => <ShortNote key={note._id} note={note} />)
                    ) : (
                        <p className="text-center text-[#b0b5c1]">No notes found. Please check back later.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListNotes;
