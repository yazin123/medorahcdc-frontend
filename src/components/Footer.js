'use client'
import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const [services, setServices] = useState([]);
    const [contacts, setContacts] = useState({});
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const base_urlimg = process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE;

    useEffect(() => {
        fetchServices();
        fetchContacts();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${base_url}services`);
            if (!response.ok) throw new Error('Failed to fetch services');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.log('Error loading services. Please try again later.');
        }
    };

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

    const renderSocialLink = (platform, icon) => {
        if (!contacts[platform]) return null;
        return (
            <Link href={contacts[platform]} className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
                {icon}
            </Link>
        );
    };

    return (
        <footer className="w-full px-4 py-4 mt-8">
            <div>
                <div className="mb-5">
                    <div className="grid gap-8">

                        <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
                            <iframe
                          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3937.110460900079!2d76.59760667502246!3d9.3234796907501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOcKwMTknMjQuNSJOIDc2wrAzNicwMC43IkU!5e0!3m2!1sen!2sin!4v1731505337359!5m2!1sen!2sin" 
                                 width="1000%"
                                height="100%"
                                className="border-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                    </div>
                </div>
            </div>
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 bg-gradient-to-r from-[#FCD767]/50 to-[#01B0AB]/50 rounded-3xl p-8 py-16">
                    <div className="space-y-4 flex md:block justify-center">
                        <Image src="/footer-logo.png" width={200} height={200} alt="Medorah Full Logo" className='w-50' />
                    </div>

                    {/* Pages Section */}
                    <div className="space-y-4 flex md:block justify-center text-center md:text-start">
                        <div>
                            <h3 className="font-semibold text-gray-800 text-center md:text-start">Pages</h3>
                            <ul className="space-y-2 text-center md:text-start">
                                <li><Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
                                <li><Link href="/about" className="text-gray-600 hover:text-gray-800">About</Link></li>
                                <li><Link href="/blog" className="text-gray-600 hover:text-gray-800">Blog</Link></li>
                                <li><Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact us</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Service Section */}
                    <div className="space-y-4 flex md:block justify-center text-center md:text-start">
                        <div>
                            <h3 className="font-semibold text-gray-800 text-center md:text-start mb-3">Services</h3>
                            <ul className="space-y-2 text-center md:text-start">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <Link href={`/${service.title}`} className="text-gray-600 hover:text-gray-800">
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-4 flex md:block justify-center text-center md:text-start">
                        <div>
                            <h3 className="font-semibold text-gray-800 text-center md:text-start">Contact</h3>
                            <ul className="space-y-2 text-center md:text-start">
                                {contacts['address'] && (
                                    <li className="text-gray-600">{contacts['address']}</li>
                                )}
                                {contacts['phone-primary'] && (
                                    <li className="text-gray-600"><a href={`tel:${contacts['phone-primary']}`} >{contacts['phone-primary']}</a></li>
                                )}

                                {contacts['phone-secondary'] && (
                                    <li className="text-gray-600"><a href={`tel:${contacts['phone-secondary']}`} >{contacts['phone-secondary']}</a></li>

                                )}
                                {contacts.email && (
                                    <li className="text-gray-600">{contacts.email}</li>
                                )}

                            </ul>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className="space-y-4 md:block justify-center text-center md:text-start hidden">
                        <div>
                            <h3 className="font-semibold text-gray-800 mb-3">Social media</h3>
                            <div className="flex space-x-4">
                                {renderSocialLink('facebook', <FaFacebookF className="w-4 h-4 text-gray-600" />)}
                                {renderSocialLink('instagram', <FaInstagram className="w-4 h-4 text-gray-600" />)}
                                {renderSocialLink('youtube', <FaYoutube className="w-4 h-4 text-gray-600" />)}
                                {renderSocialLink('linkedin', <FaLinkedinIn className="w-4 h-4 text-gray-600" />)}
                                {renderSocialLink('whatsapp', <FaWhatsapp className="w-4 h-4 text-gray-600" />)}
                                {renderSocialLink('email', <FaEnvelope className="w-4 h-4 text-gray-600" />)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-3 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 bg-gradient-to-r from-[#FCD767]/50 to-[#01B0AB]/50 rounded-3xl p-8">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        {renderSocialLink('facebook', <FaFacebookF className="w-4 h-4 text-gray-600" />)}
                        {renderSocialLink('instagram', <FaInstagram className="w-4 h-4 text-gray-600" />)}
                        {renderSocialLink('youtube', <FaYoutube className="w-4 h-4 text-gray-600" />)}
                        {renderSocialLink('whatsapp', <FaWhatsapp className="w-4 h-4 text-gray-600" />)}
                        {renderSocialLink('email', <FaEnvelope className="w-4 h-4 text-gray-600" />)}
                    </div>
                    <p className="text-gray-600 text-sm text-center">© 2024 medorahcdc.com All rights reserved.<br/><a href='https://www.mohammedyazin.com' >designed and developed by yazin</a></p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-gray-600 text-sm"
                    >
                        BACK TO TOP
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;