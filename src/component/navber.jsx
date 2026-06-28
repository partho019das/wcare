"use client"; // Better Auth হুক ব্যবহার করার জন্য ক্লায়েন্ট কম্পোনেন্ট আবশ্যক

import Link from 'next/link';
import React from 'react';
import { authClient } from "@/lib/auth-client"; // আপনার তৈরি করা ক্লায়েন্ট ফাইল
import { useRouter } from "next/navigation";

const NavbarPage = () => {
    const router = useRouter();
    // Better Auth-এর সেশন ডাটা রিড করা
    const { data: session, isPending } = authClient.useSession();

    // লগআউট হ্যান্ডলার
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // লগআউট হলে লগইন পেজে যাবে
                },
            },
        });
    };

    return (
        <nav className='w-full bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50'>
            <div className='w-full px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between'>
                
                {/* Logo */}
                <Link href="/" className='flex items-center gap-2 cursor-pointer shrink-0'>
                    <img 
                        className='w-9 h-9 sm:w-10 sm:h-10 object-contain' 
                        src='https://cdn-icons-png.flaticon.com/512/809/809957.png' 
                        alt="WeCare Logo" 
                    />
                    <h1 className='text-xl sm:text-2xl font-extrabold tracking-tight text-slate-800'> 
                        <span className='text-sky-600'>W</span>e<span className='text-sky-600'>C</span>are
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className='hidden md:flex items-center'>
                    <ul className='flex items-center gap-1 lg:gap-3 font-medium text-slate-600 text-sm lg:text-base'>
                        <li>
                            <Link href="/" className='px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 block'> 
                                Home 
                            </Link>
                        </li>
                        <li>
                            <Link href="/allapoinment" className='px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 block'> 
                                All Appointment 
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className='px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-600 transition-all duration-200 block'> 
                                Dashboard 
                            </Link>
                        </li>
                    </ul>
                </div>
                        
                {/* Authentication Buttons (Dynamic Based on Session) */}
                <div className='flex items-center gap-2 sm:gap-4'>
                    {isPending ? (
                        <span className="text-xs text-slate-400">Loading...</span>
                    ) : session ? (
                        // ইউজার লগইন থাকা অবস্থায় এটি দেখাবে
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-700 hidden sm:block">
                                {session.user?.name}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className='px-4 sm:px-5 py-2 text-xs sm:text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm transition-all duration-200'
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        // ইউজার লগইন না থাকলে এটি দেখাবে
                        <>
                            <Link href="/login" className='px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:text-sky-600 transition-colors duration-200'>
                                Login
                            </Link>
                            <Link href="/register" className='px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap'>
                                Register
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default NavbarPage;