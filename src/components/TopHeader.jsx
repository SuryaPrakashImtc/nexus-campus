import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  Calendar,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  ShieldCheck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TopHeader({
  onOpenSearch,
  onOpenNotifications,
  setIsMobileOpen,
}) {
  const {
    ROLES,
    activeRole,
    setActiveRole,
    setActiveTab,
    currentUser,
    notifications,
    showToast,
    resetDemoData,
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
      {/* Left side: Hamburger & Global Search Trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200 rounded-xl text-xs text-slate-500 transition group cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="truncate">Search students, courses, faculty, fees, grades (⌘K)...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-white border border-slate-300 rounded shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right side: Term Indicator, Notification Bell, User Dropdown */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Term Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-800 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span>Spring 2026 • Week 9</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            aria-label="Open notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white font-mono text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* Role Badge Indicator */}
        <div className="hidden sm:block">
          <button
            type="button"
            onClick={() => {
              const next =
                activeRole === ROLES.STUDENT
                  ? ROLES.FACULTY
                  : activeRole === ROLES.FACULTY
                  ? ROLES.REGISTRAR
                  : ROLES.STUDENT;
              setActiveRole(next);
            }}
            className="text-[11px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center gap-1.5"
            title="Click to cycle role"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>Role: {activeRole}</span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition focus:outline-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/20"
            />
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-blue-700 font-mono font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>ID: {currentUser.id}</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    setActiveTab('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile & Academic Identity</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    setActiveTab('settings');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Account Settings & Preferences</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    showToast('Meridian ERP Helpdesk: helpdesk@meridian.edu • Intercom: #4401');
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>Student & Faculty Support</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    resetDemoData();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-amber-700 hover:bg-amber-50 flex items-center gap-2.5"
                >
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Reset Demo Environment</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="px-4 py-1 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Switch Demo Role
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveRole(ROLES.STUDENT);
                    setShowProfileMenu(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left text-xs flex items-center justify-between ${
                    activeRole === ROLES.STUDENT ? 'font-bold text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Student (Aisha Sharma)</span>
                  {activeRole === ROLES.STUDENT && <span className="text-blue-600 text-[10px] font-mono">Active</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveRole(ROLES.FACULTY);
                    setShowProfileMenu(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left text-xs flex items-center justify-between ${
                    activeRole === ROLES.FACULTY ? 'font-bold text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Faculty (Prof. Raghav Iyer)</span>
                  {activeRole === ROLES.FACULTY && <span className="text-blue-600 text-[10px] font-mono">Active</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveRole(ROLES.REGISTRAR);
                    setShowProfileMenu(false);
                  }}
                  className={`w-full px-4 py-1.5 text-left text-xs flex items-center justify-between ${
                    activeRole === ROLES.REGISTRAR ? 'font-bold text-blue-600 bg-blue-50/70' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>Registrar (Ms. Fernandes)</span>
                  {activeRole === ROLES.REGISTRAR && <span className="text-blue-600 text-[10px] font-mono">Active</span>}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
