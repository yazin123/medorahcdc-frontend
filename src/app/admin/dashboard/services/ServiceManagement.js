import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const ServiceManagement = ({ service, onUpdate, onDelete, teams }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState(service);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    setEditedService(service);
  }, [service]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditedService({
          ...editedService,
          image: file
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("updatinggg")
      setLoading(true);
      setError('');

      const formData = new FormData();
      formData.append('title', editedService.title);
      formData.append('description', editedService.description);
      formData.append('howitworks', editedService.howitworks);
      formData.append('whatisService', editedService.whatisService);
      formData.append('handledBy', JSON.stringify(editedService.handledBy));

      if (editedService.image) {
        formData.append('image', editedService.image);
      }

      const response = await fetch(`${base_url}services/${service._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update service');
      }

      const updatedService = await response.json();
      onUpdate(updatedService);
      setIsEditing(false);
      setImagePreview(null);
    } catch (err) {
      setError(err.message || 'Failed to update service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${base_url}services/${service._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        }
      });

      if (!response.ok) throw new Error('Failed to delete service');
      onDelete(service._id);
    } catch (err) {
      setError('Failed to delete service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {!isEditing ? (
        <div>
          {service.imageUrl && (
            <div className="relative w-full h-48">
              <Image
                src={`${service.imageUrl}`}
                alt={service.title}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}
          <div className="p-6">
            <h3 className="text-lg font-bold mb-2">{service.title} </h3>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>How it Works:</strong> {service.howitworks}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>What is the Service:</strong> {service.whatisService}
            </p>
            <p className="text-gray-600">
              <strong>Handled By:</strong>{' '}
              {service.handledBy
                .map((teamId) => teams.find((t) => t._id === teamId)?.name)
                .filter(Boolean)
                .join(', ')}
            </p>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                disabled={loading}
              >
                <FaEdit />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                disabled={loading}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="space-y-4">
            <input
              type="text"
              value={editedService.title}
              onChange={(e) => setEditedService({ ...editedService, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Title"
            />
            <textarea
              value={editedService.description}
              onChange={(e) => setEditedService({ ...editedService, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Description"
            />
            <textarea
              value={editedService.howitworks}
              onChange={(e) => setEditedService({ ...editedService, howitworks: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="How it Works"
            />
            <textarea
              value={editedService.whatisService}
              onChange={(e) => setEditedService({ ...editedService, whatisService: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What is the Service"
            />
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <button
                  key={team._id}
                  onClick={() => {
                    const updatedTeams = editedService.handledBy.includes(team._id)
                      ? editedService.handledBy.filter(id => id !== team._id)
                      : [...editedService.handledBy, team._id];
                    setEditedService({ ...editedService, handledBy: updatedTeams });
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    editedService.handledBy.includes(team._id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {team.name}
                </button>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full"
              />
              {(imagePreview || editedService.imageUrl) && (
                <div className="mt-2 relative w-full h-48">
                  <Image
                    src={imagePreview || `${base_url}${editedService.imageUrl}`}
                    alt="Preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center"
              >
                <FaSave className="mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setEditedService(service);
                  setImagePreview(null);
                  setIsEditing(false);
                }}
                className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
              >
                <FaTimes className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;