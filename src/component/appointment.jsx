import React from 'react';

const ApoinmentPage = () => {
    return (
        <div>
            <div className="py-16 bg-gradient-to-b from-white to-blue-50/50">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* সেকশন হেডার (আপনার মেইন স্টাইলের সাথে মিল রেখে) */}
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 mb-4 uppercase tracking-wider border border-blue-200/60">
        Easy Steps
      </span>
      <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        How It Works
      </h2>
      <p className="text-gray-500 text-lg max-w-xl mx-auto font-normal">
        Get your medical consultation done in just 3 simple and secure steps.
      </p>
    </div>

    {/* ৩টি ধাপের গ্রিড লেআউট */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      
      {/* Step 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:shadow-md transition-all">
        <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
          01
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Find Your Doctor</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Search from our top-rated specialists by their specialty, experience, or location.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:shadow-md transition-all">
        <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
          02
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Book Appointment</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Choose your preferred date and time, fill up the quick patient form securely.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center relative hover:shadow-md transition-all">
        <div className="w-14 h-14 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
          03
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Get Medical Care</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Visit the designated hospital clinic on time and receive premium healthcare.
        </p>
      </div>

    </div>
  </div>
</div>
        </div>
    );
};

export default ApoinmentPage;