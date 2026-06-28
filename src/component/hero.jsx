import React from 'react';

const BannerPage = () => {
    return (
        <section className='w-full bg-gradient-to-br from-slate-50 via-white to-sky-50/50 py-12 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh] flex items-center'>
            <div className='w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
                
                {/* Left Side: Content & Action Buttons */}
                <div className='lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-10'>
                    {/* Badge */}
                    <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 text-sky-600 font-semibold text-xs sm:text-sm mx-auto lg:mx-0 w-fit mb-5 shadow-sm border border-sky-100/50'>
                        <span className='w-2 h-2 rounded-full bg-sky-500 animate-pulse'></span>
                        Your Health, Our Priority
                    </div>
                    
                    {/* Main Heading */}
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none mb-6'>
                        Find & Book <br className='hidden sm:inline'/>
                        <span className='text-sky-600 relative inline-block mt-1 sm:mt-2'>
                            Expert Doctors
                            <span className='absolute bottom-1 left-0 w-full h-2 bg-sky-100 -z-10 rounded-full'></span>
                        </span> Easily
                    </h1>
                    
                    {/* Sub-heading */}
                    <p className='text-base sm:text-lg text-slate-500 max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed font-medium'>
                        Skip the waiting rooms. Connect with verified medical specialists online and schedule your appointments within minutes. Premium care right at your fingertips.
                    </p>
                    
                    {/* Action Buttons */}
                    <div className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'>
                        <button className='w-full sm:w-auto px-8 py-4 font-bold text-sm text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30 transition-all duration-300 active:scale-98'>
                            Book Appointment Now
                        </button>
                        <button className='w-full sm:w-auto px-8 py-4 font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-sm transition-all duration-300 active:scale-98 flex items-center justify-center gap-2'>
                            Explore Specialists
                        </button>
                    </div>
                </div>

                {/* Right Side: Creative Image Grid Layout */}
                <div className='lg:col-span-6 relative flex justify-center items-center h-[350px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0'>
                    {/* Background Decorative Circle */}
                    <div className='absolute w-72 h-72 sm:w-96 sm:h-96 bg-sky-200/40 rounded-full blur-3xl -z-10 animate-blob'></div>
                    <div className='absolute w-60 h-60 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000 right-0 top-0'></div>

                    {/* Image 1: Main Top-Left Image */}
                    <div className='absolute left-2 sm:left-6 top-0 w-[60%] h-[75%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500 z-10'>
                        <img 
                            className='w-full h-full object-cover' 
                            src='team-doctors-walking-row.jpg' 
                            alt="Team of Doctors" 
                        />
                    </div>

                    {/* Image 2: Secondary Bottom-Right Image */}
                    <div className='absolute right-2 sm:right-6 bottom-0 w-[55%] h-[70%] rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500'>
                        <img 
                            className='w-full h-full object-cover' 
                            src='woman-biochemist-checking-manifestations-virus-working-computer-equipped-lab-late-night.jpg' 
                            alt="Biochemist in Lab" 
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BannerPage;