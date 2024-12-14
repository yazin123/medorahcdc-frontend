'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaTimes,
  FaSave,
  FaImage,
  FaSpinner,
} from 'react-icons/fa';
import AdminLayout from '../../admin';

// Create a custom Quill wrapper component
const QuillWrapper = dynamic(
  () => {
    return new Promise((resolve) => {
      resolve(function QuillComponent({ value, onChange, className }) {
        const editorRef = useRef();
        const quillRef = useRef();

        useEffect(() => {
          if (typeof (window) !== 'undefined') {
            Promise.all([
              import('quill'),
              import('react-quill/dist/quill.snow.css')
            ]).then(([{ default: Quill }]) => {
              if (!quillRef.current && editorRef.current) {
                quillRef.current = new Quill(editorRef.current, {
                  modules: {
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                      ['link', 'blockquote', 'code-block'],
                      [{ 'color': [] }, { 'background': [] }],
                      ['clean']
                    ]
                  },
                  placeholder: 'Write your content here...',
                  theme: 'snow'
                });

                // Set initial content if any
                if (value) {
                  quillRef.current.root.innerHTML = value;
                }

                // Add text-change handler
                quillRef.current.on('text-change', () => {
                  const content = quillRef.current.root.innerHTML;
                  onChange(content);
                });
              }
            });
          }

          // Cleanup
          return () => {
            if (quillRef.current) {
              // Clean up Quill instance if needed
              quillRef.current = null;
            }
          };
        }, []);

        // Update content when value prop changes
        useEffect(() => {
          if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
          }
        }, [value]);

        return (
          <div className={`${className} quill-wrapper`}>
            <div ref={editorRef} />
          </div>
        );
      });
    });
  },
  {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
  }
);

// Add required styles
const QuillStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .quill-wrapper {
        display: flex;
        flex-direction: column;
      }
      .quill-wrapper .ql-container {
        flex-grow: 1;
        min-height: 200px;
      }
      .ql-editor {
        min-height: 200px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};
const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    images: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Add CSS for Quill
  useEffect(() => {
    if (typeof (window) !== 'undefined') {
      const link = document.createElement('link');
      link.href = 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
    return () => {
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [imagePreviewUrls]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blogs');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuillChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));

    // Generate preview URLs for new uploads
    const newPreviewUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      isNew: true // Flag to identify newly uploaded images
    }));
    setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
  };
  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));

    // Revoke object URL if it's a new image
    if (imagePreviewUrls[index].isNew) {
      URL.revokeObjectURL(imagePreviewUrls[index].url);
    }
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };
  const renderImagePreview = (previewData, index) => {
    const imageUrl = previewData.isNew
      ? previewData.url
      : `${previewData.url}`;

    return (
      <div key={index} className="relative group">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${imageUrl}`}
            alt={`Preview ${index + 1}`}
            width={200}
            height={150}
            className="object-cover"
          />
        </div>
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <FaTimes size={12} />
        </button>
      </div>
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach(image => {
          formDataToSend.append('images', image);
        });
      } else if (key === 'tags') {
        formDataToSend.append('tags', formData.tags.split(',').map(tag => tag.trim()));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const url = selectedBlog
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}blogs/${selectedBlog._id}`
        : `${process.env.NEXT_PUBLIC_API_BASE_URL}blogs`;

      const method = selectedBlog ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: formDataToSend
      });

      if (!response.ok) throw new Error('Failed to save blog');

      await fetchBlogs();
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      tags: blog.tags.join(', '),
      images: []
    });
    // Format existing images with isNew flag set to false
    setImagePreviewUrls(
      (blog.image || []).map(img => ({
        url: img,
        isNew: false
      }))
    );
    setIsModalOpen(true);
  };

  useEffect(() => {
    return () => {
      imagePreviewUrls.forEach(preview => {
        if (preview.isNew) {
          URL.revokeObjectURL(preview.url);
        }
      });
    };
  }, [imagePreviewUrls]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
      });

      if (!response.ok) throw new Error('Failed to delete blog');
      await fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: '',
      images: []
    });
    setImagePreviewUrls([]);
    setSelectedBlog(null);
    setIsModalOpen(false);
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );

  if (error) return (
    <div className="text-red-500 text-center p-8 bg-red-50 rounded-lg">
      <p className="font-semibold">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-32 max-w-7xl mx-auto  ml-64">
      <AdminLayout>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition duration-200 shadow-md"
          >
            <FaPlus /> New Blog
          </button>
        </div>

        {/* Blog List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Author</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Images</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map(blog => (
                  <tr key={blog._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{blog.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {blog.image?.slice(0, 3).map((img, index) => (
                          <div key={index} className="h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE_blog}${img}`}
                              alt={`Blog image ${index + 1}`}
                              width={32}
                              height={32}
                              className="object-cover"
                            />
                            {console.log("images -", img)}
                          </div>
                        ))}
                        {blog.image?.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                            +{blog.image.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedBlog ? 'Edit Blog' : 'Create New Blog'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <div className="h-64">
                    <QuillWrapper
                      value={formData.content}
                      onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                      className="h-48 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="technology, news, tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
                      >
                        <FaImage /> Choose Files
                      </button>
                      <span className="text-sm text-gray-500">
                        {formData.images.length} files selected
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Image Previews */}
                    {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imagePreviewUrls.map((previewData, index) => renderImagePreview(previewData, index))}
                    </div> */}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    </div>
  );
};

export default BlogManagement;