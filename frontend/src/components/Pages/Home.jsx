import React from "react";
import { useSelector } from 'react-redux';

const Home = () => {
    // Access the user and status from the Redux store
    const { user, status } = useSelector((state) => state.user);

    return (
        <div className="bg-[#101218] text-[#fafafa] min-h-screen">
            <section className="text-center py-20">
                <h1 className="text-4xl font-bold text-[#6588cb]">Welcome to the OTS System</h1>
                <p className="mt-4 text-lg text-[#b0b5c1]">
                    Your one-stop solution for managing online educational content.
                </p>
                {/* Check if the user is logged in */}
                {status === "loggedIn" && user?.name && (
                    <p className="mt-4 text-lg text-[#b0b5c1]">
                        Welcome back, {user.name}({user.role })!
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
        </div>
    );
};

export default Home;
