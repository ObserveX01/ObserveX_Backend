import React from "react";
import Sidebar from "../components/Sidebar";
import {
  Upload,
  Cloud,
  Globe,
  Youtube,
  Sparkles,
  Flag,
  PenTool,
  ChevronRight,
  MousePointer2,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateQuestionPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-white font-sans overflow-x-hidden'>
      <Sidebar />

      <main className='flex-1 ml-64 p-8 flex flex-col items-center justify-center'>
        <div className='max-w-5xl w-full space-y-8'>
          {/* --- SECTION 1: UPLOAD BOX (UNAVAILABLE) --- */}
          <div className='group relative border-2 border-dashed border-slate-200 rounded-[2.5rem] py-16 px-12 bg-white cursor-not-allowed overflow-hidden'>
            {/* HOVER OVERLAY */}
            <div className='absolute inset-0 bg-slate-50/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center z-10'>
              <div className='bg-slate-800 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform'>
                <Lock size={16} />
                <span className='text-sm font-bold'>Currently Unavailable</span>
              </div>
            </div>

            {/* CONTENT (GREYED OUT) */}
            <div className='flex flex-col items-center opacity-40 transition-opacity group-hover:opacity-20'>
              <p className='text-slate-500 mb-8 text-xl font-medium'>
                Upload lesson slides, worksheets or <span className='underline'>any document</span>
              </p>

              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2 px-8 py-3 border border-slate-200 rounded-2xl bg-white text-slate-300 font-bold'>
                  <Upload size={20} /> Device
                </div>
                <div className='flex items-center gap-2 px-8 py-3 border border-slate-200 rounded-2xl bg-white text-slate-300 font-bold'>
                  <Cloud size={20} /> Google Drive
                </div>
                <div className='flex items-center gap-3 px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50/30 min-w-[300px]'>
                  <Globe size={18} className='text-slate-200' />
                  <Youtube size={18} className='text-slate-200' />
                  <span className='text-slate-200 text-sm font-medium'>Paste any link here...</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECTION 2: THREE BOTTOM CARDS --- */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Card 1: Prompt (UNAVAILABLE) */}
            <div className='group relative border border-slate-100 bg-white rounded-[2rem] p-10 h-72 flex flex-col justify-between cursor-not-allowed overflow-hidden'>
              {/* HOVER OVERLAY */}
              <div className='absolute inset-0 bg-slate-50/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center z-10'>
                <div className='bg-slate-800 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg'>
                  <Lock size={14} />
                  <span className='text-xs font-bold'>Currently Unavailable</span>
                </div>
              </div>

              <div className='flex justify-between items-start opacity-40 group-hover:opacity-10 transition-opacity'>
                <h3 className='font-bold text-slate-600 text-lg leading-tight'>
                  Create with <br /> prompt or text
                </h3>
                <ChevronRight size={20} className='text-slate-300' />
              </div>
              <div className='bg-slate-50/50 border border-slate-100 rounded-full py-4 px-6 flex items-center gap-3 opacity-30 group-hover:opacity-10 transition-opacity'>
                <Sparkles size={18} className='text-slate-400' />
                <span className='text-sm text-slate-400'>Enter a topic...</span>
              </div>
            </div>

            {/* Card 2: Standards (UNAVAILABLE) */}
            <div className='group relative border border-slate-100 bg-white rounded-[2rem] p-10 h-72 overflow-hidden flex flex-col justify-between cursor-not-allowed'>
              {/* HOVER OVERLAY */}
              <div className='absolute inset-0 bg-slate-50/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center z-10'>
                <div className='bg-slate-800 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg'>
                  <Lock size={14} />
                  <span className='text-xs font-bold'>Currently Unavailable</span>
                </div>
              </div>

              <div className='flex justify-between items-start opacity-40 group-hover:opacity-10 transition-opacity'>
                <h3 className='font-bold text-slate-600 text-lg leading-tight'>
                  Create with <br /> standards or curriculum
                </h3>
                <ChevronRight size={20} className='text-slate-300' />
              </div>
              <div className='absolute bottom-[-10px] right-[-10px] opacity-10 rotate-12 group-hover:opacity-5 transition-opacity'>
                <Flag size={140} className='text-slate-900' />
              </div>
            </div>

            {/* Card 3: Start from scratch (ACTIVE) */}
            <div
              onClick={() => navigate("/question-types")} // UPDATED: Navigates to the question types selection page
              className='group border-2 border-slate-100 bg-white rounded-[2rem] p-10 h-72 shadow-sm hover:border-[#00c288] hover:shadow-xl hover:shadow-emerald-50 transition-all cursor-pointer flex flex-col justify-between'>
              <div className='flex justify-between items-start'>
                <h3 className='font-bold text-[#1e293b] text-xl leading-tight'>
                  Start from <br /> scratch
                </h3>
                <ChevronRight size={24} className='text-slate-400 group-hover:text-[#00c288] transition-colors' />
              </div>

              <div className='relative flex justify-center items-center h-24'>
                <div className='w-36 h-20 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2 p-4'>
                  <div className='h-2 w-full bg-slate-200/60 rounded'></div>
                  <div className='h-2 w-3/4 bg-slate-200/60 rounded'></div>
                  <div className='h-2 w-1/2 bg-slate-200/60 rounded'></div>
                </div>
                {/* Floating Pen Icon Square */}
                <div className='absolute -bottom-2 right-12 bg-[#00c288] p-3 rounded-xl text-white shadow-lg shadow-emerald-200 transform group-hover:scale-110 transition-transform'>
                  <PenTool size={20} />
                </div>
              </div>

              <p className='text-[11px] text-slate-400 font-bold uppercase tracking-[0.1em] flex items-center gap-2 group-hover:text-[#00c288] transition-colors'>
                <MousePointer2 size={14} /> Click to begin
              </p>
            </div>
          </div>
        </div>

        <p className='mt-12 text-slate-400 text-xs font-medium uppercase tracking-widest opacity-70'>
          Only "Start from scratch" is available in the current version of ObserveX.
        </p>
      </main>
    </div>
  );
};

export default CreateQuestionPage;
