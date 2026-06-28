
import Link from 'next/link';
import React from 'react';

const FooterPage = () => {
    return (
        <footer className='w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto font-sans'>
            {/* Main Footer Content */}
            <div className='w-full px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10'>
                
                {/* Brand & Social Section */}
                <div className='flex flex-col gap-5 lg:col-span-2'>
                    <div className='flex items-center gap-2.5'>
                        <img 
                            className='w-10 h-10 object-contain brightness-0 invert' 
                            src='docter-logo-removebg-preview.png' 
                            alt="WeCare Logo" 
                        />
                        <h1 className='text-2xl font-extrabold tracking-tight text-white'> 
                            <span className='text-sky-400'>W</span>e<span className='text-sky-400'>C</span>are
                        </h1>
                    </div>
                    <p className='text-sm text-slate-400 leading-relaxed max-w-sm'>
                        Your health is our top priority. Connect with trusted, certified doctors and manage your appointments seamlessly from anywhere, at any time.
                    </p>
                    
                    {/* Social Links with Floating Hover Effect */}
                    <div className='flex items-center gap-3.5 mt-2'>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-sky-600 hover:text-white transition-all duration-300 hover:-translate-y-1 text-slate-400 shadow-sm' title="Facebook">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                        </a>
                        {/* Twitter / X */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all duration-300 hover:-translate-y-1 text-slate-400 shadow-sm' title="X (Twitter)">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-sky-700 hover:text-white transition-all duration-300 hover:-translate-y-1 text-slate-400 shadow-sm' title="LinkedIn">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                        {/* YouTube */}
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className='w-9 h-9 rounded-full bg-slate-800/80 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 hover:-translate-y-1 text-slate-400 shadow-sm' title="YouTube">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.503 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.387.508 9.387.508s7.517 0 9.387-.508a3.003 3.003 0 0 0 2.11-2.11c.503-1.87.503-5.837.503-5.837s0-3.967-.503-5.837zm-14.248 9.423V8.414l6.26 3.586-6.26 3.586z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className='text-white font-bold mb-4 tracking-wider uppercase text-xs text-sky-400'>Explore</h3>
                    <ul className='space-y-3 text-sm font-medium'>
                        <li>
                            <Link href="/" className='hover:text-sky-400 hover:translate-x-1 transition-all duration-200 block'>Home</Link>
                        </li>
                        <li>
                            <Link href="/Appointment" className='hover:text-sky-400 hover:translate-x-1 transition-all duration-200 block'>All Appointment</Link>
                        </li>
                        <li>
                            <Link href="/Dashboard" className='hover:text-sky-400 hover:translate-x-1 transition-all duration-200 block'>Dashboard</Link>
                        </li>
                    </ul>
                </div>

                {/* Our Services */}
                <div>
                    <h3 className='text-white font-bold mb-4 tracking-wider uppercase text-xs text-sky-400'>Medical Services</h3>
                    <ul className='space-y-3 text-sm text-slate-400 font-medium'>
                        <li className='hover:text-sky-400 cursor-pointer hover:translate-x-1 transition-all duration-200 block'>Cardiology Department</li>
                        <li className='hover:text-sky-400 cursor-pointer hover:translate-x-1 transition-all duration-200 block'>Neurology & Spine</li>
                        <li className='hover:text-sky-400 cursor-pointer hover:translate-x-1 transition-all duration-200 block'>Pediatric Care</li>
                        <li className='hover:text-sky-400 cursor-pointer hover:translate-x-1 transition-all duration-200 block'>Dental & Oral Health</li>
                    </ul>
                </div>

                {/* Newsletter / Attractive Element */}
                <div>
                    <h3 className='text-white font-bold mb-4 tracking-wider uppercase text-xs text-sky-400'>Stay Updated</h3>
                    <p className='text-xs text-slate-400 mb-3 leading-relaxed'>Subscribe to receive health tips and premium offers.</p>
                    <div className='flex flex-col gap-2'>
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className='w-full px-3.5 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors'
                        />
                        <button className='w-full px-3.5 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow transition-all duration-200 active:scale-95'>
                            Subscribe
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Copyright Section */}
            <div className='border-t border-slate-800 bg-slate-950 px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium'>
                <p>© {new Date().getFullYear()} WeCare. All rights reserved.</p>
                <div className='flex gap-6'>
                    <a href="#" className='hover:text-slate-300 transition-colors duration-200'>Privacy Policy</a>
                    <a href="#" className='hover:text-slate-300 transition-colors duration-200'>Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default FooterPage;