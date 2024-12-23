import React, { useState, useEffect } from 'react';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';

const ContactSection = () => {
    const [contacts, setContacts] = useState({});
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${base_url}contacts`);
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const data = await response.json();
            // Convert array to object with media as keys
            const contactsObj = data.reduce((acc, contact) => {
                acc[contact.media] = contact.value;
                return acc;
            }, {});
            setContacts(contactsObj);
        } catch (error) {
            console.log('Error loading contacts. Please try again later.');
        }
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
        firstName: e.target.elements[0].value,
        lastName: e.target.elements[1].value,
        email: e.target.elements[2].value,
        phone: e.target.elements[3].value,
        message: e.target.elements[4].value
    };

    try {
        const response = await fetch(`${base_url}contacts/send-email`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Failed to send message');
        alert('Message sent successfully!');
        e.target.reset();
    } catch (error) {
        alert('Failed to send message. Please try again.');
    }
};
    const renderSocialLink = (platform, icon) => {
        if (!contacts[platform]) return null;
        return (
            <a 
                href={contacts[platform]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl text-gray-800 hover:text-blue-800 cursor-pointer transition-colors"
            >
                {icon}
            </a>
        );
    };

    return (
        <div className="max-w-7xl mx-auto shadow-lg rounded-3xl px-4 py-16" id='contact'>
            <div className="p-2 mx-auto grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 bg-gradient-to-r from-[#FCD767]/50 to-[#01B0AB]/50">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <p className="text-gray-600 mb-8">Say something to start a live chat!</p>

                    <div className="space-y-6">
                        {contacts['phone-primary'] && (
                            <div className="flex items-center gap-4">
                                <HiPhone className="text-2xl text-blue-800 hidden md:block" />
                                <span>{contacts['phone-primary']}</span>
                            </div>
                        )}

                        {contacts['phone-secondary'] && (
                            <div className="flex items-center gap-4">
                                <HiPhone className="text-2xl text-blue-800 hidden md:block" />
                                <span>{contacts['phone-secondary']}</span>
                            </div>
                        )}

                        {contacts.email && (
                            <div className="flex items-center gap-4">
                                <HiMail className="text-2xl text-blue-800 hidden md:block" />
                                <span>{contacts.email}</span>
                            </div>
                        )}

                        {contacts.whatsapp && (
                            <div className="flex items-center gap-4">
                                <FaWhatsapp className="text-2xl text-blue-800 hidden md:block" />
                                <span>{contacts.whatsapp}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <HiLocationMarker className="text-2xl text-blue-800 hidden md:block" />
                            <span>{contacts.address || "132 Dartmouth Street Boston, Massachusetts 02156 United States"}</span>
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        {renderSocialLink('facebook', <FaFacebookF />)}
                        {renderSocialLink('instagram', <FaInstagram />)}
                        {renderSocialLink('youtube', <FaYoutube />)}
                        {renderSocialLink('linkedin', <FaLinkedinIn />)}
                    </div>
                </div>

                {/* Right Column */}
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Message
                            </label>
                            <textarea
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Write your message..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-950 text-white py-3 px-6 rounded-full hover:bg-blue-900 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactSection;
