import React from 'react';
import MyNavbar from '../pages/MyNavbar.jsx';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';

const Project = () => {
  const projects = [
    {
      title: "Community Service Camp",
      category: "Community Service",
      date: "March 15-17, 2024",
      location: "Kurunegala District",
      participants: 45,
      description: "A three-day service camp focused on environmental cleanup and community education initiatives in rural areas.",
      image: "/images/project1.jpg",
      status: "Completed"
    },
    {
      title: "Youth Leadership Workshop",
      category: "Education",
      date: "April 5-6, 2024",
      location: "Woodland Scout Center",
      participants: 30,
      description: "Interactive workshop series designed to develop leadership skills among young scouts and rovers.",
      image: "/images/project2.jpg",
      status: "Upcoming"
    },
    {
      title: "Environmental Conservation",
      category: "Environment",
      date: "May 1, 2024",
      location: "Ethagala Forest Reserve",
      participants: 25,
      description: "Tree planting and wildlife habitat preservation project in collaboration with local environmental groups.",
      image: "/images/project3.jpg",
      status: "Planning"
    },
    {
      title: "Digital Skills Training",
      category: "Education",
      date: "June 10-12, 2024",
      location: "Tech Hub Kurunegala",
      participants: 35,
      description: "Teaching essential digital skills to underprivileged youth in partnership with local tech companies.",
      image: "/images/project4.jpg",
      status: "Upcoming"
    }
  ];

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
      
      {/* Header Section */}
      <div className="pt-16 pb-8 bg-white">
        <div className="container mx-auto px-4 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Projects</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Discover our ongoing and upcoming projects that make a difference in the Kurunegala community.
          </p>
        </div>
      </div>

      {/* Project Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            All Projects
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Community Service
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Education
          </button>
          <button className="px-6 py-2 bg-white text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
            Environment
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Project Image */}
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

              {/* Project Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-sm font-medium text-blue-600">{project.category}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-1">{project.title}</h3>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                {/* Project Details */}
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

                {/* Action Button */}
                <button className="w-full mt-4 bg-gray-50 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Load More Projects
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 Woodland District Rover Crew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Project;