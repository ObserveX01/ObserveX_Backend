import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  BookOpen,
  UserCircle,
  Settings,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  Monitor,
  Cpu,
  Globe,
  Users,
} from "lucide-react";
import logo from "../assets/logo.png";

const KnowledgeBase = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className='min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#00c288] selection:text-[#0f172a]'>
      {/* --- STICKY HEADER --- */}
      <nav className='border-b border-white/10 py-6 sticky top-0 bg-[#0f172a]/95 backdrop-blur-md z-50'>
        <div className='max-w-6xl mx-auto px-6 flex justify-between items-center'>
          <Link
            to='/help'
            className='flex items-center gap-2 text-[#00c288] font-black uppercase tracking-widest text-xs hover:text-white transition-all'>
            <ArrowLeft size={18} /> Back to Help Center
          </Link>
          <div className='flex items-center gap-3'>
            <img src={logo} className='w-8 h-8 object-contain' alt='ObserveX' />
            <span className='font-black uppercase tracking-tighter text-xl'>ObserveX Docs</span>
          </div>
        </div>
      </nav>

      <div className='max-w-4xl mx-auto px-6 py-20'>
        {/* ==========================================
            1. GETTING STARTED
            ========================================== */}
        <section id='getting-started' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-[#00c288]/10 p-4 rounded-3xl'>
              <BookOpen className='text-[#00c288]' size={36} />
            </div>
            <div>
              <h2 className='text-4xl font-black uppercase tracking-tighter'>Getting Started</h2>
              <p className='text-slate-500 font-medium mt-1'>Foundation guide for new instructors and students</p>
            </div>
          </div>

          <div className='space-y-12'>
            <div
              id='create-exam'
              className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28 shadow-2xl'>
              <h3 className='text-2xl font-bold mb-6 text-[#00c288]'>How to create your first exam?</h3>
              <div className='space-y-4 text-slate-300 leading-relaxed'>
                <p>Creating an exam in ObserveX is a streamlined 4-step process designed for teachers:</p>
                <ul className='space-y-3'>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={18} className='text-emerald-500 mt-1 shrink-0' /> <b>Step 1:</b> Navigate to{" "}
                    <b>"Create Question"</b> from your sidebar.
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={18} className='text-emerald-500 mt-1 shrink-0' /> <b>Step 2:</b> Assign a unique{" "}
                    <b>Course Name</b> (e.g., Computer Architecture 101).
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={18} className='text-emerald-500 mt-1 shrink-0' /> <b>Step 3:</b> Type your
                    question and fill in the 4 multiple-choice options.
                  </li>
                  <li className='flex items-start gap-3'>
                    <CheckCircle2 size={18} className='text-emerald-500 mt-1 shrink-0' /> <b>Step 4:</b> Mark the{" "}
                    <b>Checkmark</b> on the correct option and hit "Next Question" or "All Done".
                  </li>
                </ul>
                <div className='mt-6 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-emerald-400 text-sm italic'>
                  <b>Pro Tip:</b> Ensure all 4 options are unique. The system will throw an error if duplicate answers
                  are detected.
                </div>
              </div>
            </div>

            <div id='dashboard-guide' className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28'>
              <h3 className='text-2xl font-bold mb-6 text-[#00c288]'>Understanding the Dashboard</h3>
              <p className='text-slate-400 leading-relaxed'>
                The dashboard serves as your mission control. For <b>Teachers</b>, it displays a grid of all active
                courses with question counts. For <b>Students</b>, it lists all available exams they are authorized to
                take.
              </p>
              <div className='grid grid-cols-2 gap-4 mt-8'>
                <div className='bg-white/5 p-4 rounded-2xl border border-white/5'>
                  <h4 className='font-bold text-white mb-2'>My Tests</h4>
                  <p className='text-xs text-slate-500'>A list of all assessments categorized by course name.</p>
                </div>
                <div className='bg-white/5 p-4 rounded-2xl border border-white/5'>
                  <h4 className='font-bold text-white mb-2'>Live Status</h4>
                  <p className='text-xs text-slate-500'>Real-time indicators showing if AI proctoring is enabled.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. STUDENT MANAGEMENT
            ========================================== */}
        <section id='student-management' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-[#00c288]/10 p-4 rounded-3xl'>
              <UserCircle className='text-[#00c288]' size={36} />
            </div>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>Student Management</h2>
          </div>

          <div className='space-y-10'>
            <div
              id='tracking-progress'
              className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28'>
              <h3 className='text-2xl font-bold mb-6 text-[#00c288]'>Monitoring Performance & Results</h3>
              <p className='text-slate-300 leading-relaxed'>
                Instructors can access detailed analytics for every student. By navigating to <b>"Student Results"</b>,
                you can filter data by Student Email or Course.
              </p>
              <div className='mt-6 space-y-4'>
                <div className='flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5'>
                  <div className='text-blue-400 mt-1'>
                    <Info size={20} />
                  </div>
                  <p className='text-sm text-slate-400'>
                    <b>The Review Feature:</b> Clicking the "Review" button on a result allows you to see exactly which
                    questions the student answered correctly and which ones they missed, highlighted in green and red.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            3. ACCOUNT SETTINGS
            ========================================== */}
        <section id='account-settings' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-[#00c288]/10 p-4 rounded-3xl'>
              <Settings className='text-[#00c288]' size={36} />
            </div>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>Account Settings</h2>
          </div>

          <div id='update-details' className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28'>
            <h3 className='text-2xl font-bold mb-6 text-[#00c288]'>Personal Profile & Identity</h3>
            <p className='text-slate-300 leading-relaxed mb-6'>
              To maintain academic integrity, it is vital that your profile is up to date.
            </p>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-400'>
              <li className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-[#00c288] rounded-full' />
                <b>Avatar:</b> Use a clear headshot.
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-[#00c288] rounded-full' />
                <b>Email:</b> Linked to your session history.
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-[#00c288] rounded-full' />
                <b>Security:</b> Use 8+ characters for passwords.
              </li>
              <li className='flex items-center gap-2'>
                <div className='w-1.5 h-1.5 bg-[#00c288] rounded-full' />
                <b>ID Cards:</b> Coming soon for institutional users.
              </li>
            </ul>
          </div>
        </section>

        {/* ==========================================
            4. SECURITY & PROCTORING (CRITICAL)
            ========================================== */}
        <section id='security-proctoring' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-red-500/10 p-4 rounded-3xl'>
              <ShieldCheck className='text-red-500' size={36} />
            </div>
            <h2 className='text-4xl font-black uppercase tracking-tighter text-red-500'>Security & AI Proctoring</h2>
          </div>

          <div className='space-y-12'>
            <div id='ai-logic' className='bg-white/5 p-10 rounded-[2.5rem] border border-red-500/20 scroll-mt-28'>
              <h3 className='text-2xl font-bold mb-6 text-red-400'>The ObserveX AI Sentinel</h3>
              <p className='text-slate-300 leading-relaxed mb-8'>
                Our proctoring system is powered by the <b>YOLOv8 Computer Vision model</b>. It runs natively on the
                backend to ensure zero tampering from the client side.
              </p>
              <div className='grid gap-6'>
                <div className='bg-red-500/5 p-6 rounded-2xl border border-red-500/10'>
                  <h4 className='font-bold text-white mb-2 flex items-center gap-2'>
                    <Monitor size={16} /> Object Detection
                  </h4>
                  <p className='text-xs text-slate-400'>
                    The AI constantly scans for <b>Mobile Phones</b>, <b>Books</b>, and <b>Smartwatches</b>. Detection
                    results in an immediate session termination.
                  </p>
                </div>
                <div className='bg-red-500/5 p-6 rounded-2xl border border-red-500/10'>
                  <h4 className='font-bold text-white mb-2 flex items-center gap-2'>
                    <Users size={16} /> Facial Identity
                  </h4>
                  <p className='text-xs text-slate-400'>
                    The system flags "Multiple Faces Detected" if more than one person appears in the webcam frame,
                    auto-submitting the exam to prevent collusion.
                  </p>
                </div>
              </div>
            </div>

            <div id='browser-lock' className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28'>
              <h3 className='text-2xl font-bold mb-6 text-[#00c288]'>Browser Tab & Focus Lock</h3>
              <p className='text-slate-400 leading-relaxed'>ObserveX tracks the visibility of the browser tab.</p>
              <div className='mt-6 bg-[#0f172a] p-6 rounded-3xl border border-white/5'>
                <h4 className='text-red-500 font-black text-xs uppercase mb-3 tracking-widest'>
                  The 2-Attempt Policy:
                </h4>
                <p className='text-sm text-slate-300'>
                  <b>Attempt 1:</b> A full-screen warning overlay appears, pausing the timer and requiring user
                  acknowledgement. <br />
                  <b>Attempt 2:</b> The session is revoked immediately, and a "Breach of Protocol" report is generated
                  for the instructor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. VIDEO TUTORIALS
            ========================================== */}
        <section id='video-tutorials' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-[#00c288]/10 p-4 rounded-3xl'>
              <PlayCircle className='text-[#00c288]' size={36} />
            </div>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>Video Tutorials</h2>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center flex-col p-6 text-center group cursor-pointer hover:bg-[#00c288]/10 transition-all'>
              <div className='bg-[#00c288] p-3 rounded-full text-[#0f172a] mb-4 group-hover:scale-125 transition-transform'>
                <PlayCircle />
              </div>
              <h4 className='font-bold mb-1'>For Teachers</h4>
              <p className='text-xs text-slate-500'>Creating questions and managing student submissions.</p>
            </div>
            <div className='aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center flex-col p-6 text-center group cursor-pointer hover:bg-[#00c288]/10 transition-all'>
              <div className='bg-white/10 p-3 rounded-full text-white mb-4 group-hover:scale-125 transition-transform'>
                <Monitor />
              </div>
              <h4 className='font-bold mb-1'>For Students</h4>
              <p className='text-xs text-slate-500'>How to verify camera and take proctored exams.</p>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. TAKING A TEST
            ========================================== */}
        <section id='taking-test' className='mb-40 scroll-mt-24'>
          <div className='flex items-center gap-4 mb-12 border-b border-white/10 pb-6'>
            <div className='bg-[#00c288]/10 p-4 rounded-3xl'>
              <HelpCircle className='text-[#00c288]' size={36} />
            </div>
            <h2 className='text-4xl font-black uppercase tracking-tighter'>Taking a Test</h2>
          </div>

          <div className='space-y-8'>
            <div
              id='sys-req'
              className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28 shadow-2xl'>
              <h3 className='text-2xl font-bold mb-6 text-[#00c288] flex items-center gap-2'>
                <Cpu size={24} /> Minimum System Requirements
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-4'>
                  <Globe size={24} className='mx-auto mb-2 text-slate-500' />
                  <h5 className='font-bold text-sm'>Browser</h5>
                  <p className='text-[10px] text-slate-400'>Chrome/Brave v90+</p>
                </div>
                <div className='text-center p-4 border-x border-white/5'>
                  <Monitor size={24} className='mx-auto mb-2 text-slate-500' />
                  <h5 className='font-bold text-sm'>Webcam</h5>
                  <p className='text-[10px] text-slate-400'>720p HD Recommended</p>
                </div>
                <div className='text-center p-4'>
                  <Cpu size={24} className='mx-auto mb-2 text-slate-500' />
                  <h5 className='font-bold text-sm'>Internet</h5>
                  <p className='text-[10px] text-slate-400'>Stable 2Mbps Fiber/LTE</p>
                </div>
              </div>
            </div>

            <div id='disconnection' className='bg-white/5 p-10 rounded-[2.5rem] border border-white/10 scroll-mt-28'>
              <h3 className='text-2xl font-bold mb-4 text-orange-400 flex items-center gap-2'>
                <AlertTriangle size={24} /> Handling Disconnections
              </h3>
              <p className='text-slate-400 leading-relaxed'>
                If your internet drops during an exam, <b>do not refresh the page</b>. The system will attempt to
                reconnect for 60 seconds. If it fails, your progress up to the last answered question is automatically
                saved in our secure cloud.
              </p>
            </div>
          </div>
        </section>
      </div>

      <footer className='py-12 text-center text-white/20 text-xs font-black uppercase border-t border-white/5'>
        &copy; 2026 observeX Tech. All rights reserved.
      </footer>
    </div>
  );
};

export default KnowledgeBase;
