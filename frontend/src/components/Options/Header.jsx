import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/func/userSlice.js";
import { logoutUser as authLogout } from "../../utils/index.js";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const { user, status } = useSelector((state) => state.user);

    const handleLogout = async () => {
        const response = await authLogout();
        console.log("Logout Responses:", response);
        
        if (response.success) {
            toast.success("Logout successful!");
            dispatch(logoutUser());
        } else {
            toast.error("Logout failed. Please login first.");
        }
    };

    return (
        <header className="bg-[#3c4352] text-[#fafafa] p-4 flex justify-between items-center shadow-md">
            {/* Section 1: Logo and Title (Left-aligned) */}
            <div className="flex-1 flex justify-start items-center">
                <div className="flex items-center gap-2">
                    <img
                        src="../../public/logo.png"
                        alt="OTS System Logo"
                        className="h-10 w-10 object-contain"
                    />
                    <div className="text-xl font-bold">OTS System</div>
                </div>
            </div>

            {/* Section 2: Navigation Links (Centered) */}
            <nav className="flex-1 flex justify-center items-center gap-12">
                <Link to="/" className="hover:text-[#6588cb] transition duration-300 ease-out">Home</Link>
                <Link to="/about" className="hover:text-[#6588cb] transition duration-300 ease-out">About</Link>
                <Link to="/contact" className="hover:text-[#6588cb] transition duration-300 ease-out">Contact</Link>
            </nav>

            {/* Section 3: Conditional Buttons (Right-aligned) */}
            <div className="flex-1 flex justify-end items-center gap-4">
                {status === "loggedIn" && user?.name ? (
                    <div className="flex items-center gap-4">
                        <button
                            className="hover:bg-[#6588cb] text-[#fafafa] px-4 py-2 rounded-3xl transition duration-300 ease-out w-20"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                        <Link to="/profile">
                            <img
                                src={user.avatar_url}
                                alt="User Avatar"
                                className="h-10 w-10 rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link to="/signup">
                            <button className="hover:bg-[#6588cb] text-[#fafafa] px-4 py-2 rounded-3xl transition duration-300 ease-out w-20">
                                Signup
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="hover:bg-[#6588cb] text-[#fafafa] px-4 py-2 rounded-3xl transition duration-300 ease-out w-20">
                                Login
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
