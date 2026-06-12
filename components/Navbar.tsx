"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    "Home",
    "About Us",
    "Services",
    "Our Work",
    "Management",
    "Career",
    "Contact Us",
  ];

  return (
    <header className="
    absolute
    top-0
    left-0
    w-full
    z-50
    bg-transparent
    text-white
  ">
      <div className="max-w-7xl mx-auto px-3 lg:px-4">
        {/* Top Navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={140}
              height={45}
              priority
              className="h-auto w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium uppercase">
            {navItems.map((item, index) => (
              <div
                key={item}
                className={`group relative cursor-pointer transition-colors duration-300 ${index === 0 ? "text-orange-500" : "hover:text-orange-500"
                  }`}
              >
                {item}

                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${index === 0 ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </div>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 transition-colors"
            >
              <FaLinkedinIn />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
        >
          <div className="border-t border-gray-800 pt-4">
            <div className="flex flex-col gap-3 text-sm uppercase">
              <h1 className="text-orange-500 cursor-pointer">Home</h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                About Us
              </h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                Services
              </h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                Our Work
              </h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                Management
              </h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                Career
              </h1>
              <h1 className="hover:text-orange-500 cursor-pointer">
                Contact Us
              </h1>
            </div>

            {/* Mobile Social Icons */}
            <div className="flex items-center gap-5 mt-4 pt-4 border-t border-gray-800 text-lg">
              <FaFacebookF className="hover:text-orange-500 cursor-pointer" />
              <FaXTwitter className="hover:text-orange-500 cursor-pointer" />
              <FaInstagram className="hover:text-orange-500 cursor-pointer" />
              <FaLinkedinIn className="hover:text-orange-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;