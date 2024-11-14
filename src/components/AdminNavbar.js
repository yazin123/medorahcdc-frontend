'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  RiDashboardLine,
  RiArticleLine,
  RiMessage2Line,
  RiQuestionLine,
  RiImageLine,
  RiBriefcaseLine,
  RiTeamLine,
  RiChat1Line,
  RiMenuLine,
  RiSearchLine,
  RiLogoutBoxLine,
} from 'react-icons/ri';

const AdminNavbar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');

  const menuItems = [
    { icon: <RiDashboardLine className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: <RiArticleLine className="w-5 h-5" />, label: 'Blog Posts', path: '/admin/dashboard/blogs' },
    { icon: <RiMessage2Line className="w-5 h-5" />, label: 'Contacts', path: '/admin/dashboard/contacts' },
    { icon: <RiQuestionLine className="w-5 h-5" />, label: 'FAQs', path: '/admin/dashboard/faq' },
    { icon: <RiImageLine className="w-5 h-5" />, label: 'Gallery', path: '/admin/dashboard/gallery' },
    { icon: <RiBriefcaseLine className="w-5 h-5" />, label: 'Services', path: '/admin/dashboard/services' },
    { icon: <RiTeamLine className="w-5 h-5" />, label: 'Team', path: '/admin/dashboard/team' },
    { icon: <RiChat1Line className="w-5 h-5" />, label: 'Testimonials', path: '/admin/dashboard/testimonials' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin"
  };

  return (
    <>
      <aside className="fixed top-0 left-0 h-full bg-white shadow-lg z-10 w-64 mt-20">
        {/* Sidebar Header */}

        {/* Navigation Menu */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-all duration-200 
                ${router.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {item.icon}
              <span className="ml-3">
                {item.label}
              </span>
            </Link>
          ))}

          <Link href='/'
            onClick={handleLogout}
            className={`flex items-center px-4 py-3 mb-1 rounded-lg transition-all duration-200 `}
            aria-label="Logout"
          >
            <RiLogoutBoxLine className="w-5 h-5" />
            <span className="ml-3">
              Logout
            </span>
          </Link>

        </nav>
      </aside>

    </>
  );
};

export default AdminNavbar;