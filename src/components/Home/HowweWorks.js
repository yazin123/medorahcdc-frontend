import Image from 'next/image';
import React from 'react';
import { FaCheckCircle, FaComment, FaUserPlus } from 'react-icons/fa';


const Howweworks = () => {
    const steps = [
        {
            number: 1,
            title: "Complete In-Depth Assessment",
            description: "Complete a few brief questions to help us assess key developmental areas, including communication, social skills, and cognitive abilities.",
            icon: FaCheckCircle
        },
        {
            number: 2,
            title: "Get Matched",
            description: "We'll pair you with the right experts to address your child's needs.",
            icon: FaUserPlus
        },
        {
            number: 3,
            title: "Begin Sessions",
            description: "Begin your journey with consistent sessions and ongoing progress monitoring.",
            icon: FaComment
        }
    ];

    return (
        <div className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex flex-wrap md:flex-nowrap gap-3 mb-16">
            <div className='bg-gradient-to-b  from-[#FCD767]/50 to-[#01B0AB]/50 p-6 md:w-1/2  rounded-3xl'>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">How It Works</h2>
                </div>

                <div className="space-y-6">
                    {steps.map((step) => (
                        <div key={step.number} className="flex items-start gap-4 hover:bg-white p-4 rounded-2xl transition ">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-950 text-white font-semibold">
                                {step.number}
                            </div>
                            <div className="flex-grow">
                                <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                                <p className="text-gray-600 text-sm">{step.description}</p>
                            </div>

                        </div>
                    ))}
                </div>

                <button className="mt-6 bg-blue-950 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-800 transition-colors">
                    Get Started
                </button>
            </div>
            <div className='md:w-1/2'>
                <div>
                    <h2 className='text-3xl font-semibold mt-10 mb-2'>Building Brighter Futures: The Power of Child Development Centers</h2>
                    <p className='text-sm'>Child Development
                        Centers are essential for giving every child the support they need to grow and thrive. They
                        provide specialized care to address developmental challenges, ensuring a strong foundation for
                        success in life. Through early intervention, we unlock potential and create brighter futures for all.</p>
                </div>
                <div className='mt-10 bg-[#D1E6E1] rounded-3xl flex md:justify-between justify-center pt-6 pr-6'>
                    <Image src='/Vector.png' width={500} height={500} className='h-72 w-auto hidden md:block' alt='vector' />
                    <Image src='/kid2.png' width={500} height={500} className='h-72 w-auto' alt='Medorah CDC' />
                </div>
            </div>
        </div>
    );
};

export default Howweworks;