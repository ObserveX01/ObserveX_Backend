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
} from "lucide-react";
import logo from "../assets/logo.png";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // ১. সেশন বা লোকাল স্টোরেজ থেকে অথেন্টিকেশন ডাটা নেওয়া
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");

  // ২. রোল অনুযায়ী লোগোর পাথ ঠিক করা
  const getLogoPath = () => {
    if (!token) return "/";
    if (userRole === "Teacher") return "/course-questions";
    if (userRole === "Student") return "/dashboard";
    if (userRole === "Admin") return "/results-database";
    return "/";
  };

  const categories = [
    {
      icon: <BookOpen className='text-obs-mint' />,
      title: "Getting Started",
      desc: "Learn the basics of creating your first test.",
    },
    {
      icon: <UserCircle className='text-obs-mint' />,
      title: "Student Management",
      desc: "How to invite and manage your test takers.",
    },
    {
      icon: <Settings className='text-obs-mint' />,
      title: "Account Settings",
      desc: "Manage your subscription and team members.",
    },
    {
      icon: <ShieldCheck className='text-obs-mint' />,
      title: "Security & Proctoring",
      desc: "Setting up AI proctoring and browser locks.",
    },
    {
      icon: <PlayCircle className='text-obs-mint' />,
      title: "Video Tutorials",
      desc: "Step-by-step visual guides for all features.",
    },
    {
      icon: <HelpCircle className='text-obs-mint' />,
      title: "Taking a Test",
      desc: "Information for students and test-takers.",
    },
  ];

  return (
    <div className='min-h-screen bg-obs-dark text-white selection:bg-obs-mint selection:text-obs-dark'>
      {/* Header */}
      <nav className='border-b border-white/10 py-6'>
        <div className='max-w-6xl mx-auto px-6 flex justify-between items-center'>
          {/* লোগো ক্লিক লজিক আপডেট করা হয়েছে */}
          <Link to={getLogoPath()} className='flex items-center gap-3 hover:opacity-80 transition-all group'>
            {/* আপনার প্রোজেক্টের আসল লোগো ইমেজ */}
            <img src={logo} alt='ObserveX Logo' className='w-10 h-10 object-contain' />
            <span className='font-bold tracking-tight text-xl'>
              OBSERVEX <span className='text-white/50 font-normal'>Help Center</span>
            </span>
          </Link>

          {/* ৩. লগইন করা না থাকলে শুধু তখনই সাইনআপ বাটনটি দেখাবে */}
          {!token && (
            <Link
              to='/signup'
              className='text-sm font-medium bg-obs-mint text-obs-dark px-4 py-2 rounded-lg hover:bg-white transition-colors'>
              Back to Sign up
            </Link>
          )}
        </div>
      </nav>

      {/* Categories Grid */}
      <section className='max-w-6xl mx-auto px-6 py-8'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className='p-8 rounded-2xl border border-white/10 bg-white/5 hover:border-obs-mint/50 transition-all cursor-pointer group'>
              <div className='bg-obs-dark p-3 rounded-xl w-fit mb-6 border border-white/5 group-hover:scale-110 transition-transform'>
                {cat.icon}
              </div>
              <h3 className='text-xl font-bold mb-3'>{cat.title}</h3>
              <p className='text-white/50 text-sm leading-relaxed mb-6'>{cat.desc}</p>
              <div className='flex items-center text-obs-mint text-sm font-bold gap-1 group-hover:gap-2 transition-all'>
                View Articles <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='max-w-4xl mx-auto px-6 py-20 border-t border-white/10'>
        <h2 className='text-3xl font-bold mb-10 text-center'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
          {[
            "How do I reset my password?",
            "Can I use ObserveX for free?",
            "What devices are supported for proctoring?",
            "How do I export my test results to Excel?",
          ].map((faq, i) => (
            <div
              key={i}
              className='flex items-center justify-between p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 cursor-pointer transition-colors'>
              <span className='font-medium text-white/80'>{faq}</span>
              <ChevronRight size={18} className='text-white/20' />
            </div>
          ))}
        </div>
      </section>

      <footer className='py-10 text-center text-white/20 text-sm border-t border-white/5'>
        &copy; 2026 observeX Knowledge Base. All rights reserved.
      </footer>
    </div>
  );
};

export default HelpCenter;
