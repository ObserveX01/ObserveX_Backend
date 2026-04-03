import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// Public Pages
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/Login";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import HelpCenter from "./pages/HelpCenter";
import AboutPage from "./pages/AboutPage";

// Private (Protected) Pages
import Dashboard from "./pages/Dashboard";
import AccountPage from "./pages/AccountPage";
import CreateQuestionPage from "./pages/CreateQuestionPage";
import QuestionTypesPage from "./pages/QuestionTypesPage";
import MyQuestionsPage from "./pages/MyQuestionsPage";
import EditorPage from "./pages/EditorPage";
import CourseQuestionsPage from "./pages/CourseQuestionsPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import ExamPage from "./pages/ExamPage";
import StudentResults from "./pages/StudentResults";

// --- NEW PAGES ---
import CurrentActivities from "./pages/CurrentActivities";
import ReviewExam from "./pages/ReviewExam";
import ResultsDatabase from "./pages/ResultsDatabase";
import KnowledgeBase from "./pages/KnowledgeBase";

/**
 * ProtectedRoute:
 * টোকেন না থাকলে লগইন পেজে পাঠাবে।
 * এখানে sessionStorage ব্যবহার করা হয়েছে।
 */
const ProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

/**
 * PublicRoute:
 * লগইন করা থাকলে ল্যান্ডিং/লগইন পেজে যেতে দিবে না।
 * অ্যাডমিন হলে সরাসরি Results Database-এ পাঠাবে।
 */
const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");

  if (token) {
    if (userRole === "Admin") {
      return <Navigate to='/results-database' replace />;
    }
    if (userRole === "Teacher") {
      return <Navigate to='/course-questions' replace />;
    }
    return <Navigate to='/dashboard' replace />;
  }
  return children;
};

/**
 * DashboardRedirect:
 * যদি অ্যাডমিন সরাসরি /dashboard ইউআরএল-এ ঢোকার চেষ্টা করে,
 * তাকে Results Database-এ রিডাইরেক্ট করবে।
 */
const DashboardRedirect = () => {
  const userRole = sessionStorage.getItem("userRole");
  if (userRole === "Admin") {
    return <Navigate to='/results-database' replace />;
  }
  return <Dashboard />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- পাবলিক রাউটস (লগইন থাকলে রিডাইরেক্ট হবে) --- */}
        <Route
          path='/'
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* --- সাধারণ পেজ --- */}
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/help' element={<HelpCenter />} />
        <Route path='/about' element={<AboutPage />} />

        {/* --- প্রোটেক্টেড রাউটস (লগইন থাকা বাধ্যতামূলক) --- */}

        {/* ড্যাশবোর্ড (অ্যাডমিন হলে অটোমেটিক Results Database এ যাবে) */}
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />

        {/* অ্যাডমিন এনালাইসিস পেজ */}
        <Route
          path='/results-database'
          element={
            <ProtectedRoute>
              <ResultsDatabase />
            </ProtectedRoute>
          }
        />

        {/* স্টুডেন্ট অ্যাক্টিভিটি পেজ */}
        <Route
          path='/current-activities'
          element={
            <ProtectedRoute>
              <CurrentActivities />
            </ProtectedRoute>
          }
        />

        {/* উত্তর রিভিউ করার পেজ */}
        <Route
          path='/review-exam/:resultId'
          element={
            <ProtectedRoute>
              <ReviewExam />
            </ProtectedRoute>
          }
        />

        {/* টিচার ও স্টুডেন্টদের জন্য একাউন্ট পেজ */}
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        {/* টিচার স্পেশাল রাউটস */}
        <Route
          path='/create-question'
          element={
            <ProtectedRoute>
              <CreateQuestionPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/question-types'
          element={
            <ProtectedRoute>
              <QuestionTypesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-questions'
          element={
            <ProtectedRoute>
              <MyQuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-multiple-choice'
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/course-questions'
          element={
            <ProtectedRoute>
              <CourseQuestionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/student-results'
          element={
            <ProtectedRoute>
              <StudentResults />
            </ProtectedRoute>
          }
        />

        {/* এক্সাম রাউটস */}
        <Route
          path='/course/:courseName'
          element={
            <ProtectedRoute>
              <CourseDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/exam-preview/:courseName'
          element={
            <ProtectedRoute>
              <ExamPage />
            </ProtectedRoute>
          }
        />

        <Route path='/docs' element={<KnowledgeBase />} />

        {/* ভুল ইউআরএল হ্যান্ডলিং */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
