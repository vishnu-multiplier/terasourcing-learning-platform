import React, { useState } from 'react';

const tabOptions = [
  { label: 'About', value: 'about' },
  { label: 'Certificates', value: 'certificates' },
  { label: 'Roles', value: 'roles' },
  { label: 'Slots', value: 'slots' },
  { label: 'Schedule', value: 'schedule' },
];

const roleOptions = [
  { label: 'Moderator', value: 'moderator' },
  { label: 'Course Creator', value: 'course_creator' },
  { label: 'Evaluator', value: 'evaluator' },
  { label: 'Student', value: 'student' },
];

const defaultProfile = {
  firstName: 'Admin',
  lastName: '(TerraSourcing)',
  headline: 'AI Bootcamp for Exporters',
  bio: '',
  image: 'https://via.placeholder.com/90',
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [editProfile, setEditProfile] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [profile, setProfile] = useState(defaultProfile);
  const [editForm, setEditForm] = useState(defaultProfile);
  const [roles, setRoles] = useState(['Admin', 'Mentor']);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [availability, setAvailability] = useState({
    day: '',
    start: '',
    end: '',
    unavailableFrom: '',
    unavailableTo: '',
  });

  const handleRoleChange = (role) => {
    setSelectedRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleAvailabilityChange = (e) => {
    setAvailability({ ...availability, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setEditForm({ ...editForm, image: url });
    }
  };

  const handleSaveProfile = () => {
    setProfile(editForm);
    setShowEditPopup(false);
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen m-0">
      {/* Breadcrumb */}
      <div className="pt-5 px-10 text-[15px] text-gray-500 tracking-[.02em]">
        <span>People</span>
        <span className="mx-1 text-gray-300">/</span>
        <span className="font-semibold text-gray-900">{profile.firstName} {profile.lastName}</span>
      </div>
      {/* Top Banner */}
      <div className="bg-gray-100 h-[140px] mt-4 rounded-b-3xl" />
      {/* Main Card */}
      <div className="bg-white mx-auto -mt-16 rounded-2xl shadow-lg max-w-[900px] p-8 relative">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-5">
            <img
              src={profile.image}
              alt="Profile"
              className="w-[90px] h-[90px] rounded-full border-4 border-white object-cover shadow-md"
            />
            <div>
              <div className="font-bold text-2xl text-gray-900">{profile.firstName} {profile.lastName}</div>
              <div className="text-gray-900 text-[15px] font-medium mt-0.5">{profile.headline}</div>
              <div className="text-gray-400 text-xs mt-1">admin@terrasourcing.com</div>
            </div>
          </div>
          <div>
            <button
              className="bg-gray-100 border-none rounded-lg px-6 py-2 text-xs font-semibold cursor-pointer mr-2"
              onClick={() => setShowEditPopup(true)}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-0 border-b-[1.5px] border-gray-200 mb-7">
          {tabOptions.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-7 py-3 border-none border-b-4 ${activeTab === tab.value ? 'border-gray-900 text-gray-900 font-bold' : 'border-transparent text-gray-400 font-medium'} text-[15px] cursor-pointer outline-none transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div className="min-h-[120px]">
          {activeTab === 'about' && (
            <div>
              <h3 className="text-lg mb-2 text-gray-900">About</h3>
              <p className="italic text-gray-400 mb-0">
                {profile.bio ? profile.bio : 'No introduction'}
              </p>
              <div className="mt-6 flex gap-8">
                <div>
                  <div className="text-gray-400 text-xs">Role</div>
                  <div className="text-gray-900 font-medium text-sm">Admin</div>
                </div>
                <div>
                  <div className="text-gray-400 text-xs">Joined</div>
                  <div className="text-gray-900 font-medium text-sm">Jan 2024</div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'certificates' && (
            <div>
              <h3 className="text-lg mb-2 text-gray-900">Certificates</h3>
              <p className="text-gray-400 text-sm">No certificates yet.</p>
            </div>
          )}
          {activeTab === 'roles' && (
            <div>
              <h3 className="text-lg mb-2 text-gray-900">Roles</h3>
              <div className="flex flex-row gap-6 mb-4 flex-wrap">
                {roleOptions.map(role => (
                  <label key={role.value} className="text-sm text-gray-700 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(role.value)}
                      onChange={() => handleRoleChange(role.value)}
                      className="accent-indigo-500"
                    />
                    {role.label}
                  </label>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'slots' && (
            <div>
              <h3 className="text-xs mb-3.5 text-gray-900">My Availability</h3>
              <div className="flex flex-wrap gap-5 mb-4 items-end">
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[11px]">Day</label>
                  <select
                    name="day"
                    value={availability.day}
                    onChange={handleAvailabilityChange}
                    className="px-1.5 py-0.5 rounded border border-gray-200 text-xs min-w-[180px] h-[30px] bg-gray-100"
                  >
                    <option value="">Select</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[11px]">Start Time</label>
                  <input
                    type="time"
                    name="start"
                    value={availability.start}
                    onChange={handleAvailabilityChange}
                    className="px-1.5 py-0.5 rounded border border-gray-200 text-xs min-w-[180px] h-[30px] bg-gray-100"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-gray-400 text-[11px]">End Time</label>
                  <input
                    type="time"
                    name="end"
                    value={availability.end}
                    onChange={handleAvailabilityChange}
                    className="px-1.5 py-0.5 rounded border border-gray-200 text-xs min-w-[180px] h-[30px] bg-gray-100"
                  />
                </div>
              </div>
              {/* Add Slot button on a new line */}
              <div className="my-3">
                <button
                  className="bg-gray-100 border-none rounded-md px-3 py-1.5 text-xs text-gray-900 font-semibold h-[30px] cursor-pointer"
                >
                  Add Slot
                </button>
              </div>
              {/* New line after "I am unavailable" */}
              <div className="mt-4 mb-2.5">
                <label className="text-gray-900 text-xs min-w-[70px] block mb-1.5">
                  <h3 className="text-xs m-0">I am unavailable</h3>
                </label>
                <div className="flex items-center gap-3.5 mb-2.5 flex-wrap">
                  <span className="text-xs">From</span>
                  <input
                    type="date"
                    name="unavailableFrom"
                    value={availability.unavailableFrom}
                    onChange={handleAvailabilityChange}
                    className="px-1.5 py-0.5 rounded border border-gray-200 text-xs h-[30px] bg-gray-100"
                  />
                  <span className="text-xs">To</span>
                  <input
                    type="date"
                    name="unavailableTo"
                    value={availability.unavailableTo}
                    onChange={handleAvailabilityChange}
                    className="px-1.5 py-0.5 rounded border border-gray-200 text-xs h-[30px] bg-gray-100"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-xs text-gray-900 mb-1.5">My Calendar</h4>
                <button
                  className="bg-gray-100 text-gray-900 border-none rounded-md px-3 py-1.5 text-[11px] font-light h-[30px] cursor-pointer"
                >
                  Authorize Google Calendar Access
                </button>
              </div>
            </div>
          )}
          {activeTab === 'schedule' && (
            <div>
              <h3 className="text-lg mb-2 text-gray-900">Schedule</h3>
              <p className="text-gray-400 text-sm">No schedule available.</p>
            </div>
          )}
        </div>
      </div>
      {/* Edit Profile Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/20 z-[1000] flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-7 min-w-[320px] max-w-[400px] w-full relative">
            <div className="font-semibold text-[15px] mb-3.5 text-gray-900">Edit your profile</div>
            <div className="mb-3.5">
              <label className="font-medium text-xs text-gray-900">Profile Image</label>
              <div className="flex items-center gap-2.5 mt-1.5">
                <img src={editForm.image} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-gray-100" />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>
            </div>
            <div className="mb-2.5">
              <label className="font-medium text-xs text-gray-900">First Name</label>
              <input
                name="firstName"
                value={editForm.firstName}
                onChange={handleEditChange}
                className="w-full p-1.5 rounded-md border border-gray-200 mt-1 text-gray-900 text-xs"
              />
            </div>
            <div className="mb-2.5">
              <label className="font-medium text-xs text-gray-900">Last Name</label>
              <input
                name="lastName"
                value={editForm.lastName}
                onChange={handleEditChange}
                className="w-full p-1.5 rounded-md border border-gray-200 mt-1 text-gray-900 text-xs"
              />
            </div>
            <div className="mb-2.5">
              <label className="font-medium text-xs text-gray-900">Headline</label>
              <input
                name="headline"
                value={editForm.headline}
                onChange={handleEditChange}
                className="w-full p-1.5 rounded-md border border-gray-200 mt-1 text-gray-900 text-xs"
              />
            </div>
            <div className="mb-3.5">
              <label className="font-medium text-xs text-gray-900">Bio</label>
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleEditChange}
                className="w-full min-h-[40px] rounded-md border border-gray-200 p-1.5 mt-1 text-gray-900 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2.5">
              <button
                className="bg-gray-200 text-gray-900 border border-gray-400 rounded-lg px-3.5 py-1.5 text-xs font-semibold cursor-pointer"
                onClick={() => setShowEditPopup(false)}
              >
                Cancel
              </button>
              <button
                className="bg-gray-400 border-none rounded-lg px-3.5 py-1.5 text-xs text-white font-semibold cursor-pointer"
                onClick={handleSaveProfile}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
