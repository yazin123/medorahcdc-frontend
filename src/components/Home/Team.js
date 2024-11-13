import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Team = () => {
  const [teamMembers, setTeam] = useState([]);
  const [featuredMember, setFeaturedMember] = useState(null);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}team`);
      if (!response.ok) throw new Error('Failed to fetch team members');
      const data = await response.json();
      setTeam(data);
      setFeaturedMember(data[0]);
    } catch (error) {
      console.error('Error fetching team members:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
            Our Team
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Meet the people behind our success
          </p>
        </motion.div>

        {/* Featured Member */}
        {featuredMember && (
          <motion.div
            variants={itemVariants}
            className="mb-20 bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="relative h-96 lg:h-auto">
                <Image
                   src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}/${featuredMember.image}`}
                  alt={featuredMember.name}
                  width={500} height={500}
                  className="transform hover:scale-95 transition-transform duration-300 h-auto  object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredMember.name}
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  {featuredMember.position}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {featuredMember.bio}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Centered Team Grid */}
        <motion.div
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-8"
        >
          {teamMembers.slice(1).map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl w-full sm:w-96"
            >
              <div className="relative h-64">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}/${member.image}`}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="transform hover:scale-105 transition-transform duration-300"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{member.position}</p>
                <p className="text-gray-600 text-sm line-clamp-4">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Team;