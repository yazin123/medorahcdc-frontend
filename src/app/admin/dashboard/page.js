'use client'
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sunrise, Clock, BookOpen, Phone, HelpCircle, Image, Wrench, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import AdminLayout from '../admin';

const WelcomeDashboard = ({ userName = 'there' }) => {
    const [greeting, setGreeting] = useState('');
    const [icon, setIcon] = useState(null);
    const [currentTime, setCurrentTime] = useState('');

    const navigationLinks = [
        { name: 'Blog', icon: <BookOpen className="w-5 h-5" />, href: '/admin/dashboard/blogs' },
        { name: 'Contacts', icon: <Phone className="w-5 h-5" />, href: '/admin/dashboard/contacts' },
        { name: 'FAQ', icon: <HelpCircle className="w-5 h-5" />, href: '/admin/dashboard/faq' },
        { name: 'Gallery', icon: <Image className="w-5 h-5" />, href: '/admin/dashboard/gallery' },
        { name: 'Services', icon: <Wrench className="w-5 h-5" />, href: '/admin/dashboard/services' },
        { name: 'Team', icon: <Users className="w-5 h-5" />, href: '/admin/dashboard/team' },
        { name: 'Testimonial', icon: <MessageCircle className="w-5 h-5" />, href: '/admin/dashboard/testimonials' },
    ];

    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const hour = new Date().getHours();
            const minutes = new Date().getMinutes();

            // Format time
            const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            setCurrentTime(formattedTime);

            // Set greeting and icon based on time of day
            if (hour >= 5 && hour < 12) {
                setGreeting('Good Morning');
                setIcon(<Sunrise className="w-8 h-8 text-amber-500" />);
            } else if (hour >= 12 && hour < 17) {
                setGreeting('Good Afternoon');
                setIcon(<Sun className="w-8 h-8 text-yellow-500" />);
            } else if (hour >= 17 && hour < 21) {
                setGreeting('Good Evening');
                setIcon(<Sun className="w-8 h-8 text-orange-500" />);
            } else {
                setGreeting('Good Night');
                setIcon(<Moon className="w-8 h-8 text-blue-500" />);
            }
        };

        updateTimeAndGreeting();
        const interval = setInterval(updateTimeAndGreeting, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">
                <AdminLayout>
            <div className="p-6 bg-gradient-to-br from-white to-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            {icon}
                            <h1 className="text-2xl font-semibold text-gray-800">
                                {greeting}, {userName}!
                            </h1>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{currentTime}</span>
                        </div>
                        <p className="mt-2 text-gray-600 max-w-lg">
                            Welcome to <span className="font-semibold text-blue-600">MedorahCDC</span> Dashboard.
                            Empowering communities through innovative healthcare solutions.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end space-y-2">
                        <div className="bg-blue-50 px-4 py-2 rounded-lg">
                            <p className="text-sm text-blue-600 font-medium">CDC Healthcare Solutions</p>
                            <p className="text-xs text-blue-500">Transforming Lives, Building Futures</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Icons */}
                <div className="mt-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex flex-col items-center p-4 space-y-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 hover:bg-blue-50 group"
                            >
                                <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-200">
                                    {React.cloneElement(link.icon, { className: "w-6 h-6 text-blue-600" })}
                                </div>
                                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">
                                    {link.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            </AdminLayout>
        </div>
    );
};

export default WelcomeDashboard;