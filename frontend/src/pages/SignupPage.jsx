import React, { useState } from "react";
import { ShieldCheck, AlertCircle, ChevronDown, Loader2 } from "lucide-react"; // Added Loader2
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const SignupPage = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreed, setAgreed] = useState(false);

  // State for handling logic
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // For button state
  const [showSuccessLoader, setShowSuccessLoader] = useState(false); // For final transition

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !phone || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    const phoneRegex = /^01\d{9}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must start with 01 and be exactly 11 digits long.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!agreed) {
      setError("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const signupData = {
      email,
      phoneNumber: phone,
      password,
      role,
    };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitting(false);
        setShowSuccessLoader(true); // Trigger the loading animation

        // Wait for 3 seconds so the user sees the professional transition
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setIsSubmitting(false);
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError("Cannot connect to server. Is the backend running?");
    }
  };

  return (
    <div className='relative min-h-screen bg-slate-50 flex flex-col items-center pt-8 px-4 font-sans'>
      {/* 1. Standard Loading Overlay (Appears on success) */}
      {showSuccessLoader && (
        <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm transition-all duration-500'>
          <div className='relative'>
            <img src={logo} alt='ObserveX Logo' className='w-20 h-20 animate-pulse' />
            <div className='absolute -inset-2 border-4 border-[#00c288] border-t-transparent rounded-full animate-spin'></div>
          </div>
          <h2 className='mt-6 text-xl font-bold text-slate-800 tracking-tight'>Creating your account...</h2>
        </div>
      )}

      {/* Top Logo */}
      <Link to='/' className='flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity'>
        <img src={logo} alt='ObserveX Logo' className='w-10 h-10' />
        <span className='text-2xl font-bold tracking-tight text-slate-800 uppercase'>observeX</span>
      </Link>

      {/* Main Signup Card */}
      <div
        className={`w-full max-w-[480px] bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden transition-opacity duration-300 ${showSuccessLoader ? "opacity-0" : "opacity-100"}`}>
        <div className='p-10'>
          <h1 className='text-2xl font-bold text-slate-800 mb-2'>Sign up</h1>
          <p className='text-slate-500 mb-8'>Just one more step to create your first test!</p>

          {error && (
            <div className='mb-6 flex items-center gap-2 p-3 rounded bg-red-50 border border-red-200 text-red-600 text-sm animate-in fade-in zoom-in'>
              <AlertCircle size={16} className='shrink-0' />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className='space-y-5'>
            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Email address</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='name@gmail.com'
                disabled={isSubmitting}
                className='w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-[#00c288] transition-colors'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Phone number</label>
              <input
                type='tel'
                maxLength={11}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder='01XXXXXXXXX'
                disabled={isSubmitting}
                className='w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-[#00c288] transition-colors'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='••••••••'
                disabled={isSubmitting}
                className='w-full px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-[#00c288] transition-colors'
              />
            </div>

            <div className='relative'>
              <label className='block text-sm font-semibold text-slate-700 mb-2'>I am a...</label>
              <div className='relative'>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={isSubmitting}
                  className='w-full appearance-none px-4 py-3 rounded-md border border-slate-200 focus:outline-none focus:border-[#00c288] bg-white transition-colors cursor-pointer text-slate-700'>
                  <option value='' disabled>
                    Select your role
                  </option>
                  <option value='Student'>Student</option>
                  <option value='Teacher'>Teacher</option>
                  <option value='Admin'>Admin</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400'>
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            <div className='flex items-start gap-3 pt-2'>
              <input
                type='checkbox'
                id='terms-checkbox'
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className='mt-1 w-4 h-4 accent-[#00c288] cursor-pointer'
              />
              <label
                htmlFor='terms-checkbox'
                className='text-sm text-slate-600 leading-tight cursor-pointer select-none'>
                By signing up I agree to{" "}
                <Link to='/terms' className='text-[#00c288] font-bold hover:underline'>
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link to='/privacy' className='text-[#00c288] font-bold hover:underline'>
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-[#00c288] hover:bg-[#00b377] text-white font-bold py-3.5 rounded-md transition-all active:scale-[0.98] shadow-sm mt-2 flex items-center justify-center gap-2'>
              {isSubmitting ? <Loader2 className='animate-spin' size={20} /> : "Sign up"}
            </button>
          </form>
        </div>

        <div className='bg-[#f8fafc] border-t border-slate-100 p-8'>
          <h3 className='text-lg font-bold text-[#004242] mb-3'>Here to take a test?</h3>
          <p className='text-sm text-slate-600 leading-relaxed'>
            No need to sign up. Visit our{" "}
            <Link to='/help' className='text-[#00c288] hover:underline font-bold'>
              Help Center
            </Link>
            .
          </p>
        </div>
      </div>

      <div className='mt-8 text-slate-400 text-xs pb-8'>© 2026 ObserveX. All rights reserved.</div>
    </div>
  );
};

export default SignupPage;
