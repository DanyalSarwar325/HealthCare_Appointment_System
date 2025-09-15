// components/HeroSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="w-[90%] bg-[#5A6CF3] rounded-2xl flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 m-auto mt-10">
      {/* Left Content */}
      <div className="text-center md:text-left max-w-lg space-y-6">
        <Link
          href="/doctors"
          className="text-3xl md:text-5xl font-bold text-white leading-snug block "
        >
          Book Appointment <br /> With Trusted Doctors
        </Link>
        <p className="text-white/90 text-sm md:text-base">
          Simply browse through our extensive list of trusted doctors, <br />
          schedule your appointment hassle-free.
        </p>

        {/* Avatars + Button */}
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
          {/* Example profile avatars */}
          <div className="flex -space-x-3">
            <Image
              src="/avatars/doc1.jpg"
              alt="Doctor 1"
              width={40}
              height={40}
              className="rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/group_profiles.png"
              alt="Doctor 2"
              width={40}
              height={40}
              className="rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/avatars/doc3.jpg"
              alt="Doctor 3"
              width={40}
              height={40}
              className="rounded-full border-2 border-white object-cover"
            />
          </div>

          {/* ✅ Fixed button link */}
          <Link href="/doctors">
            <button className="bg-white text-[#5A6CF3] px-6 py-3 rounded-full font-medium shadow hover:scale-105 transition cursor-pointer">
              Book appointment →
            </button>
          </Link>
        </div>
      </div>

      {/* Right Content (Image Placeholder) */}
      <div className="mt-10 md:mt-0 md:ml-10 flex-1 flex items-center justify-center">
        {/* Replace with your doctor image */}
        <div className="w-64 h-64 md:w-80 md:h-80 bg-white rounded-xl shadow-inner flex items-center justify-center text-gray-400">
          <img src="/frontend/about_image.png" alt="" />
        </div>
      </div>
    </section>
  );
};
