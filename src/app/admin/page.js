'use client'
import React, { useState, useEffect } from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formTouched, setFormTouched] = useState(false);
    const router = useRouter();
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL

    useEffect(() => {
        if (localStorage.getItem("adminToken")) {
            window.location.href = "/admin/dashboard/blogs";
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${base_url}admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            localStorage.setItem('adminToken', data.token);
            window.location.href = "/admin/dashboard";

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isFormValid = email && password.length >= 6 && isValidEmail(email);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-xl p-8 space-y-8">
                    <div className="text-center">
                        <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FiMail className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Admin Login
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your credentials to access the admin panel
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md animate-fadeIn">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="relative group">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setFormTouched(true);
                                        }}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {formTouched && email && !isValidEmail(email) && (
                                    <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
                                )}
                            </div>

                            <div className="relative group">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FiLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setFormTouched(true);
                                        }}
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex="-1"
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        ) : (
                                            <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                                        )}
                                    </button>
                                </div>
                                {formTouched && password && password.length < 6 && (
                                    <p className="mt-1 text-sm text-red-600">Password must be at least 6 characters</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading || !isFormValid}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 relative overflow-hidden"
                            >
                                {loading ? (
                                    <>
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        </span>
                                        <span className="ml-8">Signing in...</span>
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;