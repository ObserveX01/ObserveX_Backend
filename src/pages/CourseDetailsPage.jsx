import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CheckCircle2, Clock, Star } from "lucide-react";

const CourseDetailsPage = () => {
  const { courseName } = useParams(); // URL থেকে কোর্সের নাম নিবে
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const teacherEmail = sessionStorage.getItem("userEmail");

  useEffect(() => {
    fetch(`http://localhost:5142/api/questions/${teacherEmail}`)
      .then((res) => res.json())
      .then((data) => {
        // শুধুমাত্র বর্তমান কোর্সের প্রশ্নগুলো ফিল্টার করা হচ্ছে
        const filtered = data.filter((q) => q.courseName === decodeURIComponent(courseName));
        setQuestions(filtered);
      });
  }, [courseName, teacherEmail]);

  return (
    <div className='flex min-h-screen bg-[#f8fafc]'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        {/* Header */}
        <div className='flex items-center gap-4 mb-8'>
          <button onClick={() => navigate(-1)} className='p-2 hover:bg-slate-200 rounded-full transition-colors'>
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className='text-3xl font-black text-slate-800 uppercase'>{decodeURIComponent(courseName)}</h1>
            <p className='text-slate-500'>Showing all questions for this course</p>
          </div>
        </div>

        {/* Questions List */}
        <div className='space-y-6'>
          {questions.length > 0 ? (
            questions.map((q, idx) => (
              <div key={q.id} className='bg-white border border-slate-200 rounded-2xl p-8 shadow-sm'>
                <div className='flex justify-between items-start mb-6'>
                  <div className='text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full'>
                    Question {idx + 1} • Multiple Choice
                  </div>
                  <div className='flex gap-4 text-slate-400 text-sm font-bold'>
                    <span className='flex items-center gap-1'>
                      <Clock size={14} /> 30s
                    </span>
                    <span className='flex items-center gap-1'>
                      <Star size={14} /> 1pt
                    </span>
                  </div>
                </div>

                <h2 className='text-xl font-bold text-slate-800 mb-8'>{q.text}</h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {q.options.map((opt, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-4 rounded-xl border ${
                        opt.isCorrect
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-slate-50 border-slate-100 text-slate-600"
                      }`}>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          opt.isCorrect ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-300"
                        }`}>
                        {opt.isCorrect && <CheckCircle2 size={14} />}
                      </div>
                      <span className='font-medium'>{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className='text-center py-20 bg-white rounded-2xl border border-dashed'>
              <p className='text-slate-400'>No questions found for this course.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseDetailsPage;
