import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  GraduationCap,
  Building,
  TrendingUp,
  Download,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  FileText,
  FileCheck,
  Check,
  X,
  Mail,
  Phone,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Layers,
  Network,
  Save,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';

export function RegistrarDashboard() {
  const {
    currentUser,
    registrarMetrics,
    studentDirectory,
    setSelectedStudentFor360,
    setActiveTab,
    connectedSystems,
    syncConnectedSystem,
    showToast,
  } = useApp();

  const atRiskStudents = studentDirectory.filter((s) => s.academicStatus !== 'Good Standing' || s.feeStatus === 'Due');

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#0B2341] via-[#122e54] to-[#164177] rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-medium mb-2 border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Office of the Registrar & Senate Secretariat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Welcome, {currentUser.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              {currentUser.designation} • Meridian University Administration Quad
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('student-directory')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Student Directory</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-medium transition flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Institutional Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">
            {(registrarMetrics?.totalEnrolled ?? registrarMetrics?.totalStudents ?? 14820).toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Active undergraduate & postgraduates</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">University Attendance</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">
            {registrarMetrics?.averageAttendance ?? 88.6}%
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">94% of cohort meeting 75% rule</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fee Collection</span>
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-slate-900">
            {registrarMetrics?.feeCollectionPercentage ?? registrarMetrics?.collectionRate ?? 85.3}%
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            {registrarMetrics?.totalFeesCollected || '₹18.42 Cr'} / {registrarMetrics?.totalFeesExpected || '₹21.60 Cr'}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Senate Intervention</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-2xl font-display font-bold text-amber-600">
            {registrarMetrics?.atRiskStudents ?? 68} Cases
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Shortfall notices & fee defaulters</p>
        </div>
      </div>

      {/* Directory Quick Access & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* At-Risk Students Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Urgent Senate Attention Dossiers</h2>
              <p className="text-xs text-slate-500">Students with attendance warnings or pending fees</p>
            </div>
            <button
              onClick={() => setActiveTab('student-directory')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center"
            >
              Open Full Directory <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {atRiskStudents.map((s) => (
              <div key={s.id} className="py-3.5 flex items-center justify-between hover:bg-slate-50/50 transition">
                <div className="flex items-center gap-3">
                  <img
                    src={s.avatar}
                    alt={s.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-[11px] font-mono text-slate-500">
                      {s.id} • {s.program}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-800">{s.attendance} Attd</span>
                    <div className="text-[11px] text-amber-600 font-medium">{s.academicStatus}</div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStudentFor360(s);
                      setActiveTab('student-360');
                    }}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition"
                  >
                    View 360°
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Campus Gateways */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Campus Integrations</h3>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              6 Online
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {connectedSystems.slice(0, 4).map((sys) => (
              <div key={sys.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">{sys.name}</div>
                  <div className="text-[10px] text-slate-400">Sync: {sys.lastSync}</div>
                </div>
                <button
                  onClick={() => syncConnectedSystem(sys.id)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-600 transition"
                  title="Synchronize now"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('integrations')}
            className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 transition"
          >
            Manage Connected Systems
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegistrarAnalytics() {
  const { registrarMetrics, showToast } = useApp();

  const programData = [
    { program: 'B.Tech CSE', students: 1240, avgAttd: 91.2 },
    { program: 'B.Tech ECE', students: 860, avgAttd: 87.4 },
    { program: 'B.Tech Mech', students: 620, avgAttd: 84.8 },
    { program: 'MBA Exec', students: 540, avgAttd: 93.5 },
    { program: 'MS Data Sci', students: 480, avgAttd: 90.1 },
    { program: 'BioTech', students: 380, avgAttd: 86.9 },
  ];

  const feeData = [
    { name: 'Collected', value: 85.3, color: '#2563EB' },
    { name: 'Pending', value: 14.7, color: '#E2E8F0' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Institutional Analytics & Accreditation Dossiers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            UGC, NAAC & Meridian Academic Council Accreditation Dashboards.
          </p>
        </div>
        <button
          onClick={() => showToast('Senate comprehensive analytics report generated (PDF).')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Senate Report</span>
        </button>
      </div>

      {/* Program Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            Enrollment by Major Degree Program
          </h2>
          <p className="text-xs text-slate-500 mb-4">Spring 2026 Headcount distribution across engineering & management</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="program" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B2341', borderColor: '#164177', borderRadius: 10, color: '#fff', fontSize: 12 }}
                />
                <Bar dataKey="students" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Velocity */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-1">
              Bursar Collection Efficiency
            </h3>
            <p className="text-xs text-slate-500 mb-4">Target: 95% before Midterm week</p>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-4xl font-display font-bold text-blue-600">85.3%</div>
              <p className="text-xs text-slate-500 mt-1">₹18.42 Cr collected of ₹21.60 Cr</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Tuition Recovered:</span>
              <span className="font-mono font-bold text-slate-900">₹18.42 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Uncollected Deficit:</span>
              <span className="font-mono font-bold text-amber-600">₹3.18 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Students with Dues:</span>
              <span className="font-mono font-bold text-slate-800">142</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RegistrarStudentDirectory() {
  const { studentDirectory, setSelectedStudentFor360, setActiveTab } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = studentDirectory.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.program.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'at-risk') return s.academicStatus !== 'Good Standing';
    if (filter === 'fee-due') return s.feeStatus === 'Due';
    if (filter === 'honors') return parseFloat(s.gpa) >= 3.8;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Student Master Directory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete institutional student census with instant 360° academic & bursar dossier drill-down.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or program..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs">
            {[
              { id: 'all', label: 'All Students' },
              { id: 'at-risk', label: 'Attendance Warnings' },
              { id: 'fee-due', label: 'Fee Dues' },
              { id: 'honors', label: 'Dean\'s Honors' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                  filter === t.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Student Name</th>
                <th className="px-5 py-3">Roll ID</th>
                <th className="px-5 py-3">Program</th>
                <th className="px-4 py-3">CGPA</th>
                <th className="px-4 py-3">Attendance</th>
                <th className="px-4 py-3">Bursar Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => {
                    setSelectedStudentFor360(s);
                    setActiveTab('student-360');
                  }}
                  className="hover:bg-blue-50/50 cursor-pointer transition"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatar}
                        alt={s.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <span className="font-semibold text-slate-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-slate-500">{s.id}</td>
                  <td className="px-5 py-3.5 text-slate-600">{s.program}</td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-800">{s.gpa}</td>
                  <td className="px-4 py-3.5 font-mono font-medium text-slate-700">{s.attendance}</td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        s.feeStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {s.feeStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudentFor360(s);
                        setActiveTab('student-360');
                      }}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-lg text-xs transition"
                    >
                      Open 360°
                    </button>
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

export function RegistrarStudent360() {
  const {
    selectedStudentFor360,
    studentCourses,
    studentFees,
    studentTranscript,
    showToast,
  } = useApp();

  const student = selectedStudentFor360 || {
    id: 'MU-2023-CS-0842',
    name: 'Aisha Sharma',
    program: 'B.Tech Computer Science & Engineering',
    semester: 'Semester VI',
    gpa: '3.88',
    attendance: '91.4%',
    feeStatus: 'Due (₹65,000)',
    academicStatus: 'Good Standing',
    advisor: 'Prof. Raghav Iyer',
    email: 'aisha.sharma@meridian.edu',
    phone: '+91 98765 43210',
    hostel: 'Kaveri Hall (Block B, Room 304)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  };

  return (
    <div className="space-y-6">
      {/* Student 360 Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-100 shadow-sm"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-mono font-bold uppercase mb-1 border border-blue-200">
                <span>Verified Campus Dossier</span>
              </div>
              <h1 className="text-2xl font-display font-bold text-slate-900">{student.name}</h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {student.id} • {student.program} • {student.semester || 'Semester VI'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => showToast(`Generated official transcript seal for ${student.name} (PDF).`)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Issue Official Transcript</span>
            </button>
            <button
              onClick={() => showToast(`Sent formal academic advisory notification to ${student.name}.`)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition border border-slate-200"
            >
              Send Notice
            </button>
          </div>
        </div>

        {/* Snapshot metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Academic Advisor:</span>
            <span className="font-semibold text-slate-800">{student.advisor}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Institutional Email:</span>
            <span className="font-mono text-slate-700">{student.email}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Campus Hostel:</span>
            <span className="text-slate-800">{student.hostel}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Emergency Contact:</span>
            <span className="font-mono text-slate-700">{student.phone}</span>
          </div>
        </div>
      </div>

      {/* Triad: Academic Standing, Attendance, Bursar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Academic Standing */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Academic Standing</h3>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              CGPA: {student.gpa}
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Degree Status:</span>
              <span className="font-semibold text-emerald-700">{student.academicStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Credits Completed:</span>
              <span className="font-mono font-bold text-slate-800">104 / 140 Credits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Senate Classification:</span>
              <span className="font-medium text-slate-800">Dean&apos;s Honor List</span>
            </div>
          </div>
        </div>

        {/* Biometric Attendance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Biometric Attendance</h3>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {student.attendance}
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Exam Eligibility:</span>
              <span className="font-semibold text-emerald-700">Fully Qualified (75%+)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hall Ticket Status:</span>
              <span className="text-slate-800 font-medium">Cleared for Generation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Flagged Courses:</span>
              <span className="font-mono font-bold text-slate-800">0 of 6 Courses</span>
            </div>
          </div>
        </div>

        {/* Bursar Account */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Bursar Account</h3>
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              {(studentFees?.currentSemester?.outstanding ?? 0) > 0 ? `₹${(studentFees?.currentSemester?.outstanding ?? 0).toLocaleString()} Due` : 'Paid'}
            </span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Paid to Date:</span>
              <span className="font-mono font-bold text-slate-800">₹{(studentFees?.currentSemester?.paidAmount ?? 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Due Date:</span>
              <span className="font-mono text-slate-600">{studentFees.currentSemester.dueDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Scholarship Aid:</span>
              <span className="font-medium text-blue-700">Merit Merit-cum-Means 15%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Enrolled Course Dossier</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Faculty Instructor</th>
                <th className="px-4 py-3">Credits</th>
                <th className="px-4 py-3">Attended / Total</th>
                <th className="px-4 py-3 text-right">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentCourses.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-semibold text-slate-900">{c.code}: {c.name}</td>
                  <td className="px-4 py-3 text-slate-600">{c.instructor}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{c.credits}</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{c.attended} / {c.total}</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-blue-700">{c.attendancePercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function RegistrarIntegrations() {
  const { connectedSystems, syncConnectedSystem, showToast } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
            Connected Systems & Data Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enterprise integrations connecting Canvas LMS, Koha Library, RFID Turnstiles, SBI Payment Gateways, and DigiLocker.
          </p>
        </div>
        <button
          onClick={() => {
            connectedSystems.forEach((s) => syncConnectedSystem(s.id));
            showToast('Synchronized all 6 connected university systems.');
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync All Connectors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectedSystems.map((sys) => (
          <div key={sys.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">{sys.name}</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {sys.status}
              </span>
            </div>

            <p className="text-xs text-slate-500">{sys.description}</p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Last Sync: {sys.lastSync}</span>
              <button
                onClick={() => syncConnectedSystem(sys.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Sync Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RegistrarSettings() {
  const { showToast } = useApp();
  const [params, setParams] = useState({
    attendanceThreshold: 75,
    probationGpa: 2.0,
    lateFeeDaily: 100,
    examRegistrationDeadline: '2026-10-15',
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Senate academic regulations and threshold parameters saved.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
          Senate Regulations & Academic Governance
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure statutory attendance thresholds, probation rules, and bursar payment penalty policies.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs max-w-2xl">
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Statutory Attendance Qualification Threshold (%)
            </label>
            <input
              type="number"
              value={params.attendanceThreshold}
              onChange={(e) => setParams({ ...params, attendanceThreshold: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 font-mono"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">Students below this threshold cannot download exam hall tickets.</span>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Academic Probation SGPA Cutoff
            </label>
            <input
              type="number"
              step="0.1"
              value={params.probationGpa}
              onChange={(e) => setParams({ ...params, probationGpa: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">
              Daily Late Fee Penalty (₹)
            </label>
            <input
              type="number"
              value={params.lateFeeDaily}
              onChange={(e) => setParams({ ...params, lateFeeDaily: e.target.value })}
              className="w-full border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Governance Policies</span>
          </button>
        </form>
      </div>
    </div>
  );
}
