import React from "react";

const Header = () => {
    return (
        <header className="bg-[#3c4352] text-[#fafafa] p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-4">
                {/* Logo Image */}
                <img
                    src="../../public/logo.png"
                    alt="OTS System Logo"
                    className="h-10 w-10 object-contain"
                />
                <div className="text-xl font-bold">OTS System</div>
            </div>
            {/* Navigation Links */}
            <nav className="flex gap-6">
                <a href="/" className="hover:text-[#6588cb]">Home</a>
                <a href="/about" className="hover:text-[#6588cb]">About</a>
                <a href="/contact" className="hover:text-[#6588cb]">Contact</a>
                <a href="/signup" className="hover:text-[#6588cb]">Signup</a>
            </nav>
        </header>
    );
};

export default Header;
