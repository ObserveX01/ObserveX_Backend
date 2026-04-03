import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShieldCheck,
  BookOpen,
  UserCircle,
  Settings,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  PlayCircle,
  FileText,
} from "lucide-react";
import logo from "../assets/logo.png";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");

  const getLogoPath = () => {
    if (!token) return "/";
    if (userRole === "Teacher") return "/course-questions";
    if (userRole === "Student") return "/dashboard";
    if (userRole === "Admin") return "/results-database";
    return "/";
  };

  const categories = [
    {
      icon: <BookOpen className='text-[#00c288]' />,
      title: "Getting Started",
      desc: "Learn the basics of creating your first test.",
      slug: "getting-started",
      articles: [
        { title: "How to create your first exam?", id: "create-exam" },
        { title: "Setting up your teacher profile", id: "profile-setup" },
        { title: "Understanding the instructor dashboard", id: "dashboard-guide" },
      ],
    },
    {
      icon: <UserCircle className='text-[#00c288]' />,
      title: "Student Management",
      desc: "How to invite and manage your test takers.",
      slug: "student-management",
      articles: [
        { title: "Inviting students via secure link", id: "invite-students" },
        { title: "Organizing students into groups", id: "student-groups" },
        { title: "Tracking student progress & history", id: "tracking-progress" },
      ],
    },
    {
      icon: <Settings className='text-[#00c288]' />,
      title: "Account Settings",
      desc: "Manage your subscription and profile.",
      slug: "account-settings",
      articles: [
        { title: "How to change your account password", id: "password-reset" },
        { title: "Updating profile picture and details", id: "update-details" },
        { title: "Notification and alert settings", id: "alerts-config" },
      ],
    },
    {
      icon: <ShieldCheck className='text-[#00c288]' />,
      title: "Security & Proctoring",
      desc: "Setting up AI proctoring and locks.",
      slug: "security-proctoring",
      articles: [
        { title: "How ObserveX AI detection works", id: "ai-logic" },
        { title: "Enabling browser tab lock features", id: "browser-lock" },
        { title: "Reviewing cheating violation flags", id: "cheating-flags" },
      ],
    },
    {
      icon: <PlayCircle className='text-[#00c288]' />,
      title: "Video Tutorials",
      desc: "Step-by-step visual guides.",
      slug: "video-tutorials",
      articles: [
        { title: "Full dashboard walkthrough (Video)", id: "video-walkthrough" },
        { title: "Step-by-step proctoring setup", id: "video-proctoring" },
        { title: "Exam creation masterclass", id: "video-creation" },
      ],
    },
    {
      icon: <HelpCircle className='text-[#00c288]' />,
      title: "Taking a Test",
      desc: "Information for students.",
      slug: "taking-test",
      articles: [
        { title: "Checking system requirements", id: "sys-req" },
        { title: "What to do during a disconnection?", id: "disconnection" },
        { title: "Understanding the proctoring rules", id: "proctor-rules" },
      ],
    },
  ];

  return (
    <div className='min-h-screen bg-[#0f172a] text-white selection:bg-[#00c288] selection:text-[#0f172a] font-sans'>
      <nav className='border-b border-white/10 py-6 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50'>
        <div className='max-w-6xl mx-auto px-6 flex justify-between items-center'>
          <Link to={getLogoPath()} className='flex items-center gap-3 hover:opacity-80 transition-all group'>
            <img src={logo} alt='ObserveX Logo' className='w-10 h-10 object-contain' />
            <div className='flex items-center gap-2'>
              <span className='font-black tracking-tighter text-2xl uppercase text-white'>observeX</span>
              <span className='text-white/30 font-medium text-2xl tracking-tight hidden sm:block'>Help Center</span>
            </div>
          </Link>
          {!token && (
            <Link
              to='/signup'
              className='text-sm font-black uppercase tracking-widest bg-[#00c288] text-[#0f172a] px-6 py-2.5 rounded-xl hover:bg-white transition-all'>
              Sign up
            </Link>
          )}
        </div>
      </nav>

      <section className='bg-gradient-to-b from-[#00c288]/10 to-transparent py-20 px-6 text-center'>
        <h1 className='text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-4'>Knowledge Base</h1>
        <p className='text-white/60 text-lg font-medium'>Find answers and learn how to master ObserveX</p>
      </section>

      <section className='max-w-6xl mx-auto px-6 py-16'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className='p-10 rounded-[2.5rem] border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all flex flex-col group'>
              <div className='bg-[#0f172a] p-4 rounded-2xl w-fit mb-8 border border-white/5 shadow-inner'>
                {cat.icon}
              </div>
              <h3 className='text-2xl font-black mb-3 tracking-tight'>{cat.title}</h3>
              <p className='text-white/40 text-sm mb-8 leading-relaxed'>{cat.desc}</p>
              <div className='space-y-4 flex-1'>
                {cat.articles.map((article, aIdx) => (
                  <Link
                    key={aIdx}
                    to={`/docs#${article.id}`}
                    className='flex items-start gap-3 group/item cursor-pointer'>
                    <FileText
                      size={16}
                      className='mt-0.5 text-[#00c288]/30 group-hover/item:text-[#00c288] transition-colors'
                    />
                    <span className='text-sm text-white/60 group-hover/item:text-white transition-colors font-medium'>
                      {article.title}
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                to={`/docs#${cat.slug}`}
                className='mt-10 pt-8 border-t border-white/5 flex items-center text-[#00c288] text-xs font-black uppercase tracking-[0.2em] gap-2 cursor-pointer hover:gap-4 transition-all'>
                Explore Category <ChevronRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className='py-12 text-center text-white/20 text-xs font-black uppercase border-t border-white/5'>
        &copy; 2026 observeX Tech. All rights reserved.
      </footer>
    </div>
  );
};

export default HelpCenter;
