import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  DollarSign,
  Info,
  CheckCheck,
  CheckCircle2,
  Award,
  Filter,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function NotificationsView() {
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    showToast,
  } = useApp();

  const [filter, setFilter] = useState('all');

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
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'grade':
        return <Award className="w-5 h-5 text-purple-600" />;
      case 'financial':
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      case 'attendance':
        return <CheckCircle2 className="w-5 h-5 text-indigo-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            University Broadcasts & Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time notifications, attendance alerts, bursar invoices, and senate circulars.
          </p>
        </div>
        <button
          onClick={markAllNotificationsAsRead}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
        >
          <CheckCheck className="w-4 h-4 text-blue-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        {/* Filter Toolbar */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 text-xs overflow-x-auto">
          {[
            { id: 'all', label: 'All Notifications' },
            { id: 'unread', label: 'Unread' },
            { id: 'attendance', label: 'Attendance Shortfalls' },
            { id: 'academic', label: 'Academic & Grades' },
            { id: 'financial', label: 'Tuition & Fees' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl font-medium whitespace-nowrap transition ${
                filter === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="divide-y divide-slate-100 p-2">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              No notifications in this filter category.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.unread) markNotificationAsRead(item.id);
                  showToast(`Opened: ${item.title}`);
                }}
                className={`p-4 rounded-xl transition cursor-pointer flex items-start gap-4 ${
                  item.unread ? 'bg-blue-50/50 hover:bg-blue-50/80' : 'hover:bg-slate-50'
                }`}
              >
                <div className="p-3 rounded-xl bg-white border border-slate-200 shrink-0 shadow-2xs mt-0.5">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold ${item.unread ? 'text-blue-900' : 'text-slate-800'}`}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.time}
                      </span>
                      {item.unread && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
