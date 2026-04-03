import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { History, Calendar, User, BookOpen, ChevronRight, Award } from "lucide-react";

const CurrentActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const studentEmail = sessionStorage.getItem("userEmail");
    // আপনার এপিআই থেকে ডাটা ফেচ করুন (ORDER BY ExamDate DESC)
    fetch(`/api/results/student/${studentEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        <div className='max-w-5xl mx-auto'>
          <div className='flex items-center gap-4 mb-10'>
            <div className='bg-[#00c288] p-3 rounded-2xl text-white shadow-lg shadow-emerald-100'>
              <History size={28} />
            </div>
            <div>
              <h1 className='text-3xl font-black text-slate-800 uppercase tracking-tight'>Current Activities</h1>
              <p className='text-slate-500 font-medium'>Track your recent exam performances and improvements</p>
            </div>
          </div>

          {loading ? (
            <div className='text-center py-20 font-bold text-slate-400 animate-pulse'>Loading activities...</div>
          ) : activities.length > 0 ? (
            <div className='grid gap-6'>
              {activities.map((item) => (
                <div
                  key={item.id}
                  className='bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6'>
                  <div className='flex items-center gap-6'>
                    <div className='w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#00c288]'>
                      <BookOpen size={30} />
                    </div>
                    <div>
                      <h3 className='text-xl font-bold text-slate-800'>{item.courseName}</h3>
                      <div className='flex flex-wrap gap-4 mt-1'>
                        <span className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
                          <User size={14} /> {item.teacherName}
                        </span>
                        <span className='flex items-center gap-1.5 text-xs font-semibold text-slate-400'>
                          <Calendar size={14} /> {new Date(item.examDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-8 w-full md:w-auto justify-between md:justify-end'>
                    <div className='text-center'>
                      <p className='text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1'>Score</p>
                      <span className='text-xl font-black text-slate-800'>
                        {item.score}/{item.totalQuestions}
                      </span>
                    </div>

                    <div className='px-4 py-2 bg-emerald-50 rounded-xl'>
                      <span className='text-lg font-black text-[#00c288]'>{Math.round(item.percentage)}%</span>
                    </div>

                    <button
                      onClick={() => navigate(`/review-exam/${item.id}`)}
                      className='bg-slate-900 hover:bg-black text-white p-3 rounded-xl transition-all active:scale-95'
                      title='Review Answers'>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='bg-white rounded-3xl p-20 text-center border-2 border-dashed border-slate-200'>
              <Award size={60} className='mx-auto text-slate-200 mb-4' />
              <p className='text-slate-400 font-bold'>No activities found. Start an exam to see records here!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CurrentActivities;
