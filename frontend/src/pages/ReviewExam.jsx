import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ArrowLeft, CheckCircle2, XCircle, Info, AlertTriangle, CheckSquare } from "lucide-react";

const ReviewExam = () => {
  const { resultId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/results/details/${resultId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Review Data Received:", data);
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [resultId]);

  if (loading) return <div className='flex justify-center items-center h-screen font-bold'>Analyzing records...</div>;

  const total = result?.totalQuestions ?? 0;
  const correct = result?.score ?? 0;
  const wrongAnswersCount = total - correct;

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        <div className='max-w-4xl mx-auto'>
          <button
            onClick={() => navigate(-1)}
            className='flex items-center gap-2 text-slate-500 hover:text-[#00c288] mb-8 font-bold transition-colors'>
            <ArrowLeft size={20} /> Back to Activities
          </button>

          {/* Header Card */}
          <div className='bg-slate-900 rounded-[2.5rem] p-10 text-white mb-6 flex flex-col md:flex-row justify-between items-center gap-6'>
            <div>
              <h1 className='text-3xl font-black uppercase tracking-tight'>{result?.courseName}</h1>
              <p className='opacity-60 font-medium'>Detailed Performance Analysis</p>
            </div>
            <div className='flex items-center gap-6 text-center'>
              <div>
                <p className='text-[10px] font-black uppercase opacity-40 mb-1'>Success Rate</p>
                <div className='w-16 h-16 bg-[#00c288] rounded-2xl flex items-center justify-center text-xl font-black mx-auto'>
                  {Math.round(result?.percentage)}%
                </div>
              </div>
            </div>
          </div>

          {/* Quick Statistics Stats */}
          <div className='grid grid-cols-3 gap-4 mb-10'>
            <div className='bg-white p-6 rounded-3xl border border-slate-100 shadow-sm text-center'>
              <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Total</p>
              <h3 className='text-2xl font-black text-slate-800'>{result?.totalQuestions}</h3>
            </div>
            <div className='bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center'>
              <p className='text-[10px] font-black text-emerald-400 uppercase tracking-widest'>Correct</p>
              <h3 className='text-2xl font-black text-emerald-600'>{result?.score}</h3>
            </div>
            <div className='bg-red-50 p-6 rounded-3xl border border-red-100 text-center'>
              <p className='text-[10px] font-black text-red-400 uppercase tracking-widest'>Wrong</p>
              <h3 className='text-2xl font-black text-red-600'>{wrongAnswersCount}</h3>
            </div>
          </div>

          {/* Answers Review List */}
          <div className='space-y-6 pb-20'>
            <div className='flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-widest mb-4'>
              <Info size={16} /> Reviewing each question
            </div>

            {result?.details?.map((q, index) => (
              <div
                key={index}
                className={`bg-white rounded-3xl p-8 border shadow-sm relative overflow-hidden transition-all ${!q.isCorrect ? "border-red-100 bg-red-50/10" : "border-slate-100"}`}>
                {/* Side Indicator Bar */}
                <div
                  className={`absolute top-0 left-0 w-2 h-full ${q.isCorrect ? "bg-emerald-500" : "bg-red-500"}`}></div>

                <div className='flex justify-between items-start mb-4'>
                  <h4 className='text-lg font-bold text-slate-800 leading-tight'>
                    <span className='text-slate-300 mr-2'>{index + 1}.</span> {q.questionText}
                  </h4>
                  {q.isCorrect ? (
                    <div className='flex items-center gap-1 text-emerald-600 font-black text-xs uppercase bg-emerald-100 px-3 py-1 rounded-full'>
                      <CheckCircle2 size={14} /> Correct
                    </div>
                  ) : (
                    <div className='flex items-center gap-1 text-red-600 font-black text-xs uppercase bg-red-100 px-3 py-1 rounded-full'>
                      <AlertTriangle size={14} /> Incorrect
                    </div>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-6'>
                  {/* User Answer */}
                  <div
                    className={`p-4 rounded-2xl border-2 ${q.isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                    <p className='text-[10px] font-black uppercase text-slate-400 mb-1'>Your Choice</p>
                    <p className={`font-bold ${q.isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                      {q.userOptionText || "No answer provided"}
                    </p>
                  </div>

                  {/* Correct Answer (Only shows if User was wrong) */}
                  {!q.isCorrect && (
                    <div className='p-4 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50'>
                      <p className='text-[10px] font-black uppercase text-emerald-400 mb-1'>Right Answer</p>
                      <p className='font-bold text-emerald-700'>{q.correctOptionText}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReviewExam;
