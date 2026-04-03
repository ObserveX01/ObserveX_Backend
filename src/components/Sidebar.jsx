import React from "react";
import {
  LayoutGrid,
  Users,
  BarChart2,
  User,
  HelpCircle,
  LogOut,
  ChevronLeft,
  PlusSquare, // Icon for Create Question
  List, // Icon for My Question
  BookOpenCheck,
  History, // Icon for Current Activities
  ClipboardCheck, // New Icon for Student Results
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // sessionStorage থেকে ইউজার রোল নেওয়া হচ্ছে (মাল্টি-ট্যাব সাপোর্টের জন্য)
  const userRole = sessionStorage.getItem("userRole");

  /**
   * Logout Logic
   */
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  /**
   * Logo Click Logic
   * রোল অনুযায়ী নির্দিষ্ট হোমপেজে রিডাইরেক্ট করা
   */
  const handleLogoClick = () => {
    if (userRole === "Admin") {
      navigate("/results-database");
    } else if (userRole === "Teacher") {
      // টিচারদের জন্য এখন "Course Question" পেজে নিয়ে যাবে
      navigate("/course-questions");
    } else {
      // স্টুডেন্টদের জন্য ডিফল্ট ড্যাশবোর্ড
      navigate("/dashboard");
    }
  };

  return (
    <aside className='w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full shadow-sm z-50'>
      {/* Brand Logo - ক্লিকেবল এবং টিচারদের জন্য Course Question এ রিডাইরেক্ট হবে */}
      <div className='p-6 flex items-center gap-3 cursor-pointer hover:opacity-80' onClick={handleLogoClick}>
        <img src={logo} alt='ObserveX Logo' className='w-8 h-8' />
        <span className='text-xl font-bold tracking-tight text-[#004242] uppercase'>observeX</span>
      </div>

      {/* Main Navigation Items */}
      <nav className='flex-1 px-3 mt-4'>
        {/* --- ১. My Tests - শুধুমাত্র Student দেখবে --- */}
        {userRole === "Student" && (
          <SidebarLink
            icon={<LayoutGrid size={20} />}
            label='My tests'
            active={location.pathname === "/dashboard"}
            onClick={() => navigate("/dashboard")}
          />
        )}

        {/* --- ২. Current Activities - শুধুমাত্র Student-দের জন্য --- */}
        {userRole === "Student" && (
          <SidebarLink
            icon={<History size={20} />}
            label='Current Activities'
            active={location.pathname === "/current-activities"}
            onClick={() => navigate("/current-activities")}
          />
        )}

        {/* --- ৩. Teacher Only Navigation --- */}
        {userRole === "Teacher" && (
          <>
            <SidebarLink
              icon={<ClipboardCheck size={20} />}
              label='Student Results'
              active={location.pathname === "/student-results"}
              onClick={() => navigate("/student-results")}
            />

            <SidebarLink
              icon={<PlusSquare size={20} />}
              label='Create Question'
              active={location.pathname === "/create-question"}
              onClick={() => navigate("/create-question")}
            />
            <SidebarLink
              icon={<List size={20} />}
              label='My Question'
              active={location.pathname === "/my-questions"}
              onClick={() => navigate("/my-questions")}
            />
            {/* টিচারদের মেইন পেজ বাটন */}
            <SidebarLink
              icon={<BookOpenCheck size={20} />}
              label='Course Question'
              active={location.pathname === "/course-questions"}
              onClick={() => navigate("/course-questions")}
            />
          </>
        )}

        {/* --- ৪. Admin Only Navigation --- */}
        {userRole === "Admin" && (
          <SidebarLink
            icon={<BarChart2 size={20} />}
            label='Results Database'
            active={location.pathname === "/results-database"}
            onClick={() => navigate("/results-database")}
          />
        )}

        {/* --- ৫. My Account - Admin ছাড়া সবার জন্য --- */}
        {userRole !== "Admin" && (
          <SidebarLink
            icon={<User size={20} />}
            label='My account'
            active={location.pathname === "/account"}
            onClick={() => navigate("/account")}
          />
        )}
      </nav>

      {/* Bottom Navigation Items */}
      <div className='px-3 pb-6 border-t border-slate-100 pt-4'>
        <SidebarLink
          icon={<HelpCircle size={20} />}
          label='Help'
          active={location.pathname === "/help"}
          onClick={() => navigate("/help")}
        />

        {/* Sign Out Button */}
        <SidebarLink icon={<LogOut size={20} />} label='Sign out' onClick={handleLogout} />
      </div>
    </aside>
  );
};

/**
 * SidebarLink Helper Component
 */
const SidebarLink = ({ icon, label, active = false, onClick }) => (
  <div
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-1
      ${
        active
          ? "bg-emerald-50 text-emerald-600 font-semibold shadow-sm"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }
    `}>
    <span className={active ? "text-emerald-600" : "text-slate-400"}>{icon}</span>
    <span className='text-sm'>{label}</span>
  </div>
);

export default Sidebar;
