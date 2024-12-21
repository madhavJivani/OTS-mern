import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#101218] text-[#fafafa] flex items-center justify-center px-8 my-8">
      <div className="w-[90vw] text-justify">
        <h1 className="text-4xl font-bold text-[#6588cb] mb-6 text-center">About Us</h1>
        <p className="text-lg text-[#b0b5c1] leading-relaxed mb-4">
          Welcome to the <strong>OTS System</strong>, your one-stop solution for streamlined online teaching and learning.
          We aim to empower educators, students, and administrators with an intuitive platform that simplifies the process
          of sharing knowledge, managing resources, and tracking progress.
        </p>
        <p className="text-lg text-[#b0b5c1] leading-relaxed mb-4">
          With <strong>OTS</strong>, teachers can seamlessly upload notes, videos, and test materials while students access them with ease.
          Our mission is to create a collaborative environment that fosters growth, engagement, and success for everyone.
        </p>
        <p className="text-lg text-[#b0b5c1] leading-relaxed mb-4">
          Built with cutting-edge technology and a commitment to user experience, the <strong>OTS System</strong> is here
          to redefine how education is delivered and consumed in the digital age.
        </p>
        <h2 className="text-2xl font-semibold text-[#fafafa] mt-6 mb-4">Our Core Values</h2>
        <ul className="list-disc list-inside text-[#b0b5c1] text-lg leading-relaxed mb-4">
          <li>Empowering educators to focus on teaching.</li>
          <li>Enhancing learning experiences for students.</li>
          <li>Providing user-friendly tools for administrators.</li>
          <li>Innovating with technology for modern education.</li>
        </ul>
        <p className="text-lg text-[#b0b5c1] leading-relaxed">
          Join us in our journey to make education accessible and impactful for everyone.
        </p>
      </div>
    </div>
  );
};

export default About;
