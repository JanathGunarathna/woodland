import React, { useState } from 'react';
import { useUser } from '../components/utils/UserContext';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const [isMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Dynamic navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/project', label: 'Project' },
      { href: '/event', label: 'Event' },
      { href: '/contact', label: 'Contact' },
    ];

    if (!user) return commonLinks;

    const roleSpecificLinks = {
      admin: [
        { href: '/admin/dashboard', label: 'Admin Dashboard' },
        { href: '/admin/users', label: 'Manage Users' },
      ],
      teacher: [
        { href: '/teacher/dashboard', label: 'Teacher Dashboard' },
        { href: '/teacher/students', label: 'My Students' },
      ],
      leader: [
        { href: '/leader/dashboard', label: 'Leader Dashboard' },
        { href: '/leader/crew', label: 'My Crew' },
      ],
    };

    return [
      ...commonLinks,
      ...(roleSpecificLinks[user.role] || []),
      { href: '/user-profile', label: 'Profile' },
      { href: '#', label: 'Logout', onClick: handleLogout },
    ];
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="ml-2 text-lg font-semibold text-gray-800">
              Woodland Rovers {user && `(${user.role.charAt(0).toUpperCase() + user.role.slice(1)})`}
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {getNavLinks().map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={link.onClick}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu remains the same */}
        </div>

        {/* Mobile menu content updated with getNavLinks() */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {getNavLinks().map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={link.onClick}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MyNavbar;