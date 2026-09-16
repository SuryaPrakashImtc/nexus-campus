import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import SearchModal from './components/SearchModal';
import NotificationsModal from './components/NotificationsModal';
import NotificationsView from './components/NotificationsView';
import Toast from './components/Toast';
import {
  StudentDashboard,
  StudentAttendance,
  StudentFees,
  StudentTimetable,
  StudentAcademics,
  StudentSettings,
} from './components/StudentViews';
import {
  FacultyDashboard,
  FacultyAttendanceMarking,
  FacultyGradebook,
  FacultyTodayClasses,
  FacultyStudentList,
  FacultySettings,
} from './components/FacultyViews';
import {
  RegistrarDashboard,
  RegistrarAnalytics,
  RegistrarStudentDirectory,
  RegistrarStudent360,
  RegistrarIntegrations,
  RegistrarSettings,
} from './components/RegistrarViews';
import { AppProvider, useApp } from './context/AppContext';

function MainLayout() {
  const {
    ROLES,
    activeRole,
    activeTab,
    toastMessage,
    clearToast,
  } = useApp();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Keyboard shortcut for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Render view depending on role & active tab
  const renderView = () => {
    // Student Views
    if (activeRole === ROLES.STUDENT) {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'attendance':
          return <StudentAttendance />;
        case 'fees':
          return <StudentFees />;
        case 'timetable':
          return <StudentTimetable />;
        case 'academics':
          return <StudentAcademics />;
        case 'notifications':
          return <NotificationsView />;
        case 'settings':
          return <StudentSettings />;
        default:
          return <StudentDashboard />;
      }
    }

    // Faculty Views
    if (activeRole === ROLES.FACULTY) {
      switch (activeTab) {
        case 'faculty-dashboard':
          return <FacultyDashboard />;
        case 'today-classes':
          return <FacultyTodayClasses />;
        case 'attendance-marking':
          return <FacultyAttendanceMarking />;
        case 'gradebook':
          return <FacultyGradebook />;
        case 'student-list':
          return <FacultyStudentList />;
        case 'notifications':
          return <NotificationsView />;
        case 'settings':
          return <FacultySettings />;
        default:
          return <FacultyDashboard />;
      }
    }

    // Registrar Views
    if (activeRole === ROLES.REGISTRAR) {
      switch (activeTab) {
        case 'registrar-dashboard':
          return <RegistrarDashboard />;
        case 'analytics':
          return <RegistrarAnalytics />;
        case 'directory':
        case 'student-directory':
          return <RegistrarStudentDirectory />;
        case 'student-360':
          return <RegistrarStudent360 />;
        case 'integrations':
          return <RegistrarIntegrations />;
        case 'notifications':
          return <NotificationsView />;
        case 'settings':
          return <RegistrarSettings />;
        default:
          return <RegistrarDashboard />;
      }
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-[#E9EDF1]/60 text-[#17191C] flex">
      {/* Persistent Left Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Bar */}
        <TopHeader
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          setIsMobileOpen={setIsMobileOpen}
        />

        {/* View Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderView()}
        </main>
      </div>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Toast Notification Component */}
      <Toast message={toastMessage} onClose={clearToast} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
