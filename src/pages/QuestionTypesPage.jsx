import React from "react";
import Sidebar from "../components/Sidebar";
import {
  CheckSquare,
  ListChecks,
  CircleCheck,
  PencilLine,
  AlignLeft,
  FileText,
  MousePointer2,
  Lock,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuestionTypesPage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-white font-sans'>
      <Sidebar />

      <main className='flex-1 ml-64 p-12'>
        {/* Header Section */}
        <div className='flex items-center gap-2 mb-8'>
          <h1 className='text-2xl font-bold text-slate-800'>Question types</h1>
          <div className='flex items-center gap-1 text-slate-400 text-sm ml-2'>
            <MousePointer2 size={14} />
            <span>Hover to preview</span>
          </div>
        </div>

        {/* Section Category */}
        <div className='mb-10'>
          <h3 className='text-slate-500 font-medium mb-6'>Basic</h3>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-12 max-w-5xl'>
            {/* 1. Multiple Choice (ACTIVE) */}
            <div
              onClick={() => navigate("/create-multiple-choice")}
              className='group flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-all'>
              <div className='bg-pink-50 p-3 rounded-lg group-hover:scale-110 transition-transform'>
                <CheckSquare className='text-pink-600' size={24} fill='currentColor' fillOpacity={0.2} />
              </div>
              <span className='font-bold text-slate-700 text-lg group-hover:text-pink-600 transition-colors'>
                Multiple choice
              </span>
            </div>

            {/* 2. Multi-select (UNAVAILABLE) */}
            <UnavailableType icon={<ListChecks size={24} className='text-pink-600' />} label='Multi-select' />

            {/* 3. True or false (UNAVAILABLE) */}
            <UnavailableType icon={<CircleCheck size={24} className='text-pink-600' />} label='True or false' />

            {/* 4. Fill in the blanks (UNAVAILABLE) */}
            <UnavailableType icon={<PencilLine size={24} className='text-pink-600' />} label='Fill in the blanks' />

            {/* 5. Open ended (UNAVAILABLE) */}
            <UnavailableType icon={<AlignLeft size={24} className='text-pink-600' />} label='Open ended' />

            {/* 6. Passage (UNAVAILABLE + Premium Badge) */}
            <div className='relative group'>
              <UnavailableType icon={<FileText size={24} className='text-pink-600' />} label='Passage' />
              {/* Small Lightning Bolt Badge like in the image */}
              <div className='absolute top-0 left-8 bg-yellow-400 text-white p-0.5 rounded shadow-sm opacity-60 group-hover:opacity-20'>
                <Zap size={10} fill='currentColor' />
              </div>
            </div>
          </div>
        </div>

        <p className='mt-20 text-slate-400 text-xs font-medium uppercase tracking-widest'>
          More question types coming soon for ObserveX Teachers.
        </p>
      </main>
    </div>
  );
};

/**
 * Reusable Helper Component for Disabled Question Types
 */
const UnavailableType = ({ icon, label }) => (
  <div className='group relative flex items-center gap-4 p-2 cursor-not-allowed overflow-visible'>
    {/* LOCK OVERLAY */}
    <div className='absolute -inset-2 bg-white/60 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center z-20 rounded-xl'>
      <div className='bg-slate-800 text-white px-3 py-1 rounded-full flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform'>
        <Lock size={12} />
        <span className='text-[10px] font-bold'>Currently Unavailable</span>
      </div>
    </div>

    {/* CONTENT (GREYED OUT) */}
    <div className='bg-pink-50/50 p-3 rounded-lg opacity-40 group-hover:opacity-10 transition-opacity'>{icon}</div>
    <span className='font-bold text-slate-400 text-lg opacity-60 group-hover:opacity-10 transition-opacity'>
      {label}
    </span>
  </div>
);

export default QuestionTypesPage;
