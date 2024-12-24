import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get_note } from "../../utils/notes.index.js";
import { FaArrowLeft, FaCalendarAlt, FaEnvelope, FaUserTie, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
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

const LongNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState();
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.user); // Access current user role
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await get_note(id);
                if (res?.success && res.note) {
                    setNote(res.note);
                } else {
                    toast.error("Note not found");
                }
            } catch (err) {
                toast.error(err.message || "Error fetching note");
                console.error("Error fetching note:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    if (loading) {
        return <Loader messages={["Fetching note details..."]} />;
    }

    if (!note) {
        toast.error("Note not found or may have been deleted.");
        return (
            <div className="text-center mt-8 text-red-500">
                Unable to load the note. Please try again later.
            </div>
        );
    }

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen py-8 px-4 md:px-12 relative">
            {/* Back Button */}
            <Link
                to="/notes"
                className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                title="Back to Notes"
            >
                <FaArrowLeft size={18} />
            </Link>

            {/* Main Section */}
            <section className="max-w-4xl mx-auto bg-[#161a24] p-6 rounded-lg shadow-lg my-8">
                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-6 text-[#6588cb]">{note.title}</h1>
                {/* Dates */}
                <div className="flex justify-between text-[#b0b5c1] text-sm mb-6">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt />
                        <span>
                            <strong>Created:</strong> {formatDate(note.createdAt)}
                        </span>
                    </div>
                    {note.updatedAt && (
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt />
                            <span>
                                <strong>Updated:</strong> {formatDate(note.updatedAt)}
                            </span>
                        </div>
                    )}
                </div>

                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Subject */}
                <div className="text-[#b0b5c1] text-sm mb-6">
                    <strong className="block mb-1 text-[#fafafa]">Subject:</strong>
                    <p>{note.subject || "Not specified"}</p>
                </div>
                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Description */}
                <div className="text-[#fafafa] text-base mb-6">
                    <strong className="block mb-1 text-[#fafafa] text-3xl">Description:</strong>
                    <br />
                    <ReactMarkdown className="prose prose-invert">{note.description}</ReactMarkdown>
                </div>

                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Material URL */}
                {note.material_url && (
                    <div className="text-[#b0b5c1] text-sm mb-6">
                        <strong className="block mb-1 text-[#fafafa]">Material Link:</strong>
                        <a
                            href={note.material_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#6588cb] hover:underline flex items-center gap-1"
                        >
                            {note.material_url} <FaExternalLinkAlt size={14} />
                        </a>
                    </div>
                )}

                <div className="border-b-2 border-[#6588cb] mb-6"></div>

                {/* Author Info */}
                <div className="flex justify-between items-start text-[#b0b5c1] text-sm">
                    {/* Author Info */}
                    <div className="flex items-center gap-4">
                        <img
                            src={
                                note.author_avatar ||
                                "https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png"
                            }
                            alt="Author Avatar"
                            className="w-16 h-16 rounded-full border-2 border-[#6588cb] object-cover"
                        />
                        <div>
                            <p className="flex items-center gap-2">
                                <FaUserTie />
                                <span>{note.author_name}</span>
                            </p>
                            <p className="flex items-center gap-2">
                                <FaEnvelope />
                                <span>{note.author_email}</span>
                            </p>
                        </div>
                    </div>

                    {/* Delete Button */}
                    {user?.role !== "user" && (
                        <button
                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                            title="Delete Note"
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this note?")) {
                                    // Function to handle delete
                                    toast.success("Note deleted successfully");
                                    navigate("/notes");
                                }
                            }}
                        >
                            <FaTrashAlt size={16} />
                        </button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LongNote;
