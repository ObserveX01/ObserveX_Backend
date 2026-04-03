import React from "react";
import Navbar from "../components/Navbar";
import TrustSection from "../components/TrustSection";
import { Check, Camera, Users, BarChart3, Clock, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom"; // Added this import

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-obs-dark text-white selection:bg-obs-mint selection:text-obs-dark'>
      <Navbar />

      <header className='max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-32 grid lg:grid-cols-2 gap-16 items-center'>
        {/* Left Side: Hero Text */}
        <div className='space-y-8'>
          <h1 className='text-5xl lg:text-7xl font-extrabold leading-[1.1]'>
            Turn your <span className='text-obs-mint'>tests</span> <br />
            into <span className='text-white'>success stories</span>
          </h1>
          <p className='text-lg lg:text-xl text-white/70 max-w-lg'>
            AI-powered skills and knowledge assessment software, serving 2.5M+ business and educational users worldwide.
          </p>
          <div className='flex flex-col gap-6'>
            {/* Wrapped the button in a Link component */}
            <Link to='/signup' className='w-fit'>
              <button className='px-10 py-4 text-xl font-bold text-obs-dark bg-obs-yellow rounded-lg hover:scale-105 transition-transform shadow-xl'>
                Sign up - it's free
              </button>
            </Link>

            <div className='flex items-center gap-2 text-sm text-white/60'>
              <Check className='w-5 h-5 text-obs-mint' />
              <span>No credit card required</span>
            </div>
          </div>
        </div>

        {/* Right Side: Mockup UI */}
        <div className='relative hidden lg:block'>
          <div className='absolute -inset-20 bg-obs-mint/20 rounded-full blur-[120px]'></div>
          <div className='relative bg-white rounded-2xl shadow-2xl overflow-hidden text-slate-800 border border-white/20'>
            <div className='bg-slate-50 border-b p-4 flex justify-between items-center'>
              <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Live Proctoring</span>
              <div className='flex gap-1.5'>
                <div className='w-2.5 h-2.5 rounded-full bg-slate-200' />
                <div className='w-2.5 h-2.5 rounded-full bg-slate-200' />
                <div className='w-2.5 h-2.5 rounded-full bg-slate-200' />
              </div>
            </div>
            <div className='flex h-[450px]'>
              <div className='w-14 border-r bg-slate-50/50 flex flex-col items-center py-6 gap-6'>
                <div className='bg-obs-dark p-2 rounded-lg text-white'>
                  <LayoutGrid size={18} />
                </div>
                <Users size={18} className='text-slate-300' />
                <BarChart3 size={18} className='text-slate-300' />
                <Camera size={18} className='text-slate-300' />
              </div>
              <div className='flex-1 p-6 space-y-6'>
                <div className='flex justify-between'>
                  <div>
                    <span className='bg-obs-mint/20 text-obs-dark px-2 py-0.5 rounded text-[10px] font-bold'>
                      ACTIVE
                    </span>
                    <h3 className='text-lg font-bold'>Mahir Faisal</h3>
                    <p className='text-xs text-slate-400'>mahirfaisal0001@gmail.com</p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='border rounded-xl p-4 bg-slate-50/30'>
                    <p className='text-[10px] font-bold text-slate-400 uppercase mb-2'>Integrity Score</p>
                    <div className='flex items-center gap-2'>
                      <span className='text-2xl font-bold text-obs-dark'>97%</span>
                      <span className='text-[10px] font-bold text-green-600'>SECURE</span>
                    </div>
                  </div>
                  <div className='border rounded-xl p-4 bg-slate-50/30'>
                    <p className='text-[10px] font-bold text-slate-400 uppercase mb-2'>Time Remaining</p>
                    <div className='flex items-center gap-2 text-obs-dark font-mono font-bold'>
                      <Clock size={16} /> 00:32:05
                    </div>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='w-full bg-slate-100 h-1.5 rounded-full'>
                    <div className='bg-obs-mint h-full w-[95%] rounded-full'></div>
                  </div>
                  <p className='text-[11px] text-slate-500 italic'>
                    "No suspicious activity or prohibited objects detected."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <TrustSection />
    </div>
  );
};

export default LandingPage;
