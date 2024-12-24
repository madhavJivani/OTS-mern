import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { create_note } from '../../utils/notes.index.js'

const CreateNote = () => {
    // State variables for the form fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subject, setSubject] = useState("Physics");
    const [option, setOption] = useState("self");
    const [materialUrl, setMaterialUrl] = useState("");
    const [materialFile, setMaterialFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMaterialFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !subject) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            setLoading(true);
            let formData = { title, description, subject, option, materialUrl, materialFile };

            const response = await create_note(formData);
            if (response.success) {
                toast.success(response.message);
                navigate("/notes");
            } else {
                toast.error(response.error);
            }
        } catch (error) {
            console.log("Error in create_note:", error);
            return error.response.data;
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#101218] text-[#fafafa] py-8 px-4 relative">
            {/* Back Button */}
            <Link
                to="/notes"
                className="absolute top-4 right-4 bg-[#161a24] text-[#6588cb] p-3 rounded-full hover:bg-[#1f2533] transition-all shadow-lg flex items-center"
                title="Back to Notes"
            >
                <FaArrowLeft size={18} />
            </Link>

            {/* Top Section */}
            <div className="flex flex-col items-center w-full max-w-4xl mb-8 mx-auto">
                <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Create Note</h1>
            </div>

            {/* Form Section */}
            <div className="w-full max-w-4xl mx-auto bg-[#1a1d25] p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-[#6588cb] mb-6">New Note</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Title Field */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter note title"
                            className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            required
                        />
                    </div>

                    {/* Description Field */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter note description"
                            rows="6"
                            className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                            required
                        ></textarea>
                    </div>

                    {/* Subject Field */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Subject *</label>
                        <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                        >
                            <option value="Physics">Physics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Maths">Maths</option>
                        </select>
                    </div>

                    {/* Upload Option */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">Upload Method *</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="self"
                                    checked={option === "self"}
                                    onChange={(e) => setOption(e.target.value)}
                                    className="text-[#6588cb] focus:ring-[#6588cb]"
                                />
                                <span>Use a Link</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="upload"
                                    checked={option === "upload"}
                                    onChange={(e) => setOption(e.target.value)}
                                    className="text-[#6588cb] focus:ring-[#6588cb]"
                                />
                                <span>Upload a File</span>
                            </label>
                        </div>
                    </div>

                    {/* Material Field (Link or File) */}
                    {option === "self" ? (
                        <div>
                            <label className="block text-lg font-semibold mb-2">Material Link *</label>
                            <input
                                type="url"
                                value={materialUrl}
                                onChange={(e) => setMaterialUrl(e.target.value)}
                                placeholder="Enter the material link"
                                className="w-full px-4 py-2 rounded-lg bg-[#252a34] text-[#fafafa] focus:outline-none focus:ring-2 focus:ring-[#6588cb]"
                                required
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-lg font-semibold mb-2">Upload File *</label>
                            <div className="relative">
                                <label
                                    htmlFor="material"
                                    className="block w-full bg-[#6588cb] text-[#fafafa] py-2 text-center rounded-lg cursor-pointer hover:bg-[#4a6aa9] transition"
                                >
                                    {materialFile ? materialFile.name : "Choose File"}
                                </label>
                                <input
                                    id="material"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept=".pdf"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white font-bold transition-all ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#6588cb] hover:bg-[#4a6aa9]"
                            }`}
                    >
                        {loading ? "Creating Note..." : "Create Note"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateNote;
