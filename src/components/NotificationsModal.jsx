import React, { useState } from 'react';
import { X, Bell, BookOpen, DollarSign, Info, CheckCheck, CheckCircle2, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationsModal({ isOpen, onClose }) {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    showToast,
  } = useApp();

  const [filter, setFilter] = useState('all');

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return n.unread;
    if (filter === 'academic') return n.type === 'academic' || n.type === 'grade';
    if (filter === 'financial') return n.type === 'financial';
    if (filter === 'attendance') return n.type === 'attendance';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'academic':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'grade':
        return <Award className="w-4 h-4 text-purple-600" />;
      case 'financial':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'attendance':
        return <CheckCircle2 className="w-4 h-4 text-indigo-600" />;
      default:
        return <Info className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-slate-900">Notifications & Alerts</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All' },
            { id: 'unread', label: 'Unread' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'academic', label: 'Academics' },
            { id: 'financial', label: 'Finance' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No notifications in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.unread) markNotificationAsRead(item.id);
                  showToast(`Opened: ${item.title}`);
                }}
                className={`p-3 rounded-xl transition cursor-pointer flex items-start gap-3 ${
                  item.unread ? 'bg-blue-50/50 hover:bg-blue-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-white border border-slate-200 shrink-0 shadow-2xs mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-xs font-semibold ${item.unread ? 'text-blue-900' : 'text-slate-800'}`}>
                      {item.title}
                    </p>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1.5 block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
