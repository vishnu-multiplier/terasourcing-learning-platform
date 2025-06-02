import React, { useState } from 'react';
import { FaPlus, FaRegBookmark } from "react-icons/fa";
import NewCourseForm from './New_course_form';

const Courses = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeStatus, setActiveStatus] = useState('Live'); // Track active button

  if (showForm) {
    // Only render the NewCourseForm when showForm is true
    return <NewCourseForm />;
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600' }}>Courses</h2>
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
          <FaPlus /> New
        </button>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginTop: '20px',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Left side: All Batches */}
        <div style={{
          minWidth: 100,
          fontWeight: 600,
          color: '#222',
          fontSize: 15,
          whiteSpace: 'nowrap',
          marginRight: 16
        }}>
          All Courses
        </div>
        {/* Right side: filters */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          flex: 1,
          justifyContent: 'flex-end'
        }}>
          {/* Status buttons in a single box */}
          <div style={{
            display: 'flex',
            background: '#F3F3F3',
            borderRadius: '8px',
            padding: '2px 4px',
            gap: '0'
          }}>
            {['Live', 'New', 'Upcoming', 'Created'].map((label, idx) => (
              <button
                key={label}
                onClick={() => setActiveStatus(label)}
                style={{
                  padding: '6px 16px',
                  border: 'none',
                  borderRadius: idx === 0
                    ? '8px 0 0 8px'
                    : idx === 3
                      ? '0 8px 8px 0'
                      : '0',
                  background: activeStatus === label ? '#fff' : '#F3F3F3',
                  fontWeight: activeStatus === label ? 600 : 400,
                  color: '#222',
                  cursor: 'pointer',
                  boxShadow: activeStatus === label ? '0 1px 4px rgba(0,0,0,0.04)' : 'none',
                  transition: 'background 0.15s'
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 12 }}>
            <input type="checkbox" />
            Certification
          </label>

          <input type="text" placeholder="Search by Title" style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            width: '120px',
            minWidth: '100px',
            marginLeft: 12
          }} />

          <select style={{
            padding: '6px 12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginLeft: 12
          }}>
            <option>Category</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '80px',
        color: '#888'
      }}>
        <FaRegBookmark size={48} />
        <h3 style={{ marginTop: '12px', fontSize: '16px', fontWeight: '600' }}>No courses found</h3>
        <p style={{ marginTop: '4px', fontSize: '14px', textAlign: 'center', maxWidth: '400px' }}>
          There are no courses matching the criteria. Keep an eye out, fresh learning experiences are on the way soon!
        </p>
      </div>
    </div>
  );
};

export default Courses;
