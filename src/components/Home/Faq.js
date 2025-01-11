'use client'
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    const contentRef = useRef(null);

    return (
        <div className="border rounded-lg mb-2 bg-white transition-all duration-300 ease-in-out hover:shadow-md">
            <button
                className="w-full p-4 text-left flex justify-between items-center transition-colors duration-300"
                onClick={onClick}
            >
                <span className="font-medium text-gray-700">{title}</span>
                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <IoIosArrowDown className="text-gray-600" />
                </div>
            </button>
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0',
                }}
            >
                <div className="p-4 pt-0 text-gray-600">
                    {content}
                </div>
            </div>
        </div>
    );
};

const Faq = () => {
    const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [openItem, setOpenItem] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [faqItems, setFaqItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(4);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await fetch(`${baseurl}faq`);
            const data = await response.json();
            setFaqItems(data);
            setHasMore(data.length > 4);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleSeeMore = () => {
        const newVisibleItems = visibleItems + 4;
        setVisibleItems(newVisibleItems);
        setHasMore(newVisibleItems < faqItems.length);
    };

    const visibleFaqs = faqItems.slice(0, visibleItems);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6 transform transition-all duration-500 hover:scale-[1.02]">
                    <h2 className="text-4xl font-medium text-gray-700 mb-4">
                        <span className="inline-block transform transition-all duration-500 hover:-translate-y-1">
                            Transforming Barriers
                        </span>{' '}
                        into Bridges: {' '}
                        <span className="text-indigo-700 inline-block transform transition-all duration-500 hover:-translate-y-1">
                            Inspiring Confidence,
                        </span>{' '}
                        Building {' '}
                        <span className="text-gray-500 inline-block transform transition-all duration-500 hover:-translate-y-1">
                            Independence.
                        </span>
                    </h2>

                    <Image
                        src="/office.jpg"
                        alt="office"
                        width={500}
                        height={500}
                        className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02]"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    />
                    
                    
                </div>

                <div className="bg-gradient-to-b from-[#FCD767]/50 to-[#01B0AB]/50 rounded-xl p-6 transform transition-all duration-500 hover:shadow-lg">
                    {visibleFaqs.map((item, index) => (
                        <AccordionItem
                            key={index}
                            title={item.question}
                            content={item.answer}
                            isOpen={openItem === index}
                            onClick={() => setOpenItem(openItem === index ? -1 : index)}
                        />
                    ))}
                    
                    {hasMore && (
                        <button
                            onClick={handleSeeMore}
                            className="w-full mt-4 bg-blue-800 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:bg-navy-900 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                        >
                            See More
                            <IoIosArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Faq;