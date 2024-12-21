import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#101218] text-[#fafafa] flex items-center justify-center px-8  my-8">
      <div className="w-[90vw] md:w-[60vw] text-center">
        <h1 className="text-4xl font-bold text-[#6588cb] mb-6">Contact Us</h1>
        <p className="text-lg text-[#b0b5c1] leading-relaxed mb-8">
          Have questions, feedback, or need support? We're here to help! Reach out to us through any of the following methods.
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center">
            <span className="text-[#6588cb] font-semibold w-32">Email:</span>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=madhavjivani14@gmail.com"
              className="hover:underline text-[#b0b5c1]"
              target="_blank"
              rel="noreferrer"
            >
              madhavjivani14@gmail.com
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-[#6588cb] font-semibold w-32">Phone:</span>
            <span className="text-[#b0b5c1]">+91-XXXXXXXXXX</span>
          </div>
          <div className="flex items-center">
            <span className="text-[#6588cb] font-semibold w-32">LinkedIn:</span>
            <a
              href="https://www.linkedin.com/in/madhav-jivani-095aba24b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#b0b5c1]"
            >
              Madhav Jivani
            </a>
          </div>
          <div className="flex items-center">
            <span className="text-[#6588cb] font-semibold w-32">GitHub:</span>
            <a
              href="https://github.com/madhavJivani/OTS-mern"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-[#b0b5c1]"
            >
              madhavJivani/OTS-mern
            </a>
          </div>
        </div>
        <p className="text-lg text-[#b0b5c1] leading-relaxed mt-8">
          We're committed to responding as quickly as possible. Thank you for reaching out!
        </p>
      </div>
    </div>
  );
};

export default Contact;
