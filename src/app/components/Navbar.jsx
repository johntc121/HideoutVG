"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { key: 1, name: "Home", link: "/" },
    { key: 2, name: "Reviews", link: "/reviews" },
    { key: 3, name: "News", link: "/news" },
    { key: 4, name: "Blogs", link: "/blogs" },
    // { key: 5, name: "About", link: "/about" },
  ];
  // fixed w-full z-50 top-0 shadow-md ----------- possible nav class?
  return (
    <nav className="">
      <div className="flex justify-between items-center h-24 mx-auto py-4 px-12">
        {/* Logo */}
        <Link href="/" className="">
          <div className="text-xl font-semibold">
            Hideout
            <span className="text-3xl font-extrabold text-accent">VG</span>
            {/* <Image src="/icon.svg" alt="Tripeak Logo" fill={true} /> */}
          </div>
        </Link>

        {/* Desktop Menu */}
        <div>
          <div className="hidden lg:flex space-x-6">
            {navLinks.map((item) => (
              <Link
                key={item.key}
                href={item.link}
                className="font-semibold text-lg hover:text-accent lato"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden focus:outline-none z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={`block w-8 h-0.5  transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? "transform rotate-45 translate-y-2 bg-accent"
                    : "bg-accent"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 my-1 transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100 bg-accent"
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 transition-transform duration-300 ease-in-out ${
                  isOpen
                    ? "transform -rotate-45 -translate-y-2 bg-accent"
                    : "bg-accent"
                }`}
              ></span>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute z-40 top-0 left-0 w-full bg-mobile-background flex flex-col items-center justify-center space-y-8 py-8 transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "100vh" }}
      >
        {navLinks.map((item) => (
          <Link
            key={item.key}
            href={item.link}
            className="font-semibold text-lg hover:text-accent lato"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
