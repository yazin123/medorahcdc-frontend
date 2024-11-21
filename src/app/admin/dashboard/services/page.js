'use client'
import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import Image from 'next/image';
import ServiceManagement from './ServiceManagement';
import AdminLayout from '../../admin';

const ServiceAdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const initialServiceState = {
    title: '',
    description: '',
    howitworks: '',
    whatisService: '',
    whatToExpect: '',
    signs: '',
    handledBy: [],
    image: null,
    imageUrl: '',
  };
  const [newService, setNewService] = useState(initialServiceState);

  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetchServices();
    fetchTeams();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${base_url}services`);
      if (!response.ok) throw new Error('Failed to fetch services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      setError('Error loading services. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await fetch(`${base_url}team`);
      if (!response.ok) throw new Error('Failed to fetch teams');
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      setError('Error loading teams. Please try again later.');
    }
  };

  const validateService = (service) => {
    if (!service.title?.trim()) return 'Title is required';
    if (!service.description?.trim()) return 'Description is required';
    if (!service.howitworks?.trim()) return 'How it works is required';
    if (!service.whatisService?.trim()) return 'What is service is required';
    if (!service.whatToExpect?.trim()) return 'What to Expect is required';
    if (!service.signs?.trim()) return 'Signs of Service is required';
    if (!service.handledBy?.length) return 'At least one team must be selected';
    return null;
  };
  const handleImageChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      // Check image size
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        e.target.value = '';
        return;
      }
  
      // Check image file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload only image files');
        e.target.value = '';
        return;
      }
  
      // Update state based on whether it's a new service or editing an existing one
      if (isEditing) {
        setEditingService({ ...editingService, image: file });
      } else {
        setNewService({ ...newService, image: file });
      }
    }
  };
  const handleCreateService = async () => {
    const validationError = validateService(newService);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', newService.title);
      formData.append('description', newService.description);
      formData.append('howitworks', newService.howitworks);
      formData.append('whatisService', newService.whatisService);
      formData.append('whatToExpect', newService.whatToExpect);
      formData.append('signs', newService.signs);
      newService.handledBy.forEach(teamId => {
        formData.append('handledBy', teamId);
      });

      if (newService.image) {
        formData.append('image', newService.image);
      }

      const response = await fetch(`${base_url}services/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create service');

      const data = await response.json();
      setServices([...services, data]);
      setNewService(initialServiceState);
      setSelectedTeams([]);
      setImagePreview(null);
      setError('');
    } catch (error) {
      setError('Error creating service. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleTeamSelection = (teamId) => {
    const updatedTeams = selectedTeams.includes(teamId)
      ? selectedTeams.filter(id => id !== teamId)
      : [...selectedTeams, teamId];

    setSelectedTeams(updatedTeams);
    setNewService({ ...newService, handledBy: updatedTeams });
  };

  return (
    <AdminLayout>
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto ml-64">

      <h1 className="text-3xl font-bold">Service Admin Dashboard</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <FaExclamationCircle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Create New Service</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.title}
            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <textarea
            placeholder="How it Works"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.howitworks}
            onChange={(e) => setNewService({ ...newService, howitworks: e.target.value })}
          />
          <textarea
            placeholder="What is the Service"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.whatisService}
            onChange={(e) => setNewService({ ...newService, whatisService: e.target.value })}
          />
                    <textarea
            placeholder="What to Expect from.."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.whatToExpect}
            onChange={(e) => setNewService({ ...newService, whatToExpect: e.target.value })}
          />
                    <textarea
            placeholder="Signs of service.."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newService.signs}
            onChange={(e) => setNewService({ ...newService, signs: e.target.value })}
          />
          <div className="flex flex-wrap gap-2">
            {teams.map((team) => (
              <button
                key={team._id}
                className={`px-4 py-2 rounded-lg transition-colors ${selectedTeams.includes(team._id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                onClick={() => handleTeamSelection(team._id)}
              >
                {team.name}
              </button>
            ))}
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
              className="w-full"
            />
            {imagePreview && (
              <div className="mt-2 relative w-full h-48">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <button
            onClick={handleCreateService}
            disabled={loading}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
          >
            <FaPlus className="mr-2" />
            Create Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceManagement
            key={service._id}
            service={service}
            teams={teams}
            onUpdate={(updatedService) => {
              setServices(services.map(s =>
                s._id === updatedService._id ? updatedService : s
              ));
            }}
            onDelete={(serviceId) => {
              setServices(services.filter(s => s._id !== serviceId));
            }}
          />
        ))}
      </div>

    </div>
    </AdminLayout>
  );
};

export default ServiceAdminDashboard;