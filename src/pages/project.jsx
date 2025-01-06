import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyNavbar from '../pages/MyNavbar.jsx';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

const Project = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/projects/all');
        if (response.data.success) {
          setProjects(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MyNavbar />
      
      <div className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our ongoing and upcoming projects that make a difference in the Kurunegala community.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600">{project.category}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-1">{project.title}</h3>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{project.participants} Participants</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-2"
            onClick={() => (window.location.href = "/addProject")}>
            Create Project
          </button>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors mx-2"
            onClick={() => (window.location.href = "/editProject")}>
            Edit Projects
          </button>
        </div>
      </div>

      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Woodland District Rover Crew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Project;