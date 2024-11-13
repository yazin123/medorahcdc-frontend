'use client';
import { useState, useEffect } from 'react';

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(null);
    const [formData, setFormData] = useState({ media: '', value: '' });
    
    const mediaTypes = [
        'youtube', 'instagram', 'linkedin', 'whatsapp', 
        'facebook', 'phone-primary', 'phone-secondary', 
        'address', 'email'
    ];
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await fetch(`${baseUrl}contacts`);
            if (!response.ok) throw new Error('Failed to fetch contacts');
            const data = await response.json();
            setContacts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = isEditing 
                ? `${baseUrl}contacts/${isEditing}` 
                : `${baseUrl}contacts`;
            
            const method = isEditing ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` },
                body: JSON.stringify(formData)
            });

    
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            await fetchContacts();
            setFormData({ media: '', value: '' });
            setIsEditing(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (contact) => {
        setIsEditing(contact._id);
        setFormData({ media: contact.media, value: contact.value });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact?')) return;
        
        try {
            const response = await fetch(`${baseUrl}contacts/${id}`, {
                method: 'DELETE',
                headers:
                {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to delete contact');
            await fetchContacts();
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">
            <h1 className="text-3xl font-bold mb-8">Contact Details Admin</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Media Type
                    </label>
                    <select
                        value={formData.media}
                        onChange={(e) => setFormData({ ...formData, media: e.target.value })}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select media type</option>
                        {mediaTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Value
                    </label>
                    <input
                        type="text"
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {isEditing ? 'Update Contact' : 'Add Contact'}
                </button>

                {isEditing && (
                    <button
                        type="button"
                        onClick={() => {
                            setIsEditing(null);
                            setFormData({ media: '', value: '' });
                        }}
                        className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Media Type
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Value
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Created At
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr key={contact._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b border-gray-200">
                                    {contact.media}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    {contact.value}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleEdit(contact)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}