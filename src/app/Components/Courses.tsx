"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from '../../../public/imgQuran.jpg';
import child from '../../../public/child.jpg';
import img2 from '../../../public/2.jpg';


const Courses = () => {
  const courses = [
    {
      title: "Hifz-e-Quran",
      description: "Memorize the Quran with expert guidance and personalized plans.",
      Image: img1
    },
    {
      title: "Basic Qaida for Beginners",
      description: "Perfect for new learners to start reading Quran with proper pronunciation.",
      Image: child
    },
    {
      title: "Quran Recitation with Tajweed",
      description: "Improve your Quranic recitation with correct Tajweed rules and fluency.",
      Image: img2
    },
  ];

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-blue-50 to-gray-100">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📖 Our <span className="text-yellow-500">Quran Courses</span>
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-lg text-center border-t-4 border-cyan-700 
            transition-all duration-300 hover:shadow-2xl hover:border-yellow-500 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg shadow-md">
              <Image 
                src={course.Image} 
                alt={course.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-cyan-800">{course.title}</h3>
            <p className="text-gray-600 mt-3 mb-6 px-4">{course.description}</p>
            <motion.a
              href="/Enrolment"
              className="inline-block bg-cyan-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-yellow-600 transition-all text-lg"
              whileHover={{ scale: 1.1 }}
            >
              Enroll Now
            </motion.a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Courses