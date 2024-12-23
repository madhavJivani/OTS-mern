import React from "react";
import { useSelector } from 'react-redux';
import { FaRegStickyNote, FaRegBell, FaVideo } from 'react-icons/fa'; // Example icons
import { useNavigate } from 'react-router-dom';

const Home = () => {
    // Access the user and status from the Redux store
    const { user, status } = useSelector((state) => state.user);
    const navigate = useNavigate();

    // Navigation function for the buttons
    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen my-8 relative">
            <section className="text-center py-20">
                <h1 className="text-4xl font-bold text-[#6588cb]">Welcome to the OTS System</h1>
                <p className="mt-4 text-lg text-[#b0b5c1]">
                    Your one-stop solution for managing online educational content.
                </p>
                {/* Check if the user is logged in */}
                {status === "loggedIn" && user?.name && (
                    <p className="mt-4 text-lg text-[#b0b5c1]">
                        Welcome back, {user.name}({user.role})!
                    </p>
                )}
                <button className="mt-6 px-6 py-2 bg-[#5774ad] text-white rounded-md hover:bg-[#6588cb]">
                    Get Started
                </button>
            </section>
            <section className="py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
                    <div className="bg-[#3c4352] text-center p-6 rounded-md text-[#fafafa]">
                        <h2 className="text-xl font-semibold">Admin Panel</h2>
                        <p className="mt-2 text-[#b0b5c1]">Manage users, notes, and videos.</p>
                    </div>
                    <div className="bg-[#3c4352] text-center p-6 rounded-md text-[#fafafa]">
                        <h2 className="text-xl font-semibold">Teacher Dashboard</h2>
                        <p className="mt-2 text-[#b0b5c1]">Upload and manage your resources.</p>
                    </div>
                    <div className="bg-[#3c4352] text-center p-6 rounded-md text-[#fafafa]">
                        <h2 className="text-xl font-semibold">Student Access</h2>
                        <p className="mt-2 text-[#b0b5c1]">View and access educational content.</p>
                    </div>
                </div>
            </section>

            {/* Floating Buttons */}
            {(status === "loggedIn") && (<div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
                {/* Button for Notices */}
                <button
                    className="relative group w-16 h-16 rounded-full bg-blue-500 text-white flex justify-center items-center shadow-lg hover:bg-blue-600 transition-all"
                    onClick={() => handleNavigation('/notices')}
                >
                    <FaRegBell size={24} />
                    <span className="absolute left-1/2 bottom-full mb-2 hidden group-hover:block transform -translate-x-1/2 text-sm text-white bg-black rounded px-2 py-1">
                        Notices
                    </span>
                </button>

                {/* Button for Notes */}
                <button
                    className="relative group w-16 h-16 rounded-full bg-green-500 text-white flex justify-center items-center shadow-lg hover:bg-green-600 transition-all"
                    onClick={() => handleNavigation('/notes')}
                >
                    <FaRegStickyNote size={24} />
                    <span className="absolute left-1/2 bottom-full mb-2 hidden group-hover:block transform -translate-x-1/2 text-sm text-white bg-black rounded px-2 py-1">
                        Notes
                    </span>
                </button>

                {/* Button for Videos */}
                <button
                    className="relative group w-16 h-16 rounded-full bg-red-500 text-white flex justify-center items-center shadow-lg hover:bg-red-600 transition-all"
                    onClick={() => handleNavigation('/videos')}
                >
                    <FaVideo size={24} />
                    <span className="absolute left-1/2 bottom-full mb-2 hidden group-hover:block transform -translate-x-1/2 text-sm text-white bg-black rounded px-2 py-1">
                        Videos
                    </span>
                </button>
            </div>)}
        </div>
    );
};

export default Home;
