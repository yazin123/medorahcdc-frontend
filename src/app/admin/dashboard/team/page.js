'use client'
import React, { useState, useEffect } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaTrashAlt, FaEdit, FaUserPlus, FaTimes, FaImage, FaSpinner } from 'react-icons/fa';
import AdminLayout from '../../admin';

const TeamManagement = () => {
  const [team, setTeam] = useState([]);
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    bio: '',
    image: null,
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: ''
    }
  });
  const [editingMember, setEditingMember] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}team`);
      if (!response.ok) {
        throw new Error('Failed to fetch team members');
      }
      const data = await response.json();
      setTeam(data);
    } catch (error) {
      setError('Error fetching team members: ' + error.message);
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        e.target.value = '';
        return;
      }

      if (isEditing) {
        setEditingMember({ ...editingMember, image: file });
      } else {
        setNewMember({ ...newMember, image: file });
      }
    }
  };

  const handleCreateMember = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', newMember.name);
      formData.append('position', newMember.position);
      formData.append('bio', newMember.bio);
      formData.append('linkedin', newMember.socialLinks.linkedin);
      formData.append('twitter', newMember.socialLinks.twitter);
      formData.append('facebook', newMember.socialLinks.facebook);

      if (newMember.image) {
        formData.append('image', newMember.image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}team`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (response.status === 201) {
        setNewMember({
          name: '',
          position: '',
          bio: '',
          image: null,
          socialLinks: {
            linkedin: '',
            twitter: '',
            facebook: ''
          }
        });
        setError('');
        fetchTeamMembers();
      } else {
        const errorData = await response.json();
        setError(`Error creating team member: ${errorData.error}`);
      }
    } catch (error) {
      setError(`Error creating team member: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', editingMember.name);
      formData.append('position', editingMember.position);
      formData.append('bio', editingMember.bio);
      formData.append('linkedin', editingMember.socialLinks.linkedin);
      formData.append('twitter', editingMember.socialLinks.twitter);
      formData.append('facebook', editingMember.socialLinks.facebook);

      if (editingMember.image instanceof File) {
        formData.append('image', editingMember.image);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}team/${editingMember._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update team member');
      }

      setEditingMember(null);
      fetchTeamMembers();
    } catch (error) {
      setError('Error updating team member: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team member?')) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete team member');
      }

      fetchTeamMembers();
    } catch (error) {
      setError('Error deleting team member: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
        <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 ml-64">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
                    {loading && (
                        <FaSpinner className="animate-spin text-blue-500 text-xl" />
                    )}
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 relative">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FaTimes className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                        <button
                            className="absolute top-0 right-0 p-4"
                            onClick={() => setError('')}
                        >
                            <FaTimes className="h-5 w-5 text-red-400" />
                        </button>
                    </div>
                )}

                <form onSubmit={handleCreateMember} className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-center mb-6">
                        <FaUserPlus className="text-blue-500 text-xl mr-2" />
                        <h2 className="text-xl font-semibold text-gray-900">Add New Team Member</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={newMember.name}
                                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Position"
                                value={newMember.position}
                                onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                required
                            />
                        </div>

                        <div className="space-y-4">
                            <textarea
                                placeholder="Bio"
                                value={newMember.bio}
                                onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>

                        <div className="col-span-full">
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-md border border-blue-500 cursor-pointer hover:bg-blue-50 transition-colors">
                                    <FaImage className="mr-2" />
                                    <span>Upload Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, false)}
                                        className="hidden"
                                    />
                                </label>
                                {newMember.image && (
                                    <span className="text-sm text-gray-600">
                                        {newMember.image.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="LinkedIn URL"
                                value={newMember.socialLinks.linkedin}
                                onChange={(e) => setNewMember({
                                    ...newMember,
                                    socialLinks: { ...newMember.socialLinks, linkedin: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                value={newMember.socialLinks.twitter}
                                onChange={(e) => setNewMember({
                                    ...newMember,
                                    socialLinks: { ...newMember.socialLinks, twitter: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                value={newMember.socialLinks.facebook}
                                onChange={(e) => setNewMember({
                                    ...newMember,
                                    socialLinks: { ...newMember.socialLinks, facebook: e.target.value }
                                })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            disabled={loading}
                        >
                            {loading ? (
                                <FaSpinner className="animate-spin mx-auto h-5 w-5" />
                            ) : (
                                'Add Team Member'
                            )}
                        </button>
                    </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {team.map((member) => (
                        <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
                            {member.image && (
                                <div className="relative h-48">
                                    <img
                                        src={`${member.image}`}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                        crossOrigin="anonymous"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-500 font-medium mb-4">{member.position}</p>
                                <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
                                
                                <div className="flex items-center space-x-4">
                                    {member.socialLinks.linkedin && (
                                        <a
                                            href={member.socialLinks.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-500 transition-colors"
                                        >
                                            <FaLinkedin className="text-xl" />
                                        </a>
                                    )}
                                    {member.socialLinks.twitter && (
                                        <a
                                            href={member.socialLinks.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-400 transition-colors"
                                        >
                                            <FaTwitter className="text-xl" />
                                        </a>
                                    )}
                                    {member.socialLinks.facebook && (
                                        <a
                                            href={member.socialLinks.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 hover:text-blue-800 transition-colors"
                                        >
                                            <FaFacebook className="text-xl" />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end px-6 py-4 border-t border-gray-100">
                                <button
                                    onClick={() => setEditingMember(member)}
                                    className="p-2 text-yellow-500 hover:text-yellow-600 transition-colors mr-2"
                                    title="Edit member"
                                >
                                    <FaEdit className="text-xl" />
                                </button>
                                <button
                                    onClick={() => handleDeleteMember(member._id)}
                                    className="p-2 text-red-500 hover:text-red-600 transition-colors"
                                    title="Delete member"
                                >
                                    <FaTrashAlt className="text-xl" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Edit Modal */}
                {editingMember && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <form onSubmit={handleUpdateMember} className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold text-gray-900">Edit Team Member</h2>
                                    <button
                                        type="button"
                                        onClick={() => setEditingMember(null)}
                                        className="text-gray-400 hover:text-gray-500 transition-colors"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                        <input
                                            type="text"
                                            value={editingMember.name}
                                            onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                                        <input
                                            type="text"
                                            value={editingMember.position}
                                            onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                        <textarea
                                            value={editingMember.bio}
                                            onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
                                        <div className="flex items-center space-x-4">
                                            <label className="flex items-center px-4 py-2 bg-white text-blue-500 rounded-md border border-blue-500 cursor-pointer hover:bg-blue-50 transition-colors">
                                                <FaImage className="mr-2" />
                                                <span>Change Image</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageChange(e, true)}
                                                    className="hidden"
                                                />
                                            </label>
                                            {editingMember.image instanceof File && (
                                                <span className="text-sm text-gray-600">
                                                    {editingMember.image.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                                        <input
                                            type="text"
                                            value={editingMember.socialLinks.linkedin}
                                            onChange={(e) => setEditingMember({
                                                ...editingMember,
                                                socialLinks: { ...editingMember.socialLinks, linkedin: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
                                        <input
                                            type="text"
                                            value={editingMember.socialLinks.twitter}
                                            onChange={(e) => setEditingMember({
                                                ...editingMember,
                                                socialLinks: { ...editingMember.socialLinks, twitter: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                        <input
                                            type="text"
                                            value={editingMember.socialLinks.facebook}
                                            onChange={(e) => setEditingMember({
                                                ...editingMember,
                                                socialLinks: { ...editingMember.socialLinks, facebook: e.target.value }
                                            })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingMember(null)}
                                        className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <FaSpinner className="animate-spin mx-auto h-5 w-5" />
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </AdminLayout>
    );
};

export default TeamManagement;