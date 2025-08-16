"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import QuranImage from "../../../public/about.jpeg";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-8 md:px-12">
      {/* Header Section */}
      <motion.div
        className="max-w-5xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          About <span className="text-yellow-500">Al-Hikmah Academy</span>
        </h2>
        <p className="text-gray-600 mt-4 text-base sm:text-lg">
          Empowering students with deep Quranic knowledge through expert guidance and structured learning.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800">Who We Are</h3>
          <p className="text-gray-600 text-base sm:text-lg">
            <span className="text-yellow-500 font-semibold">Al-Hikmah Academy</span> is an online Islamic school offering 
            Quran education to students worldwide. With highly qualified teachers, we ensure a deep understanding of:
          </p>
          <ul className="list-disc pl-5 sm:pl-6 text-gray-600 text-base sm:text-lg hover:text-cyan-800 space-y-2">
            <li>Basic Quran Reading</li>
            <li>Quran with Tajweed</li>
       
            <li>Tafseer-e-Quran</li>
            <li>Quranic Arabic</li>
          </ul>

          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 hover:text-cyan-600">
            Why Choose Us?
          </h3>
          <p className="text-gray-600 text-base sm:text-lg hover:text-yellow-600">
            Our flexible online classes make learning the Quran easier than ever! With access on any device, we provide one-on-one sessions with expert teachers to suit your comfort. 
          </p>
          <p className="text-gray-600 text-base sm:text-lg hover:text-yellow-600">
            We offer flexible class timings and lifetime access to course materials, so you can keep improving your Quranic knowledge at your own pace.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="/contact"
              className="bg-cyan-500 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-cyan-600 transition-all text-center"
              whileHover={{ scale: 1.05 }}
            >
              Contact Us
            </motion.a>
           
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="rounded-lg overflow-hidden shadow-lg w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Image
            src={QuranImage}
            alt="About Al-Hikmah"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
