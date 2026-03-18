import React from "react";
import { FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png"; // Adjust path based on your folder structure

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        
        {/* Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="Byteedu Logo" className="h-12 mb-3" />
          <p className="text-lg font-semibold">Byteedu Learning Platform</p>
          <p className="text-sm">📧 Email: <a href="mailto:byteedu@proton.me" className="underline">byteedu@proton.me</a></p>
          <p className="text-sm">📞 Contact: <a href="tel:9829296192" className="underline">9829296192</a></p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end text-sm">
          <p className="mb-2 font-semibold text-lg">Follow Us:</p>
          <a
            href="https://www.linkedin.com/company/byteedu/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-300 transition"
          >
            <FaLinkedin /> Byteedu (Main)
          </a>
          <a
            href="https://www.linkedin.com/company/byteedu-learning-platform/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-blue-300 transition"
          >
            <FaLinkedin /> Byteedu Learning Platform
          </a>
        </div>
      </div>

      <p className="text-center text-sm text-gray-300 mt-6">© {new Date().getFullYear()} Byteedu. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
