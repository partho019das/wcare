// /src/app/allapoinment/page.jsx

import React from 'react';
import Link from 'next/link';
import { getDoctors } from '@/lib/api';

const AllapoinmentPage = async () => {
  const docter = await getDoctors();
  const allDoctors = Array.isArray(docter) ? docter : [];

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            All Available Doctors
          </h1>
          <p className="text-gray-600">
            Total {allDoctors.length} specialists found to take care of your health.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {allDoctors.map((doc) => (
            <div
              key={doc._id}
              className="bg-white border border-gray-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
            >
              <div className="relative w-24 h-24 mb-4 ring-4 ring-blue-50 rounded-full overflow-hidden">
                <img
                  src={doc.image || 'https://via.placeholder.com/150'}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800 line-clamp-1 mb-1">
                {doc.name}
              </h3>

              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block">
                {doc.specialty}
              </span>

              <p className="text-xs text-gray-500 mb-6 font-medium">
                💼 Experience: {doc.experience}
              </p>

              <Link
                href={`/docterdetail/${doc._id}`}
                className="mt-auto w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200 block text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {allDoctors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No doctors found at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default AllapoinmentPage;