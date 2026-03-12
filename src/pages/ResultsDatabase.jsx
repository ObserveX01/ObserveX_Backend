import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { BarChart2, Star, Users, BookOpen, X, Mail, Calendar, CheckCircle } from "lucide-react";

const ResultsDatabase = () => {
  const [data, setData] = useState([]); // গ্রাফ এবং কার্ডের ডাটা
  const [allResults, setAllResults] = useState([]); // সব রিল্ট ডাটাবেস থেকে
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // ক্লিক করা টিচারের জন্য স্টেট

  useEffect(() => {
    // --- ১. ডাটা ফেচ এবং প্রসেসিং লজিক (আপনার অরিজিনাল কোড) ---
    fetch("http://localhost:5142/api/results/all")
      .then((res) => res.json())
      .then((results) => {
        setAllResults(results); // অরিজিনাল ডাটা সেভ রাখা হচ্ছে

        const teacherStats = {};
        results.forEach((r) => {
          if (!teacherStats[r.teacherName]) {
            teacherStats[r.teacherName] = { name: r.teacherName, totalScore: 0, count: 0, students: new Set() };
          }
          teacherStats[r.teacherName].totalScore += r.percentage;
          teacherStats[r.teacherName].count += 1;
          teacherStats[r.teacherName].students.add(r.studentEmail);
        });

        const chartData = Object.values(teacherStats).map((t) => ({
          name: t.name,
          avgScore: Math.round(t.totalScore / t.count),
          studentCount: t.students.size,
          rating: (t.totalScore / t.count / 20).toFixed(1),
        }));

        setData(chartData);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching admin data:", err));

    // --- ২. ব্যাক বাটন ট্র্যাপ লজিক (নতুন সংযোজন) ---
    // ব্রাউজারের হিস্ট্রি স্ট্যাকে একটি ফেক স্টেট পুশ করা
    window.history.pushState(null, null, window.location.href);

    const handleBackButton = (event) => {
      // ইউজার যখনই ব্যাক বাটন চাপবে, তাকে জোর করে আবার এই বর্তমান পেজেই ফিরিয়ে আনা হবে
      window.history.pushState(null, null, window.location.href);
    };

    // পপ-স্টেট ইভেন্ট লিসেন করা
    window.addEventListener("popstate", handleBackButton);

    // কম্পোনেন্ট আনমাউন্ট হওয়ার সময় লিসেনারটি রিমুভ করা (Memory Leak রোধ করতে)
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []); // Empty array নিশ্চিত করে এটি শুধুমাত্র একবার রান হবে

  // টিচারের আন্ডারে থাকা স্টুডেন্টদের ফিল্টার করার লজিক
  const teacherDetails = allResults.filter((r) => r.teacherName === selectedTeacher?.name);

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10 relative'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='flex items-center gap-4 mb-10'>
            <div className='bg-slate-900 p-3 rounded-2xl text-white shadow-lg'>
              <BarChart2 size={28} />
            </div>
            <div>
              <h1 className='text-3xl font-black text-slate-800 uppercase tracking-tighter'>Global Analytics</h1>
              <p className='text-slate-500 font-medium'>Performance tracking across all instructors</p>
            </div>
          </div>

          {/* Graph Section */}
          <div className='bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 mb-10'>
            <h3 className='text-lg font-bold text-slate-800 mb-8'>Performance Overview</h3>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#f1f5f9' />
                  <XAxis dataKey='name' axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis unit='%' axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey='avgScore' radius={[10, 10, 0, 0]} barSize={50}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.avgScore > 50 ? "#00c288" : "#6366f1"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Teacher Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {data.map((teacher, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTeacher(teacher)}
                className='bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-[#00c288] hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden'>
                <div className='flex justify-between items-start mb-4'>
                  <div className='w-12 h-12 bg-slate-100 group-hover:bg-emerald-50 rounded-2xl flex items-center justify-center text-slate-700 group-hover:text-[#00c288] font-black transition-colors'>
                    {teacher.name.charAt(0)}
                  </div>
                  <div className='flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-black'>
                    <Star size={14} fill='currentColor' /> {teacher.rating}
                  </div>
                </div>
                <h4 className='text-xl font-black text-slate-800 mb-1'>{teacher.name}</h4>
                <p className='text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6'>
                  Professional Instructor
                </p>

                <div className='flex justify-between items-center pt-4 border-t border-slate-50'>
                  <div className='flex items-center gap-2 text-slate-500 font-bold text-xs'>
                    <Users size={14} /> {teacher.studentCount} Students
                  </div>
                  <div className='flex items-center gap-1 text-[#00c288] font-bold text-xs'>
                    <BookOpen size={14} /> Avg: {teacher.avgScore}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- STUDENT LIST MODAL --- */}
        <AnimatePresence>
          {selectedTeacher && (
            <div className='fixed inset-0 z-[100] flex items-center justify-center p-6'>
              {/* Backdrop */}
              <div
                className='absolute inset-0 bg-slate-900/60 backdrop-blur-sm'
                onClick={() => setSelectedTeacher(null)}></div>

              {/* Modal Box */}
              <div className='relative bg-white w-full max-w-4xl max-h-[80vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col'>
                {/* Modal Header */}
                <div className='p-8 bg-slate-900 text-white flex justify-between items-center'>
                  <div>
                    <h2 className='text-2xl font-black uppercase tracking-tight'>{selectedTeacher.name}'s Students</h2>
                    <p className='text-slate-400 text-sm'>List of students who attended exams under this instructor</p>
                  </div>
                  <button
                    onClick={() => setSelectedTeacher(null)}
                    className='p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-colors'>
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content - Table */}
                <div className='flex-1 overflow-y-auto p-8'>
                  <table className='w-full text-left border-collapse'>
                    <thead>
                      <tr className='text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-100'>
                        <th className='pb-4 px-2'>Student Name</th>
                        <th className='pb-4 px-2'>Email</th>
                        <th className='pb-4 px-2'>Course</th>
                        <th className='pb-4 px-2 text-center'>Score</th>
                        <th className='pb-4 px-2 text-center'>Percentage</th>
                        <th className='pb-4 px-2 text-right'>Exam Date</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-50'>
                      {teacherDetails.map((res, i) => {
                        // ডাটা প্রসেসিং
                        const name = res.studentName || res.StudentName;
                        const email = res.studentEmail || res.StudentEmail || "N/A";

                        return (
                          <tr key={i} className='hover:bg-slate-50 transition-colors'>
                            <td className='py-4 px-2'>
                              <div className='flex items-center gap-3'>
                                {/* Avatar - NULL হলে লাল রঙ দেখাবে */}
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] ${name === "NULL" ? "bg-red-100 text-red-500" : "bg-slate-100 text-slate-500"}`}>
                                  {name === "NULL" ? "?" : name.charAt(0)}
                                </div>
                                {/* নাম - NULL হলে ইটালিক এবং লাল দেখাবে */}
                                <span
                                  className={`font-bold ${name === "NULL" ? "text-red-500 italic text-sm" : "text-slate-800"}`}>
                                  {name}
                                </span>
                              </div>
                            </td>
                            <td className='py-4 px-2 text-sm text-slate-500 font-medium italic'>{email}</td>
                            {/* বাকি কলামগুলো (Course, Score, Percentage) আগের মতোই থাকবে... */}
                            <td className='py-4 px-2 text-sm font-semibold text-slate-700'>
                              {res.courseName || res.CourseName}
                            </td>
                            <td className='py-4 px-2 text-center font-black text-slate-800'>
                              {res.score ?? res.Score} / {res.totalQuestions ?? res.TotalQuestions}
                            </td>
                            <td className='py-4 px-2 text-center'>
                              <span className='px-3 py-1 rounded-full text-xs font-black bg-indigo-100 text-indigo-600'>
                                {Math.round(res.percentage || res.Percentage)}%
                              </span>
                            </td>
                            <td className='py-4 px-2 text-right text-xs text-slate-400'>
                              {new Date(res.examDate || res.ExamDate).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Modal Footer */}
                <div className='p-6 bg-slate-50 border-t border-slate-100 flex justify-center'>
                  <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>
                    Total Submissions: {teacherDetails.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Simple AnimatePresence polyfill wrapper if not using framer-motion
const AnimatePresence = ({ children }) => <>{children}</>;

export default ResultsDatabase;
