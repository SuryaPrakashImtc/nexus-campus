import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ROLES,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_STUDENT_COURSES,
  INITIAL_STUDENT_FEES,
  INITIAL_TIMETABLE,
  INITIAL_STUDENT_TRANSCRIPT,
  INITIAL_FACULTY_ROSTER,
  INITIAL_GRADEBOOK,
  REGISTRAR_METRICS,
  ENROLLMENT_BY_SCHOOL,
  FEE_COLLECTION_TRENDS,
  ATTENDANCE_DISTRIBUTION,
  STUDENT_DIRECTORY,
  CONNECTED_SYSTEMS,
} from '../mockData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  ROLE: 'nexus_active_role',
  USERS: 'nexus_users_data',
  NOTIFICATIONS: 'nexus_notifications',
  COURSES: 'nexus_student_courses',
  FEES: 'nexus_student_fees',
  ROSTER: 'nexus_faculty_roster',
  GRADEBOOK: 'nexus_faculty_gradebook',
  REGISTRAR_METRICS: 'nexus_registrar_metrics',
  STUDENT_DIR: 'nexus_student_directory',
  SYSTEMS: 'nexus_connected_systems',
};

export function AppProvider({ children }) {
  // Load from localStorage or fallback to defaults
  const [activeRole, setActiveRoleState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
      return saved && Object.values(ROLES).includes(saved) ? saved : ROLES.STUDENT;
    } catch {
      return ROLES.STUDENT;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [studentCourses, setStudentCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_COURSES;
    } catch {
      return INITIAL_STUDENT_COURSES;
    }
  });

  const [studentFees, setStudentFees] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEES);
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_FEES;
    } catch {
      return INITIAL_STUDENT_FEES;
    }
  });

  const [facultyRoster, setFacultyRoster] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROSTER);
      return saved ? JSON.parse(saved) : INITIAL_FACULTY_ROSTER;
    } catch {
      return INITIAL_FACULTY_ROSTER;
    }
  });

  const [facultyGradebook, setFacultyGradebook] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GRADEBOOK);
      return saved ? JSON.parse(saved) : INITIAL_GRADEBOOK;
    } catch {
      return INITIAL_GRADEBOOK;
    }
  });

  const [registrarMetrics, setRegistrarMetrics] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRAR_METRICS);
      return saved ? { ...REGISTRAR_METRICS, ...JSON.parse(saved) } : REGISTRAR_METRICS;
    } catch {
      return REGISTRAR_METRICS;
    }
  });

  const [studentDirectory, setStudentDirectory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENT_DIR);
      return saved ? JSON.parse(saved) : STUDENT_DIRECTORY;
    } catch {
      return STUDENT_DIRECTORY;
    }
  });

  const [connectedSystems, setConnectedSystems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SYSTEMS);
      return saved ? JSON.parse(saved) : CONNECTED_SYSTEMS;
    } catch {
      return CONNECTED_SYSTEMS;
    }
  });

  // UI States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [selectedStudentFor360, setSelectedStudentFor360] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLE, activeRole);
    } catch (e) {
      console.error(e);
    }
  }, [activeRole]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch (e) {
      console.error(e);
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(studentCourses));
    } catch (e) {
      console.error(e);
    }
  }, [studentCourses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEES, JSON.stringify(studentFees));
    } catch (e) {
      console.error(e);
    }
  }, [studentFees]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROSTER, JSON.stringify(facultyRoster));
    } catch (e) {
      console.error(e);
    }
  }, [facultyRoster]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GRADEBOOK, JSON.stringify(facultyGradebook));
    } catch (e) {
      console.error(e);
    }
  }, [facultyGradebook]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRAR_METRICS, JSON.stringify(registrarMetrics));
    } catch (e) {
      console.error(e);
    }
  }, [registrarMetrics]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_DIR, JSON.stringify(studentDirectory));
    } catch (e) {
      console.error(e);
    }
  }, [studentDirectory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SYSTEMS, JSON.stringify(connectedSystems));
    } catch (e) {
      console.error(e);
    }
  }, [connectedSystems]);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const clearToast = () => {
    setToastMessage('');
  };

  const syncConnectedSystem = (id) => {
    setConnectedSystems((prev) =>
      prev.map((sys) =>
        sys.id === id ? { ...sys, lastSync: 'Just now', status: 'Operational' } : sys
      )
    );
    showToast(`Synchronized ${id.toUpperCase()} integration pipeline successfully.`);
  };

  const addNotification = ({ title, message, type = 'general' }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      time: 'Just now',
      unread: true,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('All notifications marked as read.');
  };

  // Role switching
  const handleRoleChange = (newRole) => {
    setActiveRoleState(newRole);
    if (newRole === ROLES.STUDENT) {
      setActiveTab('dashboard');
    } else if (newRole === ROLES.FACULTY) {
      setActiveTab('faculty-dashboard');
    } else if (newRole === ROLES.REGISTRAR) {
      setActiveTab('registrar-dashboard');
    }
    showToast(`Switched active view to ${newRole.toUpperCase()} mode.`);
  };

  // 1. Functional Workflow: Faculty Marks & Saves Attendance
  const saveAttendanceRoster = (newRoster, courseCode = 'CS-302') => {
    setFacultyRoster(newRoster);

    // Cross-sync: check if Aisha Sharma's status in this roster changed
    const aishaInRoster = newRoster.find((s) => s.roll === 'MU-2023-CS-0842');
    if (aishaInRoster) {
      setStudentCourses((prevCourses) =>
        prevCourses.map((c) => {
          if (c.code === courseCode) {
            // Recalculate stats based on status
            const baseAttended = aishaInRoster.status === 'Absent' ? 33 : 34;
            const baseTotal = 36;
            const newPercent = parseFloat(((baseAttended / baseTotal) * 100).toFixed(1));
            // Calculate safe leaves (> 75%)
            // safeLeaves: floor(attended / 0.75 - total)
            const safeLeaves = Math.max(0, Math.floor(baseAttended / 0.75 - baseTotal));
            return {
              ...c,
              attended: baseAttended,
              total: baseTotal,
              attendancePercent: newPercent,
              safeLeaves,
              status: newPercent >= 90 ? 'Excellent' : newPercent >= 75 ? 'Good' : 'Attention',
            };
          }
          return c;
        })
      );

      // Also update overall student attendance in user profile & directory
      const newAttendanceString = aishaInRoster.status === 'Absent' ? '91.2%' : '94.2%';
      setUsers((prev) => ({
        ...prev,
        [ROLES.STUDENT]: {
          ...prev[ROLES.STUDENT],
          attendance: newAttendanceString,
        },
      }));

      setStudentDirectory((prev) =>
        prev.map((s) =>
          s.id === 'MU-2023-CS-0842'
            ? { ...s, attendance: newAttendanceString }
            : s
        )
      );

      addNotification({
        title: `Attendance Marked for ${courseCode}`,
        message: `Faculty updated attendance record. Status recorded: ${aishaInRoster.status}.`,
        type: 'attendance',
      });
    }

    showToast('Attendance saved successfully.');
  };

  // 2. Functional Workflow: Faculty Edits & Saves Grades
  const saveGradebook = (newGradebook, courseCode = 'CS-302') => {
    setFacultyGradebook(newGradebook);

    // Cross-sync: check Aisha's grade
    const aishaGrade = newGradebook.find((g) => g.roll === 'MU-2023-CS-0842');
    if (aishaGrade) {
      setStudentCourses((prevCourses) =>
        prevCourses.map((c) => {
          if (c.code === courseCode) {
            return {
              ...c,
              gradePrediction: aishaGrade.grade,
            };
          }
          return c;
        })
      );

      addNotification({
        title: `Grades Updated for ${courseCode}`,
        message: `Prof. Raghav Iyer saved updated course gradebook. Aisha Sharma score: ${aishaGrade.total}/100 (${aishaGrade.grade}).`,
        type: 'grade',
      });
    }

    showToast('Grades saved successfully.');
  };

  // 3. Functional Workflow: Student Pays Fee
  const payOutstandingFee = (amount = 65000, method = 'Campus NetBanking (SBI)') => {
    const receiptNum = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    setStudentFees((prev) => ({
      currentSemester: {
        ...prev.currentSemester,
        paidAmount: prev.currentSemester.totalPayable,
        outstanding: 0,
        status: 'Cleared (Paid in Full)',
        breakdown: prev.currentSemester.breakdown.map((item) => ({ ...item, status: 'Paid' })),
      },
      history: [
        {
          receipt: receiptNum,
          date: today,
          term: 'Spring 2026 (Installment 2 - Final Balance)',
          amount,
          method,
          status: 'Cleared',
        },
        ...prev.history,
      ],
    }));

    // Update student user profile
    setUsers((prev) => ({
      ...prev,
      [ROLES.STUDENT]: {
        ...prev[ROLES.STUDENT],
        balance: '₹0 (All Clear)',
      },
    }));

    // Update in Student Directory
    setStudentDirectory((prev) =>
      prev.map((s) =>
        s.id === 'MU-2023-CS-0842'
          ? { ...s, financialStatus: 'Paid in Full' }
          : s
      )
    );

    // Update Registrar overall fee collections
    setRegistrarMetrics((prev) => {
      const updatedNumeric = prev.feeCollectionNumeric + amount;
      return {
        ...prev,
        feeCollectionNumeric: updatedNumeric,
        feeCollection: `₹${(updatedNumeric / 10000000).toFixed(2)} Crore`,
        collectionRate: '95.2%',
      };
    });

    addNotification({
      title: 'Fee Payment Confirmed',
      message: `Payment of ₹${amount.toLocaleString()} acknowledged. Receipt ${receiptNum} issued.`,
      type: 'financial',
    });

    showToast(`Payment of ₹${amount.toLocaleString()} processed successfully!`);
  };

  // Update Profile details
  const updateProfile = (role, updatedFields) => {
    setUsers((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        ...updatedFields,
      },
    }));
    showToast('Profile updated successfully.');
  };

  // Reset demo state back to default
  const resetDemoData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setStudentCourses(INITIAL_STUDENT_COURSES);
    setStudentFees(INITIAL_STUDENT_FEES);
    setFacultyRoster(INITIAL_FACULTY_ROSTER);
    setFacultyGradebook(INITIAL_GRADEBOOK);
    setRegistrarMetrics(REGISTRAR_METRICS);
    setStudentDirectory(STUDENT_DIRECTORY);
    setConnectedSystems(CONNECTED_SYSTEMS);
    setActiveRoleState(ROLES.STUDENT);
    setActiveTab('dashboard');
    showToast('Demo environment reset to Meridian University factory defaults.');
  };

  const currentUser = users[activeRole] || users[ROLES.STUDENT];

  return (
    <AppContext.Provider
      value={{
        ROLES,
        activeRole,
        setActiveRole: handleRoleChange,
        activeTab,
        setActiveTab,
        currentUser,
        users,
        updateProfile,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        studentCourses,
        studentFees,
        payOutstandingFee,
        timetable: INITIAL_TIMETABLE,
        studentTranscript: INITIAL_STUDENT_TRANSCRIPT,
        facultyRoster,
        saveAttendanceRoster,
        facultyGradebook,
        saveGradebook,
        registrarMetrics,
        enrollmentBySchool: ENROLLMENT_BY_SCHOOL,
        feeCollectionTrends: FEE_COLLECTION_TRENDS,
        attendanceDistribution: ATTENDANCE_DISTRIBUTION,
        studentDirectory,
        setStudentDirectory,
        connectedSystems,
        setConnectedSystems,
        selectedStudentFor360,
        setSelectedStudentFor360,
        toastMessage,
        setToastMessage,
        showToast,
        clearToast,
        syncConnectedSystem,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
