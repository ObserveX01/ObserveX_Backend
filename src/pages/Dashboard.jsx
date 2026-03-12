import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Search, BookOpen, Layers, UserCircle, ArrowRight, Sparkles, AlertCircle, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(""); // এরর মেসেজ দেখানোর জন্য স্টেট
  const navigate = useNavigate();

  // ১. ইউজারের রোল চেক করা
  const userRole = sessionStorage.getItem("userRole");

  useEffect(() => {
    // --- ১. ডাটা ফেচ করার লজিক (আপনার অরিজিনাল কোড) ---
    fetch("http://localhost:5142/api/questions/all")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, obj) => {
          const key = obj.courseName || "Untitled Course";
          if (!acc[key]) acc[key] = [];
          acc[key].push(obj);
          return acc;
        }, {});
        setCourses(Object.entries(grouped));
      })
      .catch((err) => console.error("Error fetching courses:", err));

    // --- ২. ব্যাক বাটন অফ করার লজিক (নতুন সংযোজন) ---
    // হিস্ট্রি স্ট্যাকে একটি ফেক স্টেট পুশ করা
    window.history.pushState(null, null, window.location.href);

    const handleBackButton = () => {
      // ইউজার ব্যাক বাটন চাপলে জোর করে আবার এই বর্তমান পেজেই ফিরিয়ে আনা
      window.history.pushState(null, null, window.location.href);
    };

    // ব্রাউজারের popstate ইভেন্ট লিসেন করা
    window.addEventListener("popstate", handleBackButton);

    // কম্পোনেন্ট আনমাউন্ট হলে লিসেনার রিমুভ করা
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []); // Empty array নিশ্চিত করে এটি শুধুমাত্র পেজ লোড হওয়ার সময় একবার রান হবে

  // ২. টেক এক্সাম হ্যান্ডলার
  const handleTakeExam = (name) => {
    if (userRole === "Student") {
      setError(""); // সাকসেস হলে এরর মুছে ফেলবে
      navigate(`/exam-preview/${encodeURIComponent(name)}`);
    } else {
      // যদি টিচার হয় তবে রেড এরর শো করবে
      setError("ACCESS DENIED: You are logged in as a Teacher. Only Students can participate in exams.");

      // ৫ সেকেন্ড পর অটোমেটিক এরর মেসেজ চলে যাবে
      setTimeout(() => setError(""), 5000);
    }
  };

  const filteredCourses = courses.filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />

      <main className='flex-1 ml-64 p-10'>
        {/* --- ৩. রেড এরর ফিল্ড (শুধুমাত্র টিচার ক্লিক করলে আসবে) --- */}
        {error && (
          <div className='mb-6 flex items-center justify-between bg-red-50 border-l-8 border-red-600 p-5 rounded-xl shadow-lg animate-in fade-in slide-in-from-top-4 duration-300'>
            <div className='flex items-center gap-4'>
              <div className='bg-red-600 p-2 rounded-full text-white'>
                <AlertCircle size={20} />
              </div>
              <p className='text-red-800 font-black text-sm uppercase tracking-wide'>{error}</p>
            </div>
            <button onClick={() => setError("")} className='text-red-400 hover:text-red-800 transition-colors'>
              <X size={20} />
            </button>
          </div>
        )}

        <div className='flex justify-between items-center mb-10'>
          <div>
            <h1 className='text-2xl font-black text-slate-800 uppercase tracking-tight'>Available Exams</h1>
            <p className='text-slate-500 text-sm'>Select a course to start your assessment</p>
          </div>

          <div className='relative w-80 group'>
            <Search className='absolute left-4 top-3 text-slate-400' size={18} />
            <input
              type='text'
              placeholder='Search exams...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 shadow-sm transition-all'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredCourses.map(([name, qs]) => (
            <div
              key={name}
              className='bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 group'>
              <div className='h-40 bg-gradient-to-br from-[#1e293b] to-[#334155] p-6 flex flex-col justify-center items-center text-white relative'>
                <Sparkles size={40} className='mb-2 opacity-20 absolute top-4 right-4 rotate-12' />
                <h3 className='text-lg font-black uppercase text-center leading-tight z-10'>{name}</h3>
              </div>

              <div className='p-6 flex-1 flex flex-col'>
                <div className='space-y-3 mb-6'>
                  <div className='flex items-center gap-3 text-slate-600 font-bold'>
                    <div className='bg-blue-50 p-1.5 rounded-lg'>
                      <Layers size={16} className='text-blue-600' />
                    </div>
                    <span className='text-xs'>{qs.length} Total Questions</span>
                  </div>

                  <div className='flex items-center gap-3 text-slate-500 font-medium'>
                    <div className='bg-slate-50 p-1.5 rounded-lg'>
                      <UserCircle size={16} className='text-slate-400' />
                    </div>
                    <span className='text-[11px]'>
                      Teacher: <span className='text-slate-800 font-bold'>{qs[0]?.teacherName}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleTakeExam(name)}
                  className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    userRole === "Teacher"
                      ? "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                      : "bg-[#00c288] text-white hover:bg-[#00b377]"
                  }`}>
                  {userRole === "Teacher" ? "Exam Blocked" : "Take Exam"} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
