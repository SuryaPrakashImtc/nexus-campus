import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  GraduationCap,
  Calendar,
  Clock,
  MapPin,
  Download,
  Send,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileText,
  FileCheck,
  QrCode,
  ArrowUpRight,
  TrendingUp,
  X,
  Building,
  User,
  Phone,
  Mail,
  Save,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';

export function StudentDashboard() {
  const {
    currentUser,
    studentCourses,
    studentFees,
    setActiveTab,
    showToast,
  } = useApp();

  const totalClassesAttended = studentCourses.reduce((sum, c) => sum + c.attended, 0);
  const totalClassesHeld = studentCourses.reduce((sum, c) => sum + c.total, 0);
  const overallCalc = ((totalClassesAttended / totalClassesHeld) * 100).toFixed(1);
  const totalSafeLeaves = studentCourses.reduce((sum, c) => sum + (c.safeLeaves || 0), 0);

  const hasOutstanding = studentFees.currentSemester.outstanding > 0;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2341] via-[#103058] to-[#164177] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium mb-2 border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Spring 2026 Academic Session • Semester VI</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {currentUser.program} • Roll: <span className="font-mono text-blue-200">{currentUser.id}</span> • Advisor: {currentUser.advisor}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('timetable')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>View Timetable</span>
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-medium transition flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Fee Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-slate-900">
              {currentUser.attendance || `${overallCalc}%`}
            </span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              Statutory 75% OK
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            {totalClassesAttended} of {totalClassesHeld} lectures • <span className="text-blue-600 font-medium">{totalSafeLeaves} Safe Leaves left</span>
          </div>
        </div>

        {/* CGPA Card */}
        <div
          onClick={() => setActiveTab('academics')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cumulative GPA</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-slate-900">{currentUser.cgpa}</span>
            <span className="text-xs font-semibold text-purple-600 font-mono">SGPA: {currentUser.sgpa}</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Dean&apos;s Honor Roll • Rank: Top 3% in CSE
          </p>
        </div>

        {/* Degree Credits Card */}
        <div
          onClick={() => setActiveTab('academics')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 cursor-pointer transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Degree Credits</span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-display font-bold text-slate-900">{currentUser.creditsCompleted}</span>
            <span className="text-xs text-slate-400 font-mono">/ {currentUser.totalCredits}</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-1.5 rounded-full"
              style={{ width: `${(currentUser.creditsCompleted / currentUser.totalCredits) * 100}%` }}
            />
          </div>
        </div>

        {/* Tuition Fee Balance Card */}
        <div
          onClick={() => setActiveTab('fees')}
          className={`p-5 rounded-2xl border transition cursor-pointer ${
            hasOutstanding
              ? 'bg-white border-amber-200 hover:border-amber-300 shadow-2xs'
              : 'bg-emerald-50/50 border-emerald-200 hover:border-emerald-300 shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tuition Balance</span>
            <span className={`p-2 rounded-xl ${hasOutstanding ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className={`text-2xl font-display font-bold ${hasOutstanding ? 'text-amber-700' : 'text-emerald-700'}`}>
              {hasOutstanding ? `₹${(studentFees?.currentSemester?.outstanding ?? 0).toLocaleString()}` : '₹0 (All Clear)'}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {hasOutstanding ? `Due by ${studentFees.currentSemester.dueDate}` : 'Spring 2026 Fully Settled'}
          </p>
        </div>
      </div>

      {/* Main Grid: Enrolled Courses & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Active Courses & Attendance Tracking */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Enrolled Courses & Live Attendance</h2>
              <p className="text-xs text-slate-500 mt-0.5">Continuous attendance synchronization with biometrics</p>
            </div>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center"
            >
              Detailed Breakdown <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {studentCourses.map((c) => (
              <div key={c.code} className="p-4 sm:p-5 hover:bg-slate-50/70 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {c.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-900">{c.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {c.instructor} • {c.room} • {c.schedule}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-slate-900">{c.attendancePercent}%</div>
                      <div className="text-[11px] text-slate-400">{c.attended}/{c.total} classes</div>
                    </div>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-1 rounded-full ${
                        c.attendancePercent >= 90
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : c.attendancePercent >= 75
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {c.safeLeaves} Safe Leaves
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      c.attendancePercent >= 90 ? 'bg-emerald-500' : c.attendancePercent >= 75 ? 'bg-blue-600' : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(100, c.attendancePercent)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Links & Today's Schedule preview */}
        <div className="space-y-6">
          {/* Today's Schedule Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-semibold text-slate-900">Today&apos;s Lectures</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Wednesday
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100/80">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-700">10:00 - 11:30 AM</span>
                  <span className="text-[10px] font-semibold text-blue-600 uppercase">Core Lecture</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 mt-1">CS-302: Distributed Systems</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Prof. Raghav Iyer • Aryabhata 304</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-700">11:45 AM - 01:15 PM</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Core</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 mt-1">AI-280: Deep Learning & Neural Nets</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Dr. Sarah Lin • Turing Lab 102</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-slate-700">02:30 - 04:00 PM</span>
                  <span className="text-[10px] font-semibold text-slate-500 uppercase">Advising</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 mt-1">Faculty Mentorship & Office Hours</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Prof. Raghav Iyer • Aryabhata 412</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('timetable')}
              className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition"
            >
              View Full Week Schedule
            </button>
          </div>

          {/* Institutional Compliance Notice */}
          <div className="bg-[#0B2341] text-white p-5 rounded-2xl shadow-lg border border-blue-900/30 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-200">
                Statutory Exam Clearance
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              All courses currently meet the mandatory UGC & Meridian 75% attendance threshold. Hall ticket generation status: <strong>Eligible</strong>.
            </p>
            <button
              onClick={() => showToast('Hall ticket pre-validation verified for Spring 2026.')}
              className="w-full py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-medium border border-white/20 transition"
            >
              Verify Exam Hall Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StudentAttendance() {
  const { studentCourses, currentUser, showToast } = useApp();
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    course: 'CS-302',
    date: '2026-09-20',
    type: 'Academic Event (Hackathon)',
    reason: '',
  });

  const totalClassesAttended = studentCourses.reduce((sum, c) => sum + c.attended, 0);
  const totalClassesHeld = studentCourses.reduce((sum, c) => sum + c.total, 0);
  const overallCalc = ((totalClassesAttended / totalClassesHeld) * 100).toFixed(1);

  const handleApplyLeave = (e) => {
    e.preventDefault();
    setShowLeaveModal(false);
    showToast(`Leave application submitted for ${leaveForm.course}. Under review by ${currentUser.advisor}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Attendance & Safe Leaves Monitor
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Subject-wise attendance tracking, RFID turnstile logs, and statutory exam qualification rules.
          </p>
        </div>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-4 h-4" />
          <span>Apply for Authorized Leave</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Attendance</div>
          <div className="mt-2 text-3xl font-display font-bold text-blue-600">{overallCalc}%</div>
          <p className="mt-1 text-[11px] text-slate-500">{totalClassesAttended} of {totalClassesHeld} Total Sessions</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Statutory Threshold</div>
          <div className="mt-2 text-3xl font-display font-bold text-slate-900">75.0%</div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">Safe Margin: +{(overallCalc - 75.0).toFixed(1)}% above minimum</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Combined Safe Leaves</div>
          <div className="mt-2 text-3xl font-display font-bold text-emerald-600">
            {studentCourses.reduce((acc, c) => acc + (c.safeLeaves || 0), 0)} Classes
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Allowed absences before falling below 75%</p>
        </div>
      </div>

      {/* Subject-Wise Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Course-by-Course Attendance Matrix</h2>
          <span className="text-xs font-mono text-slate-400">Meridian Biometric IoT Connected</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3.5">Course Code & Name</th>
                <th className="px-5 py-3.5">Instructor</th>
                <th className="px-5 py-3.5">Attended / Held</th>
                <th className="px-5 py-3.5">Percentage</th>
                <th className="px-5 py-3.5">Safe Leaves Left</th>
                <th className="px-5 py-3.5 text-right">Exam Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {studentCourses.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-4">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="font-mono text-[11px] text-blue-600 font-bold">{c.code} • {c.credits} Credits</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{c.instructor}</td>
                  <td className="px-5 py-4 font-mono text-slate-700">
                    {c.attended} / {c.total} classes
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{c.attendancePercent}%</span>
                      <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${
                            c.attendancePercent >= 90 ? 'bg-emerald-500' : c.attendancePercent >= 75 ? 'bg-blue-600' : 'bg-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, c.attendancePercent)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                      {c.safeLeaves} lectures
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        c.attendancePercent >= 75
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {c.attendancePercent >= 75 ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-3.5 h-3.5" /> Shortfall Notice
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Official Student Leave Petition</h3>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Affected Course</label>
                <select
                  value={leaveForm.course}
                  onChange={(e) => setLeaveForm({ ...leaveForm, course: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {studentCourses.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}: {c.name} ({c.instructor})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Leave Date</label>
                  <input
                    type="date"
                    value={leaveForm.date}
                    onChange={(e) => setLeaveForm({ ...leaveForm, date: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm({ ...leaveForm, type: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Academic Event (Hackathon)">Academic Hackathon / Conference</option>
                    <option value="Medical Exemption">Medical Exemption</option>
                    <option value="Inter-Collegiate Sports">Inter-Collegiate Sports</option>
                    <option value="Family / Personal">Family Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Justification & Academic Impact</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Explain reason for absence and how course deliverables will be caught up..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-[11px]">
                Leaves verified by faculty mentors are credited as <strong>Excused Attendance</strong> under Meridian University Academic Regulations 2025.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-600/20"
                >
                  Submit Petition to Advisor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function StudentFees() {
  const { studentFees, payOutstandingFee, showToast } = useApp();
  const [showPayModal, setShowPayModal] = useState(false);
  const [payMethod, setPayMethod] = useState('Campus NetBanking (SBI)');
  const [isProcessing, setIsProcessing] = useState(false);

  const { currentSemester, history } = studentFees;
  const isPaidInFull = currentSemester.outstanding === 0;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowPayModal(false);
      payOutstandingFee(currentSemester.outstanding, payMethod);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Tuition Ledger & Bursar Accounts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Official fee statements in INR (₹), online payment gateway, and verified tax receipts.
          </p>
        </div>
        {!isPaidInFull ? (
          <button
            onClick={() => setShowPayModal(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition flex items-center gap-2 shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Outstanding ₹{currentSemester.outstanding.toLocaleString()}</span>
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Spring 2026 Fully Paid</span>
          </div>
        )}
      </div>

      {/* Ledger Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Semester Payable</div>
          <div className="mt-2 text-2xl font-display font-bold text-slate-900 font-mono">
            ₹{currentSemester.totalPayable.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Semester VI Academic Session</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Amount Cleared</div>
          <div className="mt-2 text-2xl font-display font-bold text-emerald-600 font-mono">
            ₹{currentSemester.paidAmount.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">Reconciled via Campus Gateway</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Remaining Balance</div>
          <div
            className={`mt-2 text-2xl font-display font-bold font-mono ${
              isPaidInFull ? 'text-emerald-700' : 'text-amber-600'
            }`}
          >
            {isPaidInFull ? '₹0' : `₹${currentSemester.outstanding.toLocaleString()}`}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {isPaidInFull ? 'Zero dues on student account' : `Due date: ${currentSemester.dueDate}`}
          </p>
        </div>
      </div>

      {/* Breakdown and Payment History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Itemized Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h2 className="text-sm font-semibold text-slate-900">Current Semester Fee Breakdown</h2>
            <span className="text-xs font-mono text-slate-400">{currentSemester.term}</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {currentSemester.breakdown.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-medium text-slate-800">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-slate-900">
                    ₹{item.amount.toLocaleString()}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h2 className="text-sm font-semibold text-slate-900">Receipts & Cleared Transactions</h2>
            <span className="text-xs font-mono text-slate-400">Official Bursar Invoices</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {history.map((h, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-600">{h.receipt}</span>
                    <span className="text-slate-500">• {h.date}</span>
                  </div>
                  <div className="text-slate-800 mt-0.5">{h.term}</div>
                  <div className="text-[11px] text-slate-400">{h.method}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900">₹{h.amount.toLocaleString()}</div>
                  <button
                    onClick={() => showToast(`Downloaded certified receipt ${h.receipt} (PDF).`)}
                    className="mt-1 text-[11px] text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-auto"
                  >
                    <Download className="w-3 h-3" />
                    <span>Receipt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  ₹
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Campus Bursar Gateway</h3>
                  <p className="text-xs text-slate-500">Meridian University Online Payment</p>
                </div>
              </div>
              <button
                onClick={() => setShowPayModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">Amount Due:</span>
                <div className="text-xl font-mono font-bold text-slate-900 mt-0.5">
                  ₹{currentSemester.outstanding.toLocaleString()}
                </div>
              </div>
              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200">
                Installment 2
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-semibold text-slate-700 block">Select Payment Channel</label>
              {[
                { id: 'Campus NetBanking (SBI)', label: 'State Bank of India (Campus Branch)' },
                { id: 'UPI / QR Code', label: 'Instant UPI (Google Pay, PhonePe, Paytm)' },
                { id: 'HDFC Corporate NetBanking', label: 'HDFC / ICICI NetBanking' },
                { id: 'Meridian SmartCampus Card', label: 'Meridian Student SmartCard Wallet' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    payMethod === opt.id
                      ? 'border-blue-600 bg-blue-50/40 font-semibold text-blue-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="payMethod"
                    checked={payMethod === opt.id}
                    onChange={() => setPayMethod(opt.id)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800">
              Instant reconciliation: Bursar ledger and hall ticket eligibility will update in real-time.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowPayModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={handleConfirmPayment}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center gap-2"
              >
                {isProcessing ? 'Authorizing Payment...' : `Confirm & Pay ₹${currentSemester.outstanding.toLocaleString()}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function StudentTimetable() {
  const { timetable, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const daySchedule = timetable[selectedDay] || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Weekly Lecture Timetable
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Section A • Academic Block Room Allocations & Lab Schedules.
          </p>
        </div>
        <button
          onClick={() => showToast('Weekly timetable synchronized to your Google / Outlook Calendar.')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200 shrink-0"
        >
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Sync to Calendar (.ics)</span>
        </button>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              selectedDay === day
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {daySchedule.map((slot, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition shadow-2xs ${
              slot.type === 'Break'
                ? 'bg-slate-50 border-dashed border-slate-200'
                : 'bg-white border-slate-200 hover:border-blue-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {slot.time}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                {slot.type}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900 mt-3">{slot.name}</h3>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {slot.room}
              </span>
              <span className="text-slate-600 font-medium">{slot.instructor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StudentAcademics() {
  const { studentTranscript, showToast } = useApp();

  const gpaData = [
    { sem: 'Sem I', sgpa: 3.75, cgpa: 3.75 },
    { sem: 'Sem II', sgpa: 3.82, cgpa: 3.79 },
    { sem: 'Sem III', sgpa: 3.90, cgpa: 3.83 },
    { sem: 'Sem IV', sgpa: 3.95, cgpa: 3.86 },
    { sem: 'Sem V', sgpa: 3.96, cgpa: 3.88 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Academic Records & Certified Transcript
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Permanent academic dossier authenticated by Office of the Registrar, Meridian University.
          </p>
        </div>
        <button
          onClick={() => showToast('Official certified transcript downloaded (PDF) with Registrar digital seal.')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Certified Transcript</span>
        </button>
      </div>

      {/* GPA Progression Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Semester SGPA & Cumulative CGPA Trajectory</h2>
            <p className="text-xs text-slate-500">Graduation Target: 3.90+ Magna Cum Laude</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> SGPA
            </span>
            <span className="flex items-center gap-1.5 text-purple-600">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" /> CGPA
            </span>
          </div>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={gpaData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="sem" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[3.5, 4.0]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0B2341', borderColor: '#164177', borderRadius: 10, color: '#fff', fontSize: 12 }}
              />
              <Line type="monotone" dataKey="sgpa" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="cgpa" stroke="#9333EA" strokeWidth={2} dot={{ r: 3 }} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Semester by Semester Transcript */}
      <div className="space-y-4">
        {studentTranscript.map((term, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-xs text-slate-900">{term.sem}</span>
                <span className="text-[11px] font-mono text-slate-500">{term.credits} Credits</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  SGPA: {term.sgpa}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {term.status}
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-sans">
              {term.courses.map((c, cIdx) => (
                <div key={cIdx} className="p-3.5 px-5 flex items-center justify-between hover:bg-slate-50/50 transition">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-slate-600 mr-2">{c.code}</span>
                    <span className="font-medium text-slate-900">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400 font-mono text-[11px]">{c.credits} Credits</span>
                    <span className="w-8 text-right font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                      {c.grade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StudentSettings() {
  const { currentUser, updateProfile, ROLES } = useApp();
  const [formData, setFormData] = useState({
    phone: currentUser.phone || '',
    emergencyContact: currentUser.emergencyContact || '',
    hostel: currentUser.hostel || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(ROLES.STUDENT, formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
          Student Profile & Campus Settings
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review academic enrollment parameters, update contact details, and inspect compliance terms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-blue-100"
          />
          <div>
            <h2 className="text-base font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs font-mono text-blue-600 mt-0.5">{currentUser.id}</p>
            <p className="text-xs text-slate-500 mt-1">{currentUser.program}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-xs text-left space-y-2">
            <div>
              <span className="text-slate-400 text-[11px] block">Academic Advisor:</span>
              <span className="font-semibold text-slate-800">{currentUser.advisor}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Campus Email:</span>
              <span className="font-mono text-slate-700">{currentUser.email}</span>
            </div>
          </div>
        </div>

        {/* Edit Contact Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Contact & Residential Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Student Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Campus Hostel / Residential Quad</label>
              <input
                type="text"
                value={formData.hostel}
                onChange={(e) => setFormData({ ...formData, hostel: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Parent / Emergency Guardian Contact</label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Contact Updates</span>
            </button>
          </form>

          {/* Legal & Terms Preview */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Meridian University Honor Code & Regulations
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              By using Nexus Campus, students agree to adhere to Meridian Academic Integrity Standard 4.1. Unauthorized attendance proxying or grade tampering is strictly prohibited and governed by the University Disciplinary Senate.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
