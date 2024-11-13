
'use client'
import React from 'react';


const Features = () => {

    return (
        <div className="w-full px-4 py-8" id='about'>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* card */}
                    <div className={`p-8 rounded-3xl  bg-[#E6C865]/50`} data-aos="fade-up">
                        <h2 className="text-xl font-semibold mb-4">Early Intervention</h2>
                        <p className={` mb-4 text-sm`}>Provide a secure and nurturing environment tailored to early childhood needs.</p>

                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-white rounded-full text-xs">Communication</span>
                                <span className="px-3 py-1 bg-white rounded-full text-xs">Language Development</span>
                                <span className="px-3 py-1 bg-white rounded-full text-xs">Socialization</span>
                            </div>
                        </div>

                        <button className="mt-4 px-4 py-2 bg-white rounded-full text-sm hover:bg-gray-50 transition-colors">
                            Read More
                        </button>
                    </div>
                    {/* card */}
                    <div data-aos="fade-up" data-aos-delay="100">
                        <p className='mb-2'>Developing Skills, Building Lives. Fostering growth through personalized care and guidance.</p>
                        <div className={`p-8 rounded-3xl  bg-[#7AC38B]/50`}>
                            <h2 className="text-xl font-semibold mb-4">Growth-Focused Approach</h2>
                            <p className={` mb-4 text-sm`}> Implement evidence-based strategies to inspire active learning and growth</p>
                            <button className="mt-4 px-4 py-2 bg-white rounded-full text-sm hover:bg-gray-50 transition-colors">
                                Read More
                            </button>
                        </div>
                    </div>
                    {/* card */}
                    <div className={`p-8 rounded-3xl  bg-[#0BB2A9]/50`} data-aos="fade-up" data-aos-delay="200">
                        <h2 className="text-xl font-semibold mb-4">Family Collaboration</h2>
                        <p className={` mb-4 text-sm`}> Foster collaborative partnerships with families to support individualized development</p>
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 border bg-white rounded-full text-xs">Positive Learning Environment</span>
                                <span className="px-3 py-1 border bg-white rounded-full text-xs">Parent-Child Interaction</span>
                                <span className="px-3 py-1 border bg-white rounded-full text-xs">Family-Professional Interaction</span>
                            </div>
                        </div>

                        <button className="mt-4 px-4 py-2 bg-white rounded-full text-sm hover:bg-gray-50 transition-colors">
                            Read More
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Features