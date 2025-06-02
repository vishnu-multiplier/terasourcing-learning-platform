import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ProgramsPage from './components/ProgramsPage';
import BatchesPage from './components/Batchespage';
import CertifiedMembers from './components/CertifiedMembers';
import Notifications from "./components/Notifications";
import Courses from "./components/Courses";
import NewCourseForm from "./components/New_course_form";
import ProfilePage from './components/ProfilePage';

const HomePage = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ marginBottom: '16px', color: '#1a73e8' }}>Welcome to Terra LMS</h1>
    <p style={{ fontSize: '16px', color: '#666' }}>Select an option from the sidebar to get started.</p>
  </div>
);

const SIDEBAR_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
          backgroundColor: '#f5f5f5'
        }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            margin: '0px 0px 0px 20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginLeft: collapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH,
            transition: 'margin-left 0.2s'
          }}
        >
          <Routes>
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/certified-members" element={<CertifiedMembers />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/New_course_form" element={<NewCourseForm />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
