import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Trash2, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/AlertDescription.jsx';
import MyNavbar from '../pages/MyNavbar.jsx';

const EditProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  
  const [project, setProject] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    participants: "",
    description: "",
    image: "",
    status: ""
  });

  // Fetch all projects for the dropdown
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError("Failed to load projects list");
    } finally {
      setLoading(false);
    }
  };

  // Fetch selected project details
  const fetchProjectDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${id}`);
      if (!response.ok) throw new Error('Failed to fetch project details');
      
      const data = await response.json();
      setProject(data);
      setError("");
    } catch (err) {
      setError("Failed to load project details");
      setProject({
        title: "",
        category: "",
        date: "",
        location: "",
        participants: "",
        description: "",
        image: "",
        status: ""
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle project selection
  const handleProjectSelect = (e) => {
    const id = e.target.value;
    setSelectedProjectId(id);
    if (id) {
      fetchProjectDetails(id);
    } else {
      setProject({
        title: "",
        category: "",
        date: "",
        location: "",
        participants: "",
        description: "",
        image: "",
        status: ""
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProjectId) {
      setError("Please select a project to edit");
      return;
    }

    try {
      const response = await fetch(`/api/projects/${selectedProjectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      });

      if (!response.ok) throw new Error('Failed to update project');
      
      setSuccess("Project updated successfully!");
      setTimeout(() => navigate('/projects'), 2000);
    } catch (err) {
      setError("Failed to update project. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!selectedProjectId) {
      setError("Please select a project to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${selectedProjectId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete project');
      
      setSuccess("Project deleted successfully!");
      setSelectedProjectId("");
      setProject({
        title: "",
        category: "",
        date: "",
        location: "",
        participants: "",
        description: "",
        image: "",
        status: ""
      });
      setTimeout(() => navigate('/projects'), 2000);
    } catch (err) {
      setError("Failed to delete project. Please try again.");
    }
  };

  if (loading && !projects.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MyNavbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </button>

          {/* Project Selection */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Project to Edit</h2>
            <select
              value={selectedProjectId}
              onChange={handleProjectSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Alerts */}
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          {/* Edit Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
              {selectedProjectId && (
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Delete project"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* ... Rest of the form fields remain the same ... */}
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={!selectedProjectId}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={project.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={!selectedProjectId}
                >
                  <option value="">Select Category</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Education">Education</option>
                  <option value="Environment">Environment</option>
                </select>
              </div>

              {/* ... Other form fields ... */}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/projects')}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  disabled={!selectedProjectId}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProject;