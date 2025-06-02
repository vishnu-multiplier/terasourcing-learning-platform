import React, { useState } from 'react';

const ProgramsPage = () => {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newProgramTitle, setNewProgramTitle] = useState('');
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleCreateProgram = () => {
    if (newProgramTitle.trim()) {
      setPrograms([...programs, newProgramTitle]);
      setSelectedProgram(newProgramTitle);
      setEditedTitle(newProgramTitle);
      setNewProgramTitle('');
      setShowModal(false);
    }
  };

  const handleUpdateTitle = (newTitle) => {
    if (selectedProgram && newTitle.trim()) {
      const updatedPrograms = programs.map(p => 
        p === selectedProgram ? newTitle : p
      );
      setPrograms(updatedPrograms);
      setSelectedProgram(newTitle);
      setEditedTitle(newTitle);
    }
  };

  const handleDeleteProgram = (programToDelete) => {
    if (window.confirm('Are you sure you want to delete this program?')) {
      const updatedPrograms = programs.filter(program => program !== programToDelete);
      setPrograms(updatedPrograms);
      if (selectedProgram === programToDelete) {
        setSelectedProgram(null);
      }
    }
  };

  const handleAddCourse = () => {
    if (newCourseTitle.trim() && newCourseId.trim()) {
      // Add course logic here
      setNewCourseTitle('');
      setNewCourseId('');
      setShowCourseModal(false);
    }
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim() && newMemberName.trim()) {
      // Add member logic here
      setNewMemberEmail('');
      setNewMemberName('');
      setShowMemberModal(false);
    }
  };

  return (
    <div className="relative min-h-screen p-6">
      {/* Header with New Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[28px] font-semibold">Programs</h1>
        {!selectedProgram && (
          <button
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg border-none cursor-pointer flex items-center gap-1 text-lg font-medium shadow"
            onClick={() => setShowModal(true)}
          >
            <span className="text-2xl">+</span> New
          </button>
        )}
      </div>

      {!selectedProgram ? (
        <div className="max-w-[800px] mx-auto">
          {programs.length === 0 ? (
            <p className="text-center text-gray-500">
              No programs yet. Click "+ New" to create one.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {programs.map((title, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div
                    className="cursor-pointer flex-1 mr-4"
                    onClick={() => setSelectedProgram(title)}
                  >
                    <h2 className="text-lg font-medium">{title}</h2>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleDeleteProgram(title);
                    }}
                    className="px-3 py-1.5 bg-red-100 text-red-600 border-none rounded-md cursor-pointer text-sm font-medium flex items-center gap-1"
                  >
                    <span className="text-lg">×</span>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-[800px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Programs / {selectedProgram}
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteProgram(selectedProgram)}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-md border-none cursor-pointer flex items-center gap-1"
              >
                <span className="text-lg">×</span>
                Delete
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md border-none cursor-pointer"
                onClick={() => setSelectedProgram(null)}
              >
                Back
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Title</label>
            <div className="relative">
              <input
                value={editedTitle}
                onChange={e => setEditedTitle(e.target.value)}
                onBlur={() => handleUpdateTitle(editedTitle)}
                className="w-full px-3 py-2 pr-8 rounded-md border border-gray-300 bg-white"
              />
              {editedTitle && (
                <button
                  onClick={() => setEditedTitle('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-gray-500 text-lg p-1"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Program Courses</h3>
              <button
                onClick={() => setShowCourseModal(true)}
                className="px-3 py-1.5 text-sm bg-gray-100 border-none rounded cursor-pointer flex items-center gap-1"
              >
                <span className="text-base">+</span> Add
              </button>
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded">
              <input type="checkbox" className="mr-2" />
              <div className="flex-1">
                <span className="text-gray-500">Title</span>
              </div>
              <div className="w-[100px] text-center text-gray-500 font-medium">ID</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Program Members</h3>
              <button
                onClick={() => setShowMemberModal(true)}
                className="px-3 py-1.5 text-sm bg-gray-100 border-none rounded cursor-pointer flex items-center gap-1"
              >
                <span className="text-base">+</span> Add
              </button>
            </div>
            <div className="flex items-center p-2 bg-gray-50 rounded">
              <input type="checkbox" className="mr-2" />
              <div className="flex-1">
                <span className="text-gray-500">Member</span>
              </div>
              <div className="w-[150px] text-center text-gray-500 font-medium mr-4">Full Name</div>
              <div className="w-[100px] text-center text-gray-500 font-medium">Progress (%)</div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Program</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-2xl border-none bg-none cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Title"
                value={newProgramTitle}
                onChange={e => setNewProgramTitle(e.target.value)}
                className="w-full px-3 py-2 pr-8 rounded-md border border-gray-300 text-sm"
              />
              {newProgramTitle && (
                <button
                  onClick={() => setNewProgramTitle('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-gray-500 text-lg p-1"
                  type="button"
                >
                  ×
                </button>
              )}
            </div>
            <button
              onClick={handleCreateProgram}
              className="w-full py-2.5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* Course Addition Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Course</h2>
              <button
                onClick={() => setShowCourseModal(false)}
                className="text-2xl border-none bg-none cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Course Title</label>
              <input
                type="text"
                value={newCourseTitle}
                onChange={e => setNewCourseTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4"
              />
              <label className="block mb-2 text-sm font-medium">Course ID</label>
              <input
                type="text"
                value={newCourseId}
                onChange={e => setNewCourseId(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
              />
            </div>
            <button
              onClick={handleAddCourse}
              className="w-full py-2.5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
            >
              Add Course
            </button>
          </div>
        </div>
      )}

      {/* Member Addition Modal */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Member</h2>
              <button
                onClick={() => setShowMemberModal(false)}
                className="text-2xl border-none bg-none cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={newMemberEmail}
                onChange={e => setNewMemberEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 mb-4"
              />
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={newMemberName}
                onChange={e => setNewMemberName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
              />
            </div>
            <button
              onClick={handleAddMember}
              className="w-full py-2.5 bg-blue-600 text-white border-none rounded-md cursor-pointer"
            >
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramsPage;
