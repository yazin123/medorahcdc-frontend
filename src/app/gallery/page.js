'use client'
import React, { useState } from 'react';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      title: "Play Therapy Room",
      description: "A safe and welcoming space for children",
      category: "Indoor"
    },
    {
      title: "Art Corner",
      description: "Where creativity meets healing",
      category: "Indoor"
    },
    {
      title: "Sensory Garden",
      description: "Natural healing environment",
      category: "Outdoor"
    },
    {
      title: "Reading Nook",
      description: "Quiet space for storytelling",
      category: "Indoor"
    },
    {
      title: "Group Activity Area",
      description: "Building connections together",
      category: "Indoor"
    },
    {
      title: "Therapy Garden",
      description: "Peaceful outdoor healing space",
      category: "Outdoor"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 mt-16">
      {/* Header with gradient */}
      <div className="rounded-lg bg-gradient-to-r from-yellow-200 to-teal-400 p-8 mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Therapy Spaces</h1>
        <p className="mt-2 text-gray-700 text-lg">Explore our nurturing environments designed for healing and growth</p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div 
            key={index}
            className="group cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={`/blog.png`}
                alt={image.title}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm px-3 py-1 border border-white rounded-full">
                    View Details
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{image.title}</h3>
              <p className="text-sm text-gray-600">{image.description}</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                {image.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={`/blog.png`}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800">{selectedImage.title}</h2>
              <p className="mt-2 text-gray-600">{selectedImage.description}</p>
              <span className="inline-block mt-3 text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded">
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;