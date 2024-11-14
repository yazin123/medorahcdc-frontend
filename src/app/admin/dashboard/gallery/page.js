'use client'
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../admin';

const GalleryAdmin = () => {
    const [gallery, setGallery] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}gallery`);
            const data = await response.json();
            setGallery(data);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        try {
            if (selectedItem) {
                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}gallery/${selectedItem._id}`, {
                    method: 'PATCH',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                });
            } else {
                await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}gallery`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                    },
                });
            }
            setShowCreateModal(false);
            setSelectedItem(null);
            fetchGalleryItems();
        } catch (error) {
            console.error('Error submitting gallery item:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}gallery/${selectedItem._id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
            });
            setShowDeleteModal(false);
            setSelectedItem(null);
            fetchGalleryItems();
        } catch (error) {
            console.error('Error deleting gallery item:', error);
        }
    };

    return (
        <AdminLayout>
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">

            <div className="mb-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gallery Admin</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={() => setShowCreateModal(true)}
                >
                    <FaPlus className="mr-2" />
                    Create New
                </button>
            </div>

            <div className="bg-white shadow-md rounded-md overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-2 border text-left">Image</th>
                            <th className="p-2 border text-left">Title</th>
                            <th className="p-2 border text-left">Description</th>
                            <th className="p-2 border text-left">Category</th>
                            <th className="p-2 border text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gallery.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-100">
                                <td className="p-2 border">
                                    <img
                                        src={`${item.image}`}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded"
                                        crossOrigin='anonymous'
                                    />
                                </td>
                                <td className="p-2 border">{item.title}</td>
                                <td className="p-2 border">{item.description}</td>
                                <td className="p-2 border">{item.category}</td>
                                <td className="p-2 border text-center">
                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2 inline-flex items-center"
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowCreateModal(true);
                                        }}
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                                        onClick={() => {
                                            setSelectedItem(item);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        <FaTrash className="mr-2" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create/Update Modal */}
            {showCreateModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 w-full max-w-md">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                                {selectedItem ? 'Update Gallery Item' : 'Create New Gallery Item'}
                                            </h3>
                                            <div className="mt-2">
                                                <div className="space-y-4">
                                                    <div>
                                                        <label htmlFor="title" className="block font-medium text-gray-700">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                            defaultValue={selectedItem?.title}
                                                            required
                                                            className="border border-gray-300 rounded-md p-2 w-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="description" className="block font-medium text-gray-700">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id="description"
                                                            name="description"
                                                            defaultValue={selectedItem?.description}
                                                            className="border border-gray-300 rounded-md p-2 w-full"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="image" className="block font-medium text-gray-700">
                                                            Image
                                                        </label>
                                                        {selectedItem && (
                                                            <img
                                                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}/${selectedItem.image}`}
                                                                alt="Current"
                                                                className="w-32 h-32 object-cover mb-2 rounded"
                                                            />
                                                        )}
                                                        <input
                                                            type="file"
                                                            id="image"
                                                            name="image"
                                                            className="border border-gray-300 rounded-md p-2 w-full"
                                                            required={!selectedItem}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="category" className="block font-medium text-gray-700">
                                                            Category
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="category"
                                                            name="category"
                                                            defaultValue={selectedItem?.category}
                                                            className="border border-gray-300 rounded-md p-2 w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        {selectedItem ? 'Update' : 'Create'}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            setShowCreateModal(false);
                                            setSelectedItem(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 w-full max-w-md">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Gallery Item</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete the gallery item "{selectedItem?.title}"?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        setShowDeleteModal(false);
                                        setSelectedItem(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </AdminLayout>
    );
};

export default GalleryAdmin;