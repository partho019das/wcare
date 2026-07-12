'use client';

import React, { useState } from 'react';
import { Form, Button, TextField, Input, Label, FieldError } from '@heroui/react';
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import Link from 'next/link';

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                alert(error.message); 
            } else {
                alert("Logged in successfully!");
                router.push('/'); 
                router.refresh();
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full">
                
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">Welcome Back</h2>
                    <p className="text-xs text-slate-400 mt-1">Login to access your WeCare dashboard.</p>
                </div>

                {/* Main Login Form */}
                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    
                    {/* Email Field */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label className="text-xs font-bold text-slate-700 uppercase mb-1">Email Address</Label>
                        <Input placeholder="john@example.com" className="bg-white" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Password Field */}
                    <TextField
                        isRequired
                        name="password"
                        type="password"
                    >
                        <Label className="text-xs font-bold text-slate-700 uppercase mb-1">Password</Label>
                        <Input placeholder="Enter your password" className="bg-white" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3 mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Form>

                {/* Google Login Button */}
                <Button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3 mt-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/web-24dp/copy_64_64.png" className="w-5 h-5" alt="Google" />
                    Sign in with Google
                </Button>

                {/* Footer Link to Register Page */}
                <p className="text-center text-xs text-slate-500 mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-sky-600 font-bold hover:underline">
                        Register here
                    </Link>
                </p>

            </div>
        </section>
    );
};

export default LoginPage;