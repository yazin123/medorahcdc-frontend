'use client'
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaStar, FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const API_BASE_URL = `${base_url}testimonials`;

const TestimonialsPage = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        image: ''
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            if (files && files[0]) {
                setImageFile(files[0]);
                setImagePreview(URL.createObjectURL(files[0]));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            position: '',
            company: '',
            content: '',
            rating: 5,
            image: ''
        });
        setCurrentTestimonial(null);
    };

    const openModal = (testimonial = null) => {
        if (testimonial) {
            setFormData({
                name: testimonial.name,
                position: testimonial.position,
                company: testimonial.company,
                content: testimonial.content,
                rating: testimonial.rating,
                image: testimonial.image || ''
            });
            setCurrentTestimonial(testimonial);
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            };

            if (currentTestimonial) {
                const response = await fetch(`${API_BASE_URL}/${currentTestimonial._id}`, {
                    method: 'PATCH',
                    headers,
                    body: formDataToSend
                });

                if (!response.ok) throw new Error('Failed to update testimonial');
            } else {
                const response = await fetch(API_BASE_URL, {
                    method: 'POST',
                    headers,
                    body: formDataToSend
                });

                if (!response.ok) throw new Error('Failed to create testimonial');
            }

            await fetchTestimonials();
            closeModal();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Error saving testimonial. Please try again.');
        }
    };


    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    }
                });

                if (!response.ok) throw new Error('Failed to delete testimonial');

                await fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                alert('Error deleting testimonial. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Testimonials Management</h1>
                    <button
                        onClick={() => openModal()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                    >
                        <FaPlus /> Add New
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials?.map((testimonial) => (
                        <div
                            key={testimonial._id}
                            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    {testimonial.image ? (
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${testimonial.image}`}
                                            alt={testimonial.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                            crossOrigin='anonymous'
                                        />
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-xl font-bold text-gray-600">
                                                {testimonial.name.charAt(0)}

                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-semibold text-lg">{testimonial.name} </h3>

                                        <p className="text-gray-600 text-sm">
                                            {testimonial.position} {testimonial.company ? `at ${testimonial.company}` : ''}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal(testimonial)}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FaEdit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(testimonial._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.content}</p>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        className={index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">
                                    {currentTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </h2>
                                <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                                    <IoMdClose size={24} />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Position</label>
                                    <input
                                        type="text"
                                        name="position"
                                        value={formData.position}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Content *</label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Rating</label>
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    >
                                        {[5, 4, 3, 2, 1].map((num) => (
                                            <option key={num} value={num}>
                                                {num} Star{num !== 1 ? 's' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleInputChange}
                                        accept="image/*"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end gap-4 mt-6">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        {currentTestimonial ? 'Update' : 'Create'} Testimonial
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialsPage;