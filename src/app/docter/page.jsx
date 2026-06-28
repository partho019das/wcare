import React from 'react';
import Link from 'next/link';

const DocterPage = async () => {
  let docter = [];
  
  try {
    // localhost এর জায়গায় 127.0.0.1 দিয়ে সরাসরি আইপিতে হিট করা হয়েছে
    const res = await fetch("http://127.0.0.1:5000/docter", { cache: 'no-store' });
    if (res.ok) {
      docter = await res.json();
    }
  } catch (err) {
    console.error("Failed to load doctors on homepage:", err);
  }

  const limitedDoctors = Array.isArray(docter) ? docter.slice(0, 3) : [];

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Our Top Doctors
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Meet our highly qualified specialists dedicated to your health.
          </p>
        </div>
        
        {/* Doctor Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {limitedDoctors.map((doc) => (
            <div 
              key={doc._id} 
              className="bg-white border border-gray-100 rounded-3xl p-6 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group"
            >
              {/* Doctor Avatar Image */}
              <div className="relative w-28 h-28 mb-5 ring-4 ring-blue-50 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={doc.image || "https://via.placeholder.com/150"} 
                  alt={doc.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Profile Info */}
              <h3 className="text-xl font-bold text-gray-800 line-clamp-1 mb-1">
                {doc.name}
              </h3>
              
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-3 inline-block">
                {doc.specialty}
              </span>

              {/* Rating System */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-bold text-gray-600 ml-1">
                  {doc.rating || "5.0"}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-6 font-medium">
                💼 Experience: {doc.experience || "N/A"}
              </p>

              {/* View Details Button */}
              <Link 
                href={`/docterdetail/${doc._id}`}
                className="mt-auto w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors duration-200 block text-center shadow-sm hover:shadow-md"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State Fallback */}
        {limitedDoctors.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-sm font-medium">
            No featured doctors found at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default DocterPage;