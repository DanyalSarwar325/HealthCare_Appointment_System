"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Doctor = {
  _id: string;
  name: string;
  Specialization?: string; // from API
  specialty?: string; // fallback from static data
  availability: boolean;
  image: string;
};

// Shimmer placeholder (no border)
const DoctorCardSkeleton = () => (
  <div className="w-64 animate-pulse">
    <div className="relative w-full h-52 mb-3 bg-gray-200 rounded-lg"></div>
    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
    <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export const DoctorsList = () => {
  const [doctorData, setDoctorData] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctorData(data.data);
      })
      .catch(() => {
        console.error("Failed to fetch doctors");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Top Doctors to Book in
        </h2>
        <p className="text-gray-500 mt-2">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {/* Container with centered grid */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <DoctorCardSkeleton key={i} />)
            : doctorData.map((doc) => (
                <Link
                  key={doc._id || doc.name}
                  href={`/doctorDetails/${doc._id || doc.name}`}
                  className="block"
                >
                  <div className="w-64 shadow-sm hover:shadow-lg transition cursor-pointer">
                    {/* Equal image height */}
                    <div className="relative w-full h-52 bg-gray-50 rounded-t-lg">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <p
                        className={`text-sm font-medium mb-1 ${
                          doc.availability ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        ● {doc.availability ? "Available" : "Not Available"}
                      </p>
                      <h3 className="font-bold text-lg text-gray-800">
                        {doc.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {doc.Specialization || doc.specialty}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
};
