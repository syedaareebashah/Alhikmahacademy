"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import logo from "../../../public/Remove background project (1)(1).png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  return (
    <div>
      {/* Top Banner */}
      <motion.div
        className="bg-cyan-700 text-center text-white text-lg sm:text-xl p-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        خَيْرُکُم مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
      </motion.div>

      {/* Navbar */}
      <nav className="bg-cyan-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <Image src={logo} alt="AL-HIKMAH" width={80} height={50} />
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 text-lg">
              <Link href="/" className="hover:underline hover:text-amber-300">
                Home
              </Link>
              <Link href="/courses" className="hover:underline hover:text-amber-300">
                Courses
              </Link>
              <Link href="/about" className="hover:underline hover:text-amber-300">
                About us
              </Link>
              <Link href="/review" className="hover:underline hover:text-amber-300">
                Reviews
              </Link>
              <Link href="/contact" className="hover:underline hover:text-amber-300">
                Contact us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
              >
                {isOpen ? <X size={30} /> : <Menu size={30} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-cyan-600 text-white text-lg flex flex-col items-center space-y-4 py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-amber-300" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/courses" className="hover:text-amber-300" onClick={() => setIsOpen(false)}>
              Courses
            </Link>
            <Link href="/about" className="hover:text-amber-300" onClick={() => setIsOpen(false)}>
              About us
            </Link>
            <Link href="/review" className="hover:text-amber-300" onClick={() => setIsOpen(false)}>
              Reviews
            </Link>
            <Link href="/contact" className="hover:text-amber-300" onClick={() => setIsOpen(false)}>
              Contact us
            </Link>
          </motion.div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
