import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaArrowRight, FaBook } from "react-icons/fa";
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

const ShortNote = ({ note }) => {
    return (
        <div className="bg-[#161a24] text-[#fafafa] p-6 rounded-lg shadow-lg w-full lg:w-3/4 hover:rounded-xl transition-all duration-300 ease-in-out relative">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <div className="text-sm font-semibold uppercase text-[#6588cb]">
                    A note on <span className="font-bold">{note.subject || "Unknown Subject"}</span>
                </div>
                <Link
                    to={`/notes/${note._id}`}
                    className="text-[#6588cb] hover:text-[#8aa3e1] transition-all flex items-center gap-1 text-sm font-medium"
                >
                    <span>Read More</span>
                    <FaArrowRight />
                </Link>
            </div>

            {/* Horizontal Divider */}
            <div className="border-b-2 border-[#6588cb] mb-4"></div>

            {/* Content Section */}
            <div className="flex gap-6">
                {/* Left: Author Details */}
                <div className="w-[20%] pr-4 border-r-2 border-[#6588cb] flex flex-col items-center text-center">
                    <img
                        src={
                            note.author_avatar ||
                            "https://res.cloudinary.com/madhav-daiict/image/upload/v1734681924/rcdmth9309na2zivs0i9.png"
                        }
                        alt={note.author_name || "Author"}
                        className="w-20 h-20 object-cover rounded-full mb-2 border-2 border-[#6588cb]"
                    />
                    <p className="text-sm font-semibold">{note.author_name || "Unknown"}</p>
                    <p className="text-xs text-[#b0b5c1]">{note.author_role || "Unknown Role"}</p>
                </div>

                {/* Right: Note Details */}
                <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#fafafa] mb-2">
                        <ReactMarkdown className="prose prose-invert">{note.title}</ReactMarkdown>
                    </h3>
                    {/* Description */}
                    <div className="text-sm text-[#b0b5c1] mb-4">
                        <ReactMarkdown className="prose prose-invert">{note.description}</ReactMarkdown>
                    </div>
                    {/* Metadata Section */}
                    <div className="flex justify-between items-center text-sm text-[#b0b5c1]">
                        <div className="flex items-center gap-2">
                            <FaBook />
                            <span>
                                <strong>Subject:</strong> {note.subject || "N/A"}
                            </span>
                        </div>
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
                </div>
            </div>
        </div>
    );
};

export default ShortNote;
