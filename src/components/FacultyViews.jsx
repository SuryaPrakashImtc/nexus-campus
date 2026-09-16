import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Award,
  BookOpen,
  Calendar,
  Save,
  Download,
  AlertCircle,
  FileCheck,
  MapPin,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  Send,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function FacultyDashboard() {
  const {
    currentUser,
    setActiveTab,
    facultyRoster,
    facultyGradebook,
    showToast,
  } = useApp();

  const atRiskInCohort = facultyRoster.filter((s) => s.status === 'Absent' || parseFloat(s.overall) < 80);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B2341] via-[#122e54] to-[#1a4478] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium mb-2 border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Faculty Academic Portal • Spring 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {currentUser.designation} • {currentUser.department} • {currentUser.office}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('attendance-marking')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Attendance</span>
            </button>
            <button
              onClick={() => setActiveTab('gradebook')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-medium transition flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Open Gradebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Courses</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">3 Courses</div>
          <p className="mt-1 text-[11px] text-slate-500">CS-302, CS-401, CS-590</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">174 Students</div>
          <p className="mt-1 text-[11px] text-slate-500">3 Undergraduate & MS cohorts</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cohort Attendance</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">92.4%</div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">Above department average (88%)</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Students Attention</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-amber-600">
            {atRiskInCohort.length} Students
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Attendance shortfall or missing scores</p>
        </div>
      </div>

      {/* Today's Classes & Students Requiring Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Teaching Sessions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Today&apos;s Lecture & Lab Schedule</h2>
              <p className="text-xs text-slate-500">Spring 2026 • Timetable Slots</p>
            </div>
            <button
              onClick={() => setActiveTab('today-classes')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center"
            >
              Full Calendar <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    10:00 - 11:30 AM
                  </span>
                  <span className="font-semibold text-xs text-slate-900">
                    CS-302: Distributed Systems (Sec A)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Aryabhata Block 304 • 64 Students Enrolled
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('attendance-marking')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                >
                  Mark Attendance
                </button>
                <button
                  onClick={() => setActiveTab('gradebook')}
                  className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition"
                >
                  Gradebook
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
                    02:00 - 04:00 PM
                  </span>
                  <span className="font-semibold text-xs text-slate-900">
                    Office Hours & Student Academic Mentorship
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> Faculty Office, Aryabhata 412
                </p>
              </div>

              <button
                onClick={() => showToast('Advising appointment slots booked for today: 4 students.')}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition shrink-0"
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>

        {/* Students Requiring Attention */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Attendance Watchlist</h3>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {atRiskInCohort.length} flagged
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {atRiskInCohort.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-[11px] font-mono text-slate-400">{s.roll}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-rose-600">{s.overall}</span>
                  <div className="text-[10px] text-slate-400 mt-0.5">Below 75% limit</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('student-list')}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition"
          >
            Review Complete Cohort Roster
          </button>
        </div>
      </div>
    </div>
  );
}

export function FacultyAttendanceMarking() {
  const { facultyRoster, saveAttendanceRoster, showToast } = useApp();
  const [selectedCourse, setSelectedCourse] = useState('CS-302');
  const [sessionDate, setSessionDate] = useState('2026-09-15');
  const [roster, setRoster] = useState(facultyRoster);

  const markStatus = (id, status) => {
    setRoster((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const markAll = (status) => {
    setRoster((prev) => prev.map((s) => ({ ...s, status })));
    showToast(`Marked all students as ${status}.`);
  };

  const handleSave = () => {
    saveAttendanceRoster(roster, selectedCourse);
  };

  const presentCount = roster.filter((s) => s.status === 'Present').length;
  const absentCount = roster.filter((s) => s.status === 'Absent').length;
  const lateCount = roster.filter((s) => s.status === 'Late').length;
  const excusedCount = roster.filter((s) => s.status === 'Excused').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Lecture Attendance Workflow
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time biometric cross-verification for Meridian University students.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => markAll('Present')}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* Control bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <label className="font-semibold text-slate-700">Course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="CS-302">CS-302: Distributed Systems (Sec A)</option>
            <option value="CS-401">CS-401: Advanced Storage Internals</option>
            <option value="CS-590">CS-590: Graduate Cloud Computing Seminar</option>
          </select>

          <span className="text-slate-300">|</span>

          <label className="font-semibold text-slate-700">Date:</label>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <span className="text-slate-300">|</span>
          <span className="text-slate-600">Lecture: <strong>Session #36 (10:00 AM)</strong></span>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-bold border border-emerald-200">
            Present: {presentCount}
          </span>
          <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg font-bold border border-rose-200">
            Absent: {absentCount}
          </span>
          <span className="px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg font-bold border border-amber-200">
            Late: {lateCount}
          </span>
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg font-bold border border-indigo-200">
            Excused: {excusedCount}
          </span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Roll ID</th>
                <th className="px-5 py-3">Program</th>
                <th className="px-5 py-3">Overall Attendance</th>
                <th className="px-5 py-3 text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {roster.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{student.roll}</td>
                  <td className="px-5 py-3.5 text-slate-600">{student.program}</td>
                  <td className="px-5 py-3.5 font-mono font-medium text-slate-700">{student.overall}</td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="inline-flex items-center rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                      {['Present', 'Late', 'Absent', 'Excused'].map((status) => {
                        const isSelected = student.status === status;
                        let activeColor = 'bg-blue-600 text-white';
                        if (status === 'Present') activeColor = 'bg-emerald-600 text-white shadow-xs';
                        if (status === 'Absent') activeColor = 'bg-rose-600 text-white shadow-xs';
                        if (status === 'Late') activeColor = 'bg-amber-500 text-white shadow-xs';
                        if (status === 'Excused') activeColor = 'bg-indigo-600 text-white shadow-xs';

                        return (
                          <button
                            key={status}
                            onClick={() => markStatus(student.id, status)}
                            className={`px-3 py-1 text-[11px] font-medium rounded-md transition ${
                              isSelected ? activeColor : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function FacultyGradebook() {
  const { facultyGradebook, saveGradebook, showToast } = useApp();
  const [grades, setGrades] = useState(facultyGradebook);
  const [hasUnsaved, setHasUnsaved] = useState(false);

  const calculateGrade = (total) => {
    if (total >= 95) return 'A+';
    if (total >= 90) return 'A';
    if (total >= 85) return 'A-';
    if (total >= 80) return 'B+';
    if (total >= 75) return 'B';
    if (total >= 70) return 'B-';
    if (total >= 65) return 'C+';
    if (total >= 60) return 'C';
    return 'F';
  };

  const handleScoreChange = (id, field, value) => {
    const num = Math.max(0, parseFloat(value) || 0);
    setGrades(
      grades.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: num };
          const total = updated.midterm + updated.quiz + updated.project + updated.lab;
          updated.total = parseFloat(total.toFixed(1));
          updated.grade = calculateGrade(updated.total);
          return updated;
        }
        return item;
      })
    );
    setHasUnsaved(true);
  };

  const handleSave = () => {
    saveGradebook(grades, 'CS-302');
    setHasUnsaved(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            CS-302 Course Gradebook & Continuous Assessment
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Section A • Distributed Systems • Weightings: Midterm (30%), Quiz/HW (15%), Term Project (40%), Lab Practicum (15%)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Gradebook exported as Meridian_CS302_Spring2026.csv')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{hasUnsaved ? 'Save Grades *' : 'Save Grades'}</span>
          </button>
        </div>
      </div>

      {/* Grade Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Roll ID</th>
                <th className="px-4 py-3">Midterm (30)</th>
                <th className="px-4 py-3">Quiz / HW (15)</th>
                <th className="px-4 py-3">Term Project (40)</th>
                <th className="px-4 py-3">Lab Exam (15)</th>
                <th className="px-4 py-3">Total (100)</th>
                <th className="px-5 py-3 text-right">Letter Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {grades.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3 font-sans font-semibold text-slate-900">{row.name}</td>
                  <td className="px-5 py-3 text-slate-500 text-[11px]">{row.roll}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.5"
                      value={row.midterm}
                      onChange={(e) => handleScoreChange(row.id, 'midterm', e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.5"
                      value={row.quiz}
                      onChange={(e) => handleScoreChange(row.id, 'quiz', e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.5"
                      value={row.project}
                      onChange={(e) => handleScoreChange(row.id, 'project', e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      step="0.5"
                      value={row.lab}
                      onChange={(e) => handleScoreChange(row.id, 'lab', e.target.value)}
                      className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-900">{row.total}</td>
                  <td className="px-5 py-3 text-right">
                    <span className="px-2.5 py-1 rounded font-bold text-xs bg-blue-50 text-blue-700">
                      {row.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function FacultyTodayClasses() {
  const { setActiveTab, showToast } = useApp();

  const sessions = [
    {
      time: '10:00 - 11:30 AM',
      code: 'CS-302',
      name: 'Distributed Systems & Cloud Architecture',
      room: 'Aryabhata Block 304',
      enrolled: 64,
      status: 'Live Now',
      type: 'Core Lecture',
    },
    {
      time: '02:00 - 04:00 PM',
      code: 'ADV-01',
      name: 'Student Office Hours & Academic Advising',
      room: 'Faculty Office, Aryabhata 412',
      enrolled: 4,
      status: 'Scheduled',
      type: 'Advising',
    },
    {
      time: '04:15 - 05:45 PM',
      code: 'CS-590',
      name: 'Advanced Distributed Consensus (MS Cohort)',
      room: 'Seminar Pod 2B',
      enrolled: 18,
      status: 'Scheduled',
      type: 'Graduate Seminar',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Today&apos;s Lectures & Academic Engagements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Prof. Raghav Iyer • Computer Science & Engineering • Wednesday Schedule
          </p>
        </div>
        <button
          onClick={() => showToast('Teaching log synchronized to Meridian LMS.')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
        >
          <Calendar className="w-4 h-4" />
          <span>Sync Session Logs</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sessions.map((s, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                {s.time}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {s.status}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-900">{s.name}</h3>

            <div className="space-y-1 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {s.room}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" /> {s.enrolled} Students
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => setActiveTab('attendance-marking')}
                className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition"
              >
                Mark Attendance
              </button>
              <button
                onClick={() => setActiveTab('gradebook')}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition"
              >
                Grades
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FacultyStudentList() {
  const { facultyRoster, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = facultyRoster.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            CS-302 Enrolled Student Cohort
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Section A Roster • Advisor Dossiers & Attendance Streaks
          </p>
        </div>
        <button
          onClick={() => showToast('Student roster exported to Excel (.xlsx).')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 border border-slate-200"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Roster</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search cohort by name or roll number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Roll ID</th>
                <th className="px-5 py-3">Program</th>
                <th className="px-5 py-3">Overall Attendance</th>
                <th className="px-5 py-3">Consecutive Streak</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{s.roll}</td>
                  <td className="px-5 py-3.5 text-slate-600">{s.program}</td>
                  <td className="px-5 py-3.5 font-mono font-medium text-slate-800">{s.overall}</td>
                  <td className="px-5 py-3.5 text-slate-600">{s.streak} lectures</td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Dossier Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Student Academic Profile</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-12 h-12 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedStudent.name}</h4>
                <p className="text-xs font-mono text-blue-600">{selectedStudent.roll}</p>
                <p className="text-[11px] text-slate-500">{selectedStudent.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Overall Attendance:</span>
                <span className="font-mono font-bold text-slate-900">{selectedStudent.overall}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Current Session Status:</span>
                <span className="font-semibold text-blue-700">{selectedStudent.status}</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-500">Consecutive Streak:</span>
                <span className="font-medium text-slate-800">{selectedStudent.streak} lectures</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast(`Advisory message emailed to ${selectedStudent.name}.`);
                  setSelectedStudent(null);
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20"
              >
                Send Faculty Mentorship Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function FacultySettings() {
  const { currentUser, updateProfile, ROLES } = useApp();
  const [formData, setFormData] = useState({
    officeHours: currentUser.officeHours || '',
    phone: currentUser.phone || '',
    office: currentUser.office || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(ROLES.FACULTY, formData);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
          Faculty Profile & Office Hours
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Update your student consultation hours and academic department credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs text-center space-y-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-blue-100"
          />
          <div>
            <h2 className="text-base font-bold text-slate-900">{currentUser.name}</h2>
            <p className="text-xs font-mono text-blue-600 mt-0.5">{currentUser.id}</p>
            <p className="text-xs text-slate-500 mt-1">{currentUser.designation}</p>
          </div>
          <div className="pt-3 border-t border-slate-100 text-xs text-left space-y-2">
            <div>
              <span className="text-slate-400 text-[11px] block">Highest Qualification:</span>
              <span className="font-semibold text-slate-800">{currentUser.qualification}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px] block">Faculty Email:</span>
              <span className="font-mono text-slate-700">{currentUser.email}</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Advising & Office Parameters
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Weekly Office Hours for Advising</label>
              <input
                type="text"
                value={formData.officeHours}
                onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Faculty Room / Office Location</label>
              <input
                type="text"
                value={formData.office}
                onChange={(e) => setFormData({ ...formData, office: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Faculty Intercom / Direct Line</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Faculty Profile</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
