'use client'
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import AdminLayout from '../../admin';

const FAQManagement = () => {
    const baseurl = process.env.NEXT_PUBLIC_API_BASE_URL
    const [faqs, setFaqs] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
        order: 0
    });

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await fetch(`${baseurl}faq`);
            const data = await response.json();
            setFaqs(data);
        } catch (error) {
            console.error('Error fetching FAQs:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await fetch(`${baseurl}faq/${isEditing}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: JSON.stringify(formData)
                });
            } else {
                await fetch(`${baseurl}faq`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    body: JSON.stringify(formData)
                });
            }
            fetchFAQs();
            resetForm();
        } catch (error) {
            console.error('Error saving FAQ:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this FAQ?')) {
            try {
                await fetch(`${baseurl}faq/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                    method: 'DELETE'
                });
                fetchFAQs();
            } catch (error) {
                console.error('Error deleting FAQ:', error);
            }
        }
    };

    const handleEdit = (faq) => {
        setIsEditing(faq._id);
        setFormData({
            question: faq.question,
            answer: faq.answer,
            order: faq.order
        });
        setIsAdding(true);
    };

    const resetForm = () => {
        setIsEditing(null);
        setIsAdding(false);
        setFormData({ question: '', answer: '', order: 0 });
    };

    const moveItem = async (id, direction) => {
        const currentFaq = faqs.find(faq => faq._id === id);
        const newOrder = currentFaq.order + (direction === 'up' ? -1 : 1);

        try {
            await fetch(`${baseurl}faq/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ order: newOrder })
            });
            fetchFAQs();
        } catch (error) {
            console.error('Error reordering FAQ:', error);
        }
    };

    return (
        <AdminLayout>
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">FAQ Management</h1>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaPlus /> Add New FAQ
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {isEditing ? 'Edit FAQ' : 'Add New FAQ'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Question</label>
                            <input
                                type="text"
                                value={formData.question}
                                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Answer</label>
                            <textarea
                                value={formData.answer}
                                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                className="w-full p-2 border rounded h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Order</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaSave /> Save
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaTimes /> Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq._id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                                <p className="text-gray-600 mt-2">{faq.answer}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                                <button
                                    onClick={() => moveItem(faq._id, 'up')}
                                    className="text-gray-600 hover:text-gray-800 p-2"
                                    disabled={faq.order === 0}
                                >
                                    <FaArrowUp />
                                </button>
                                <button
                                    onClick={() => moveItem(faq._id, 'down')}
                                    className="text-gray-600 hover:text-gray-800 p-2"
                                >
                                    <FaArrowDown />
                                </button>
                                <button
                                    onClick={() => handleEdit(faq)}
                                    className="text-blue-500 hover:text-blue-600 p-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(faq._id)}
                                    className="text-red-500 hover:text-red-600 p-2"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <div className="text-sm text-gray-500">
                            Order: {faq.order}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </AdminLayout>
    );
};

export default FAQManagement;