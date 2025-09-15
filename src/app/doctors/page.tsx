// app/doctors/page.tsx
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const categories = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

type Doctor = {
  _id: string;
  name: string;
  Specialization: string;
  availability: boolean;
  image: string;
};

// Skeleton shimmer card
const DoctorCardSkeleton = () => (
  <div className=" rounded-lg shadow-sm p-4 animate-pulse">
    <div className="relative w-full h-52 mb-3 bg-gray-300 rounded-md"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
    <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
);

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data.data);
      } catch (error) {
        console.error("Failed to load doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filteredDoctors =
    selectedCategory === "All"
      ? doctors
      : doctors.filter((doc) => doc.Specialization === selectedCategory);

  return (
    <div className="px-6 md:px-20 lg:px-28 py-12">
      <h2 className="text-lg md:text-xl font-medium mb-6">
        Browse through the doctors specialist.
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`w-full text-left border rounded-lg px-4 py-2 mb-2 ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left border rounded-lg px-4 py-2 mb-2 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? // Show shimmer while loading
              Array.from({ length: 6 }).map((_, idx) => (
                <DoctorCardSkeleton key={idx} />
              ))
            : filteredDoctors.map((doc) => (
                <Link key={doc._id} href={`/doctorDetails/${doc._id}`}>
                  <div className=" rounded-lg shadow-lg p-4 hover:shadow-lg transition cursor-pointer">
                    <div className="relative w-full h-52 mb-3 bg-gray-50 rounded-md">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                    <p className="text-green-600 text-sm font-medium mb-1">
                      ● {doc.availability ? "Available" : "Not Available"}
                    </p>
                    <h3 className="font-bold text-lg">{doc.name}</h3>
                    <p className="text-gray-600">{doc.Specialization}</p>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
