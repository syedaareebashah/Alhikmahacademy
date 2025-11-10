// components/Footer.tsx
import { BookOpen, Facebook, Instagram, Globe } from "lucide-react";
import bismillah from "../../../public/Remove background project (1)(1).png";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cyan-900 text-yellow-200 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Logo + Academy Name */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start mb-8">
          <Image
            src={bismillah}
            alt="Alhikmat Logo"
            className="h-14 w-auto"
          />
          <h2 className="mt-3 md:mt-0 md:ml-3 text-2xl font-bold text-yellow-300 flex items-center gap-2 hover:text-cyan-700">
            <BookOpen className="w-7 h-7 text-yellow-400 hover:text-cyan-800" />
            Alhikmat Quran Academy
          </h2>
        </div>

        {/* Grid Content */}
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">About Us</h3>
            <p className="text-sm text-yellow-100 leading-relaxed">
              Our mission is to spread the light of the Qur’an and Islamic education 
              using modern technology, making knowledge accessible to every home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-yellow-400">Home</a></li>
              <li><a href="/courses" className="hover:text-yellow-400">Courses</a></li>
              <li><a href="/about" className="hover:text-yellow-400">About Us</a></li>
              <li><a href="/contact" className="hover:text-yellow-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-3">Contact</h3>
            <p>Email: <a href="mailto:info@alhikmah.com" className="hover:text-yellow-400">alhikmatacademyyyy@gmail.com</a></p>
            <p>Phone: <a href="tel:+923001234567" className="hover:text-yellow-400">+92 332 3259557</a></p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:text-yellow-400"><Facebook /></a>
              <a href="https://www.instagram.com/alhik_mahacademy?utm_source=qr&igsh=dzZ1c29rM2dreTlh" className="hover:text-yellow-400"><Instagram /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-yellow-500 mt-8 pt-4 text-center text-sm text-yellow-100">
          © {new Date().getFullYear()} Alhikmat Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
