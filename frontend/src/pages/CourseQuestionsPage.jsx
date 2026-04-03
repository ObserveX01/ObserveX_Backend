import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Search, BookOpen, Layers, UserCircle, ArrowRight } from "lucide-react"; // Added UserCircle
import { useNavigate } from "react-router-dom";

const CourseQuestionsPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const teacherEmail = sessionStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/questions/${teacherEmail}`)
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
  }, [teacherEmail]);

  const filteredCourses = courses.filter(([name]) => name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className='flex min-h-screen bg-slate-50 font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        {/* Search Bar */}
        <div className='mb-12 max-w-md'>
          <div className='relative group'>
            <Search
              className='absolute left-4 top-3.5 text-slate-400 group-focus-within:text-red-500 transition-colors'
              size={20}
            />
            <input
              type='text'
              placeholder='Search Your Course...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-50/50 transition-all shadow-sm'
            />
          </div>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {filteredCourses.map(([name, qs]) => (
            <div
              key={name}
              className='bg-white rounded-[2rem] shadow-lg shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-300 group'>
              {/* Top Section (Red Banner) */}
              <div className='h-48 bg-gradient-to-br from-[#e11d48] to-[#f43f5e] p-8 flex flex-col justify-center items-center text-white relative'>
                <BookOpen
                  size={60}
                  className='mb-2 opacity-20 absolute top-6 right-6 rotate-12 group-hover:rotate-0 transition-transform duration-500'
                />
                <h3 className='text-2xl font-black uppercase text-center tracking-tight leading-tight z-10'>{name}</h3>
              </div>

              {/* Bottom Section (Details) */}
              <div className='p-8 flex-1 flex flex-col'>
                <div className='space-y-3 mb-8'>
                  {/* Total Questions */}
                  <div className='flex items-center gap-3 text-slate-700 font-bold'>
                    <div className='bg-red-50 p-1.5 rounded-lg'>
                      <Layers size={18} className='text-red-600' />
                    </div>
                    <span className='text-sm'>{qs.length} Total Questions</span>
                  </div>

                  {/* Teacher Name (NEW) */}
                  <div className='flex items-center gap-3 text-slate-500 font-medium'>
                    <div className='bg-slate-50 p-1.5 rounded-lg'>
                      <UserCircle size={18} className='text-slate-400' />
                    </div>
                    <span className='text-xs'>
                      Teacher:{" "}
                      <span className='text-slate-800 font-bold'>{qs[0]?.teacherName || "ObserveX Admin"}</span>
                    </span>
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={() => navigate(`/course/${encodeURIComponent(name)}`)}
                  className='w-full bg-[#b91c1c] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-200 hover:bg-red-800 active:scale-95 transition-all flex items-center justify-center gap-2'>
                  Enroll Now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseQuestionsPage;
