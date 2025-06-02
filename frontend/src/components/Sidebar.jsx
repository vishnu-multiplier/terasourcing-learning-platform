import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiBookOpen, FiLink, FiUsers, FiAward, FiBell, FiHelpCircle, FiEdit3 } from 'react-icons/fi';

const menuItems = [
  { icon: <FiBookOpen />, label: 'Courses', path: '/courses' },
  { icon: <FiLink />, label: 'Programs', path: '/programs' },
  { icon: <FiUsers />, label: 'Batches', path: '/batches' },
  { icon: <FiAward />, label: 'Certified Members', path: '/certified-members' },
  { icon: <FiBell />, label: 'Notifications', path: '/notifications' },
  { icon: <FiHelpCircle />, label: 'Quizzes', path: '/quizzes' },
  { icon: <FiEdit3 />, label: 'Assignments', path: '/assignments' },
];

const Sidebar = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfilePop, setShowProfilePop] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfilePop(false);
      }
    }
    if (showProfilePop) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfilePop]);

  const sidebarWidth = collapsed ? 'w-16' : 'w-60';

  return (
    <div
      className={`bg-white border-r border-gray-200 h-screen py-1 box-border transition-all duration-200 fixed top-0 left-0 flex flex-col justify-between z-[100] overflow-hidden ${sidebarWidth}`}
    >
      <div>
        <div className="relative" ref={profileRef}>
          <div
            className={`flex items-center cursor-pointer ${collapsed ? 'justify-center px-1 pb-3 pt-0' : 'justify-start px-2 pb-1 pt-0'}`}
            onClick={() => setShowProfilePop(v => !v)}
          >
            <img
              src="/logo.jpg"
              alt="Terra Logo"
              className={`rounded-full ${collapsed ? 'w-7 h-7 mr-0' : 'w-14 h-14 mr-2'}`}
            />
            {!collapsed && (
              <div className="text-[18px] text-gray-900 font-normal leading-[0.9]">
                Terra Sourcing<br />
                <span className="text-[13px] text-gray-400 font-normal">Admin</span><br />
                <span className="text-[13px] text-gray-400 font-normal">(terrasourcing)</span>
              </div>
            )}
          </div>
          {showProfilePop && !collapsed && (
            <div
              className="absolute top-10 left-[2.5%] w-[95%] bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-1"
            >
              <div
                className="px-3 py-2 text-[14px] text-gray-900 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={() => {
                  setShowProfilePop(false);
                  navigate('/profile');
                }}
              >
                Profile
              </div>
              <div
                className="px-3 py-2 text-[14px] text-gray-900 cursor-pointer border-b border-gray-100 hover:bg-gray-50"
                onClick={() => alert('Settings')}
              >
                Settings
              </div>
              <div
                className="px-3 py-2 text-[14px] text-red-600 cursor-pointer hover:bg-gray-50"
                onClick={() => alert('Logout')}
              >
                Logout
              </div>
            </div>
          )}
        </div>
        <nav>
          {menuItems.map(item => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center ${collapsed ? 'justify-center px-0 py-1.5' : 'justify-start px-2 py-1'} cursor-pointer rounded-md mx-[2px] my-[1px] font-medium text-[13px] no-underline transition-all duration-200 ${location.pathname === item.path ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:bg-gray-100'} group`}
            >
              <span className={`text-[18px] text-gray-400 flex items-center ${collapsed ? 'mr-0' : 'mr-2'}`}>{item.icon}</span>
              {!collapsed && item.label}
            </Link>
          ))}
          <div
            className={`flex items-center ${collapsed ? 'justify-center px-0 py-1.5' : 'justify-start px-2 py-1'} cursor-pointer rounded-md mx-[2px] my-[1px] text-gray-400 text-[13px]`}
          >
            <span className={`text-[18px] flex items-center ${collapsed ? 'mr-0' : 'mr-2'}`}>{'>'}</span>
            {!collapsed && <>
              More<span className="ml-auto text-[12px]">+</span>
            </>}
          </div>
        </nav>
      </div>
      {/* Collapse/Expand Button */}
      <div className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-end'} py-2`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`border-none bg-gray-100 rounded-2xl px-2 py-1 cursor-pointer text-[15px] text-gray-800 transition-all duration-200 ${collapsed ? '' : 'mr-2'}`}
          title={collapsed ? 'Open Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? '➡️' : '⬅️'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
