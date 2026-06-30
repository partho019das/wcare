import React from 'react';
import { getusers } from '../../lib/data'; 
import Link from 'next/link';

// Next.js প্রোডাকশন বিল্ডে যেন ডাইনামিক আইডি ফেচিং ক্র্যাশ না করে, তাই force-dynamic রাখা হলো
export const dynamic = "force-dynamic";

const DoctorDetailPage = async ({ params }) => {
  // Next.js 15+ এ params একটি প্রমিজ (Promise), তাই সঠিক উপায়ে এটি await করা হয়েছে
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  
  const doctors = await getusers();
  const allDoctors = Array.isArray(doctors) ? doctors : [];
  
  // MongoDB _id সাধারণত Object আকারে থাকে, তাই স্ট্রিং কম্প্যারিজনের জন্য .toString() বা String() সেফটি হ্যান্ডলিং যোগ করা হলো
  const doc = allDoctors.find((d) => {
    const docId = d._id ? String(d._id) : String(d.id);
    return docId === String(id);
  });

  if (!doc) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold text-gray-700">Doctor Not Found!</h2>
        <Link href="/docter" className="mt-4 text-blue-600 hover:underline font-medium">
          Back to Doctors List
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/docter" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            ← Back to Doctors List
          </Link>
        </div>
        
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm">
          
          {/* Profile Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 relative ring-4 ring-blue-50 rounded-2xl overflow-hidden shrink-0">
            <img 
              src={doc.image || "https://via.placeholder.com/300"} 
              alt={doc.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Content */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{doc.name}</h1>
              <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                {doc.specialty}
              </span>
            </div>

            {/* Ratings & Experience */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 font-medium">
              <div className="flex items-center text-amber-500 gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{doc.rating || "5.0"}</span>
              </div>
              <div>•</div>
              <div>💼 {doc.experience || "N/A"} Experience</div>
            </div>

            {/* Database Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
              <div className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl">
                <span className="text-xl">🏥</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Hospital</p>
                  <p className="font-semibold text-gray-700">{doc.hospital || "Not Specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl">
                <span className="text-xl">📍</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Location</p>
                  <p className="font-semibold text-gray-700">{doc.location || "Not Specified"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl">
                <span className="text-xl">💵</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Consultation Fee</p>
                  <p className="font-bold text-green-600 text-base">৳ {doc.fee || "Free"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50/60 rounded-xl">
                <span className="text-xl">⏱️</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Availability</p>
                  <p className="font-semibold text-blue-600">{doc.availability || "Available"}</p>
                </div>
              </div>
            </div>

            {/* URL পাস করার সময় ID স্ট্রিং এ রূপান্তর নিশ্চিত করা হলো */}
            <Link 
              href={`/aform?docId=${doc._id ? String(doc._id) : String(doc.id)}`}
              className="w-full md:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 inline-flex items-center justify-center gap-2 text-center"
            >
              📅 Get Appointment
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DoctorDetailPage;