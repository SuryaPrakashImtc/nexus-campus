import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  BookOpen,
  Users,
  GraduationCap,
  FileText,
  ArrowRight,
  CornerDownLeft,
  CreditCard,
  Network,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SearchModal({ isOpen, onClose }) {
  const {
    ROLES,
    setActiveRole,
    setActiveTab,
    studentCourses,
    studentDirectory,
    setSelectedStudentFor360,
    showToast,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search catalog with context items
  const catalog = [
    ...studentCourses.map((c) => ({
      type: 'Course',
      title: `${c.code}: ${c.name}`,
      subtitle: `${c.instructor} • ${c.room} • ${c.attendancePercent}% attendance`,
      icon: BookOpen,
      action: () => {
        setActiveRole(ROLES.STUDENT);
        setActiveTab('attendance');
        showToast(`Jumped to Course: ${c.code}`);
      },
    })),
    ...studentDirectory.map((s) => ({
      type: 'Student',
      title: s.name,
      subtitle: `${s.id} • ${s.program} • CGPA: ${s.gpa} • ${s.academicStatus}`,
      icon: GraduationCap,
      action: () => {
        setSelectedStudentFor360(s);
        setActiveRole(ROLES.REGISTRAR);
        setActiveTab('student-360');
        showToast(`Opened Student 360 for ${s.name}`);
      },
    })),
    {
      type: 'Faculty',
      title: 'Prof. Raghav Iyer',
      subtitle: 'Professor & Course Director • Aryabhata 412 • CS-302',
      icon: Users,
      action: () => {
        setActiveRole(ROLES.FACULTY);
        setActiveTab('faculty-dashboard');
        showToast('Switched to Faculty Portal: Prof. Raghav Iyer');
      },
    },
    {
      type: 'Admin',
      title: 'Ms. Fernandes (Registrar & COE)',
      subtitle: 'Office of the Registrar • Senate Secretariat',
      icon: Users,
      action: () => {
        setActiveRole(ROLES.REGISTRAR);
        setActiveTab('registrar-dashboard');
        showToast('Switched to Registrar Portal: Ms. Fernandes');
      },
    },
    {
      type: 'Finance',
      title: 'Tuition Fee Ledger & Payment Counter',
      subtitle: 'Semester VI Tuition • ₹65,000 Installment Clearance',
      icon: CreditCard,
      action: () => {
        setActiveRole(ROLES.STUDENT);
        setActiveTab('fees');
        showToast('Navigated to Fees & Payments');
      },
    },
    {
      type: 'Integrations',
      title: 'Canvas LMS, Koha Library & Biometric Gateways',
      subtitle: '6 Connected Systems • Real-time API Webhooks',
      icon: Network,
      action: () => {
        setActiveRole(ROLES.REGISTRAR);
        setActiveTab('integrations');
        showToast('Opened Connected Systems & Integrations');
      },
    },
    {
      type: 'Academic',
      title: 'Certified Transcripts & SGPA Progression',
      subtitle: 'Permanent Academic Ledger • 104 Credits Completed',
      icon: FileText,
      action: () => {
        setActiveRole(ROLES.STUDENT);
        setActiveTab('academics');
        showToast('Opened Academic Records & Transcripts');
      },
    },
  ];

  const filtered = query.trim()
    ? catalog.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      )
    : catalog.slice(0, 6);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            placeholder="Type a student name (Aisha Sharma), course code (CS-302), faculty, fees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="hidden sm:inline-block px-2 py-1 text-[11px] font-mono text-slate-500 bg-slate-100 border border-slate-200 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No matching campus records found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    onClose?.();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-blue-50/70 transition flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center text-slate-600 group-hover:text-blue-600 transition shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-900 group-hover:text-blue-700 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-medium">
                          {item.type}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition flex items-center text-blue-600 text-xs font-medium shrink-0 ml-2">
                    <span className="hidden sm:inline mr-1">Open</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Navigation:</span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1 bg-white border rounded">↑</kbd>
              <kbd className="px-1 bg-white border rounded">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1 font-mono">
              <kbd className="px-1.5 bg-white border rounded flex items-center"><CornerDownLeft className="w-2.5 h-2.5" /></kbd> to select
            </span>
          </div>
          <span className="font-mono">Nexus Global ERP Search</span>
        </div>
      </div>
    </div>
  );
}
