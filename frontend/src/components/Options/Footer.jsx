import React from "react";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#3f4454] text-[#b0b5c1] text-center py-4 mt-6 backdrop-brightness-200">
            <p>© 2024 OTS System. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-2">
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=madhavjivani14@gmail.com"
                    className="hover:text-[#6588cb] flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaEnvelope /> Email
                </a>
                <a
                    href="https://www.linkedin.com/in/madhav-jivani-095aba24b/?originalSubdomain=in"
                    className="hover:text-[#6588cb] flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaLinkedin /> LinkedIn
                </a>
                <a
                    href="https://github.com/madhavJivani/OTS-mern"
                    className="hover:text-[#6588cb] flex items-center gap-2"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaGithub /> GitHub
                </a>
            </div>
        </footer>
    );
};

export default Footer;
