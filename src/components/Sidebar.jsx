import React from 'react';
import {
  LayoutDashboard,
  CheckCircle2,
  CreditCard,
  Calendar,
  GraduationCap,
  ClipboardCheck,
  Award,
  School,
  BarChart3,
  Users,
  Network,
  Bell,
  Settings,
  Shield,
  BookOpen,
  UserCheck,
  Layers,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const {
    ROLES,
    activeRole,
    setActiveRole,
    activeTab,
    setActiveTab,
    currentUser,
    notifications,
    resetDemoData,
  } = useApp();

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2, badge: currentUser.attendance || '91.4%' },
    { id: 'fees', label: 'Fees & Tuition', icon: CreditCard, alert: currentUser.balance && !currentUser.balance.includes('₹0') },
    { id: 'timetable', label: 'Timetable', icon: Calendar },
    { id: 'academics', label: 'Academic Records', icon: GraduationCap },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : null },
    { id: 'settings', label: 'Profile & Settings', icon: Settings },
  ];

  const facultyNav = [
    { id: 'faculty-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'today-classes', label: "Today's Classes", icon: Calendar },
    { id: 'attendance-marking', label: 'Mark Attendance', icon: ClipboardCheck, badge: 'Live' },
    { id: 'gradebook', label: 'Gradebook', icon: Award },
    { id: 'student-list', label: 'Student List', icon: UserCheck, badge: '10 Cohort' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : null },
    { id: 'settings', label: 'Faculty Settings', icon: Settings },
  ];

  const registrarNav = [
    { id: 'registrar-dashboard', label: 'Institutional Pulse', icon: School },
    { id: 'analytics', label: 'Analytics Workspace', icon: BarChart3 },
    { id: 'directory', label: 'Student Directory', icon: Users, badge: '14.8k' },
    { id: 'student-360', label: 'Student 360', icon: Layers },
    { id: 'integrations', label: 'Connected Systems', icon: Network, badge: '6 Live' },
    { id: 'notifications', label: 'Announcements & Alerts', icon: Bell, badge: unreadNotifsCount > 0 ? `${unreadNotifsCount}` : null },
    { id: 'settings', label: 'Settings & Legal', icon: Shield },
  ];

  const navItems =
    activeRole === ROLES.STUDENT
      ? studentNav
      : activeRole === ROLES.FACULTY
      ? facultyNav
      : registrarNav;

  const roleLabels = {
    [ROLES.STUDENT]: 'Student Journey',
    [ROLES.FACULTY]: 'Faculty Workspace',
    [ROLES.REGISTRAR]: 'Registrar & Senate',
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0B2341] text-slate-200 flex flex-col border-r border-[#172e4d] shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 bg-[#081b33]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-900/40 text-white font-display font-extrabold text-xl tracking-tight">
              N
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-white text-lg tracking-wide">
                  NEXUS CAMPUS
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
              </div>
              <p className="text-[11px] text-slate-400 truncate">One Platform. Every Student Journey.</p>
            </div>
          </div>

          {/* Quick Role Switcher */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Switch Demo Role
              </label>
              <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase">
                {activeRole}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-[#061528] p-1 rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setActiveRole(ROLES.STUDENT)}
                className={`py-1 px-1.5 rounded text-[11px] font-medium transition ${
                  activeRole === ROLES.STUDENT
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Student Persona: Aisha Sharma"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setActiveRole(ROLES.FACULTY)}
                className={`py-1 px-1.5 rounded text-[11px] font-medium transition ${
                  activeRole === ROLES.FACULTY
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Faculty Persona: Prof. Raghav Iyer"
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => setActiveRole(ROLES.REGISTRAR)}
                className={`py-1 px-1.5 rounded text-[11px] font-medium transition ${
                  activeRole === ROLES.REGISTRAR
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Registrar Persona: Ms. Fernandes"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>{roleLabels[activeRole]}</span>
            <span className="text-[10px] font-mono text-slate-500">Meridian Univ.</span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-300'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      isActive
                        ? 'bg-blue-800 text-blue-100'
                        : 'bg-slate-800 text-slate-300 border border-white/10'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {item.alert && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" title="Payment Due" />
                )}
              </button>
            );
          })}

          {/* Institutional Links */}
          <div className="pt-5 mt-4 border-t border-white/10 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Campus Ecosystem
          </div>
          <button
            onClick={() => setActiveTab('settings')}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-white/5 transition"
          >
            <Shield className="w-4 h-4 text-slate-400" />
            <span>Meridian Honor Code</span>
          </button>
          <button
            onClick={resetDemoData}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-amber-300 hover:bg-white/5 transition"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>
        </div>

        {/* User Profile Footer */}
        <div className="p-3.5 border-t border-white/10 bg-[#081b33]">
          <div
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-blue-400/40"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">{currentUser.name}</div>
              <p className="text-[11px] font-mono text-slate-400 truncate">{currentUser.id}</p>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" title="Active Session" />
          </div>
        </div>
      </aside>
    </>
  );
}
