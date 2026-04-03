import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ClipboardCheck, Search, User, Book, Calendar, ChevronRight, GraduationCap } from "lucide-react";

const StudentResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const teacherEmail = sessionStorage.getItem("userEmail");

    fetch(`/api/results/teacher/${teacherEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student results:", err);
        setLoading(false);
      });
  }, []);

  // সার্চ লজিক (স্টুডেন্ট ইমেইল বা কোর্স নাম দিয়ে সার্চ করা যাবে)
  const filteredResults = results.filter(
    (r) =>
      r.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.courseName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10'>
            <div>
              <div className='flex items-center gap-3 mb-2'>
                <div className='bg-emerald-500 p-2 rounded-lg text-white'>
                  <ClipboardCheck size={24} />
                </div>
                <h1 className='text-3xl font-black text-slate-800 uppercase tracking-tight'>Student Results</h1>
              </div>
              <p className='text-slate-500 font-medium'>Monitor your students' exam submissions and performance</p>
            </div>

            {/* Search Bar */}
            <div className='relative w-full md:w-80'>
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
              <input
                type='text'
                placeholder='Search student or course...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-emerald-500 outline-none transition-all shadow-sm bg-white'
              />
            </div>
          </div>

          {loading ? (
            <div className='text-center py-20 font-bold text-slate-400 animate-pulse'>Fetching records...</div>
          ) : filteredResults.length > 0 ? (
            <div className='bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-slate-50 border-b border-slate-100'>
                    <th className='px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest'>
                      Student
                    </th>
                    <th className='px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest'>
                      Course Info
                    </th>
                    <th className='px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest'>
                      Performance
                    </th>
                    <th className='px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest'>Date</th>
                    <th className='px-8 py-5 text-[10px] font-black uppercase text-slate-400 tracking-widest'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-50'>
                  {filteredResults.map((item) => (
                    <tr key={item.id} className='hover:bg-slate-50/50 transition-colors'>
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-3'>
                          <div className='w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600'>
                            <User size={20} />
                          </div>
                          <div>
                            <p className='font-bold text-slate-800'>{item.studentEmail.split("@")[0]}</p>
                            <p className='text-xs text-slate-400 font-medium'>{item.studentEmail}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-2 text-slate-700 font-bold'>
                          <Book size={16} className='text-emerald-500' />
                          {item.courseName}
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <div className='flex items-center gap-4'>
                          <div>
                            <p className='text-xs font-black text-slate-800'>
                              {item.score} / {item.totalQuestions}
                            </p>
                            <div className='w-24 h-1.5 bg-slate-100 rounded-full mt-1.5 overflow-hidden'>
                              <div className='h-full bg-emerald-500' style={{ width: `${item.percentage}%` }}></div>
                            </div>
                          </div>
                          <span className='text-sm font-black text-emerald-600'>{Math.round(item.percentage)}%</span>
                        </div>
                      </td>
                      <td className='px-8 py-6 text-slate-400 text-sm font-medium'>
                        <div className='flex items-center gap-2'>
                          <Calendar size={14} />
                          {new Date(item.examDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className='px-8 py-6'>
                        <button
                          onClick={() => navigate(`/review-exam/${item.id}`)}
                          className='flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95'>
                          Review <ChevronRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-slate-200'>
              <GraduationCap size={60} className='mx-auto text-slate-200 mb-4' />
              <h3 className='text-xl font-bold text-slate-400 uppercase tracking-widest'>No Submissions Yet</h3>
              <p className='text-slate-400 text-sm mt-2 font-medium'>
                When students complete your tests, their results will appear here.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentResults;
