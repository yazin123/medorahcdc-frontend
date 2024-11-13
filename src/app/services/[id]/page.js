//app/services/[id]/page.js
'use client'
import BlogGrid from '@/components/Home/Blog';
import ContactSection from '@/components/Home/Contact';
import Hero from '@/components/Home/Hero'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';


const HowItWorks = ({ title, steps }) => {
    // Convert comma-separated steps into an array of step objects
    const stepsArray = steps.split('//').map((step, index) => ({
        number: index + 1,
        title: step.trim(),
        description: "",  // Empty description since it's not in the data
        icon: FaCheckCircle
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center flex-wrap md:flex-nowrap gap-3" data-aos="fade-up">
            <div className='bg-gray-200 p-6 rounded-3xl'>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">How {title} Works</h2>
                </div>

                <div className="space-y-6">
                    {stepsArray.map((step) => (
                        <div key={step.number} className="flex items-start gap-4 hover:bg-white p-4 rounded-2xl transition">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-950 text-white font-semibold">
                                {step.number}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="mt-6 bg-blue-950 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors">
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

const ServiceDetailSection = ({ service }) => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 text-center mt-24" data-aos='fade-up'>
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
                What is {service.title}?
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed mx-auto max-w-3xl">
                {service.whatisService}
            </p>

            <button
                className="bg-navy-700 hover:bg-navy-800 text-white font-medium py-3 px-8 rounded-full transition-colors duration-200"
                style={{ backgroundColor: '#1B365D' }}
                onClick={() => console.log('Booking appointment...')}
            >
                Book your Appointment Now
            </button>
        </section>
    );
};

const Page = () => {
    const params = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    const base_urlimg = process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE;
    const slugify = (text) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const [articles, setBlogs] = useState([]);
    const [ServiceName, setServiceName] = useState([])



    useEffect(() => {
        const fetchService = async () => {
            try {
                // First, fetch all services to find the ID that matches our slug
                const allServicesResponse = await fetch(`${base_url}services`);
                const allServices = await allServicesResponse.json();
                console.log("yes", allServices)

                // Find the service with the matching slug
                const slugifiedTitle = params.id;
                console.log("yes", slugifiedTitle)
                const matchingService = allServices.find(service =>
                    service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') === slugifiedTitle
                );

                if (matchingService) {
                    console.log("yes", matchingService.title)
                    // Fetch the specific service details using the ID
                    setServiceName(matchingService.title)
                    fetchBlogs(slugifiedTitle);
                    const response = await fetch(`${base_url}services/${matchingService._id}`);
                    if (!response.ok) throw new Error('Failed to fetch service details');
                    const serviceData = await response.json();
                    setService(serviceData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error loading service:', error);
                setLoading(false);
            }
        };
        const fetchBlogs = async (sn) => {
            try {
                console.log("service name: ", sn)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs/related?serviceName=${sn}`);
                const data = await response.json();
                setBlogs(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {

                console.log("error fetching blogs", err)
            }
        };
        fetchService();


    }, [params.slug, base_url]);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }

    if (!service) {
        return <div className="text-center py-20">Service not found</div>;
    }

    return (
        <div>
            <Hero
                title={service.title}
                description={service.description}
                image='/kid1.png' // Using the actual service image
            />
            <HowItWorks
                title={service.title}
                steps={service.howitworks}
            />
            <ServiceDetailSection service={service} />

            {articles.length > 0 ? (<> <h1 className="text-4xl font-bold mb-8 text-center mt-16">Related Articles</h1> <BlogGrid articles={articles} /> </>) : ''}
            <ContactSection />
        </div>
    );
};

export default Page;