'use client';

import React, { useState } from 'react';
import { Form, Button, TextField, Input, Label, Description, FieldError } from '@heroui/react';
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const imageUrl = formData.get('image');

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                image: imageUrl,
            });

            if (error) {
                alert(error.message);
            } else {
                alert("Account created successfully!");
                router.push('/dashboard');
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
            callbackURL: "/dashboard",
        });
    };

    return (
        <section className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-xl max-w-md w-full">
                
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-extrabold text-slate-800">Create Account</h2>
                    <p className="text-xs text-slate-400 mt-1">Join WeCare and book medical sessions instantly.</p>
                </div>

                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
                    
                    <TextField isRequired name="name" type="text">
                        <Label className="text-xs font-bold text-slate-700 uppercase mb-1">Full Name</Label>
                        <Input placeholder="e.g. John Doe" className="bg-white" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

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

                    <TextField name="image" type="url">
                        <Label className="text-xs font-bold text-slate-700 uppercase mb-1">Profile Image URL</Label>
                        <Input placeholder="https://example.com/avatar.jpg" className="bg-white" />
                        <Description className="text-[10px] text-slate-400 mt-0.5">Provide a direct picture URL for your avatar (Optional)</Description>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain at least one number";
                            return null;
                        }}
                    >
                        <Label className="text-xs font-bold text-slate-700 uppercase mb-1">Password</Label>
                        <Input placeholder="Enter your secure password" className="bg-white" />
                        <Description className="text-[10px] text-slate-400 mt-0.5">Must be 8+ characters with 1 uppercase & 1 number</Description>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button 
                            type="submit" 
                            disabled={loading}
                            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-sm shadow-md transition-all duration-200"
                        >
                            {loading ? "Creating..." : "Register"}
                        </Button>
                    </div>
                </Form>

                <Button 
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full py-3 mt-3 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm shadow-sm hover:bg-slate-50 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/web-24dp/copy_64_64.png" className="w-5 h-5" alt="Google" />
                    Sign up with Google
                </Button>

                <p className="text-center text-xs text-slate-500 mt-6">
                    Already have an account?{" "}
                    <a href="/login" className="text-sky-600 font-bold hover:underline">Login here</a>
                </p>

            </div>
        </section>
    );
};

export default RegisterPage;