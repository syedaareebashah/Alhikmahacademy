"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import Banner from "../../../public/L-Learn-Islam-Banner-768x243.jpg";

const Hero = () => {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Background Image with Zoom Animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <Image
          alt="Islamic"
          src={Banner}
          fill
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* Dark Overlay with Fade */}
      <motion.div
        className="absolute inset-0 bg-black/50 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>

      {/* Animated Text Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 p-6 text-center">
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Transform Your Quranic Journey with{" "}
          <span className="text-yellow-400">Al-Hikmah!</span>
        </motion.h1>

        <motion.p
          className="text-lg mb-4"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          📿 Learn Quran with Tajweed, Hifz & Tafsir – Anytime, Anywhere!
        </motion.p>

        <motion.p
          className="text-base bg-yellow-500 text-black py-2 px-4 rounded-lg shadow-lg cursor-pointer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ scale: 1.1, backgroundColor: "#facc15", boxShadow: "0px 0px 12px rgba(255,255,0,0.6)" }}
        >
        Online & In-Person Classes | Certified Instructors | Interactive Learning
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
