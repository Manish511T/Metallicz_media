"use client";

import { useState } from "react";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const navItems = [
  "Home",
  "About Us",
  "Services",
  "Our Work",
  "Management",
  "Career",
  "Contact Us",
];

const socialLinks = [
  { icon: FaFacebookF, href: "https://facebook.com",  label: "Facebook"  },
  { icon: FaXTwitter,  href: "https://x.com",         label: "X"         },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn,href: "https://linkedin.com",  label: "LinkedIn"  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="
        absolute top-0 left-0 w-full z-50 text-white
        bg-[#030303]        /* solid on mobile */
        lg:bg-transparent   /* transparent on desktop */
      "
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">

        {/* ── Top bar ── */}
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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium uppercase">
            {navItems.map((item, index) => (
              <div
                key={item}
                className={`group relative cursor-pointer transition-colors duration-300 ${
                  index === 0 ? "text-orange-500" : "hover:text-orange-500"
                }`}
              >
                {item}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-orange-500 transition-all duration-300 ${
                    index === 0 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </div>
            ))}
          </nav>

          {/* Desktop social icons */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-orange-500 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="lg:hidden text-2xl p-1"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen pb-6" : "max-h-0"
          }`}
        >
          <div className="border-t border-gray-800 pt-4">

            {/* Nav links — mapped from the same array, no duplication */}
            <div className="flex flex-col gap-3 text-sm uppercase font-medium">
              {navItems.map((item, index) => (
                <span
                  key={item}
                  className={`cursor-pointer transition-colors duration-200 ${
                    index === 0
                      ? "text-orange-500"
                      : "hover:text-orange-500 text-gray-200"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Social icons — now proper <a> links */}
            <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-800 text-lg">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-orange-500 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>

          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;