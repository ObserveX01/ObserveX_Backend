import React, { useState, useEffect } from "react";
import { AlertCircle, ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Loader2
import { Link, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isHoveringForm, setIsHoveringForm] = useState(false);

  // --- LOGIC STATES ---
  const [isLoggingIn, setIsLoggingIn] = useState(false); // For button spinner
  const [showSuccessLoader, setShowSuccessLoader] = useState(false); // For transition overlay

  const navigate = useNavigate();

  // --- Eye Tracking & Leaning Logic (KEEPING YOUR EXACT LOGIC) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const eyeY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (showPassword) {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  useEffect(() => {
    if (!showPassword) {
      mouseX.set(-15);
      mouseY.set(-5);
    } else if (!isHoveringForm) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [showPassword, isHoveringForm, mouseX, mouseY]);

  const leanRotation = !showPassword ? -12 : isHoveringForm ? 8 : 0;

  // --- UPDATED LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setError("Please enter your details and select your role.");
      return;
    }
    sessionStorage.clear();

    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPass) {
      sessionStorage.setItem("token", "admin-token-123");
      sessionStorage.setItem("userRole", "Admin");
      sessionStorage.setItem("userEmail", email);
      navigate("/dashboard", { replace: true });
      return;
    }

    setIsLoggingIn(true); // Start button loading

    try {
      const response = await fetch(
        "http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        },
      );
      const result = await response.json();

      if (response.ok) {
        setError("");
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("userRole", result.role);
        sessionStorage.setItem("userEmail", result.email);

        setIsLoggingIn(false);
        setShowSuccessLoader(true); // Show professional loader

        // Professional transition delay
        setTimeout(() => {
          if (result.role === "Admin") {
            navigate("/results-database", { replace: true });
          } else if (result.role === "Teacher") {
            navigate("/course-questions", { replace: true });
          } else {
            navigate("/dashboard", { replace: true });
          }
        }, 2500);
      } else {
        setIsLoggingIn(false);
        setError(result.message || "Invalid login credentials.");
      }
    } catch (err) {
      setIsLoggingIn(false);
      setError("Cannot connect to server.");
    }
  };

  const handleInputChange = (setter, value) => {
    setter(value);
    if (error) setError("");
  };

  return (
    <div className='relative flex min-h-screen bg-slate-50 font-sans overflow-hidden' onMouseMove={handleMouseMove}>
      {/* PROFESSIONAL SUCCESS OVERLAY */}
      <AnimatePresence>
        {showSuccessLoader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md'>
            <div className='relative'>
              <motion.img
                src={logo}
                alt='ObserveX Logo'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className='w-24 h-24'
              />
              <div className='absolute -inset-4 border-4 border-[#00c288] border-t-transparent rounded-full animate-spin'></div>
            </div>
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='mt-8 text-2xl font-black text-slate-900 tracking-tighter uppercase'>
              Signing you in...
            </motion.h2>
            <p className='text-slate-500 font-medium mt-1'>Entering your ObserveX dashboard</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LEFT SIDE: (UNCHANGED AS REQUESTED) */}
      <div className='hidden lg:flex w-1/2 bg-[#e8edf5] items-center justify-center relative'>
        <div className='relative w-[450px] h-[450px] flex items-end justify-center'>
          {/* PURPLE CHARACTER */}
          <motion.div
            animate={{
              rotate: leanRotation,
              y: [0, -10, 0],
              x: error ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            style={{ transformOrigin: "bottom center" }}
            transition={{ rotate: { type: "spring" }, y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
            className='absolute bottom-32 left-12 w-28 h-64 bg-[#747bff] rounded-t-[60px] z-10 flex flex-col items-center pt-12 shadow-sm'>
            <EyePair x={eyeX} y={eyeY} isSquinting={!showPassword} isError={!!error} />
            <motion.div
              animate={{ height: error ? 4 : showPassword ? 6 : 18, width: error ? 20 : 3, borderRadius: "100px" }}
              className='bg-black/20 mt-6'
            />
          </motion.div>

          {/* BLACK CHARACTER */}
          <motion.div
            animate={{
              rotate: leanRotation,
              y: showPassword ? [-15, -25, -15] : [0, -10, 0],
              x: error ? [0, -8, 8, -8, 8, 0] : 0,
            }}
            style={{ transformOrigin: "bottom center" }}
            transition={{
              rotate: { type: "spring" },
              y: { repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.3 },
            }}
            className='absolute bottom-20 left-48 w-24 h-52 bg-[#0f172a] rounded-t-[40px] z-20 flex flex-col items-center pt-10 shadow-sm'>
            <EyePair x={eyeX} y={eyeY} color='white' isSquinting={!showPassword} isError={!!error} />
            <motion.div
              animate={{ scale: error ? 1.5 : showPassword ? 1 : 0, opacity: showPassword || error ? 1 : 0 }}
              className='w-2 h-2 bg-white/20 rounded-full mt-4'
            />
          </motion.div>

          {/* ORANGE CHARACTER */}
          <motion.div
            animate={{
              rotate: leanRotation * 0.5,
              y: [0, -8, 0],
              scale: error ? 1 : [1, 1.02, 1],
              x: error ? [0, -15, 15, -15, 15, 0] : 0,
            }}
            style={{ transformOrigin: "bottom center" }}
            transition={{
              rotate: { type: "spring" },
              y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
              scale: error ? { duration: 0.2 } : { repeat: Infinity, duration: 2 },
            }}
            className='absolute bottom-0 left-0 w-64 h-52 bg-[#f97316] rounded-t-[130px] z-30 flex flex-col items-center pt-24 shadow-sm'>
            <EyePair x={eyeX} y={eyeY} scale={0.8} isSquinting={!showPassword} isError={!!error} />
            <motion.div
              animate={{
                width: error ? 24 : showPassword ? 24 : 16,
                height: error ? 8 : showPassword ? 10 : 2,
                borderRadius: error ? "100px 100px 0 0" : showPassword ? "0 0 100px 100px" : "4px",
                backgroundColor: error ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)",
              }}
              className='mt-4'
            />
          </motion.div>

          {/* YELLOW CHARACTER */}
          <motion.div
            animate={{ rotate: leanRotation, y: [0, -12, 0], x: error ? [0, -10, 10, -10, 10, 0] : 0 }}
            style={{ transformOrigin: "bottom center" }}
            transition={{
              rotate: { type: "spring" },
              y: { repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.1 },
            }}
            className='absolute bottom-0 left-72 w-40 h-40 bg-[#facc15] rounded-t-[80px] rounded-r-[80px] z-30 flex flex-col items-center pt-14 shadow-sm'>
            <EyePair x={eyeX} y={eyeY} isSquinting={!showPassword} isError={!!error} />
            <motion.div
              animate={{ width: error ? 8 : 14, x: error ? 2 : showPassword ? 0 : -3 }}
              className='h-[3px] bg-black/20 rounded-full mt-4'
            />
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div
        className={`w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-white transition-opacity duration-500 ${showSuccessLoader ? "opacity-0 scale-95" : "opacity-100"}`}>
        <Link to='/' className='flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity group'>
          <img src={logo} alt='ObserveX Logo' className='w-10 h-10 object-contain' />
          <span className='text-2xl font-bold text-[#1e293b] tracking-tight uppercase'>observeX</span>
        </Link>

        <div
          onMouseEnter={() => setIsHoveringForm(true)}
          onMouseLeave={() => setIsHoveringForm(false)}
          className={`w-full max-w-[480px] bg-white rounded-lg border shadow-xl p-12 transition-all ${error ? "border-red-200 shadow-red-100" : "border-slate-100"}`}>
          <h1 className='text-3xl font-bold text-[#1e293b] mb-2'>Sign in</h1>
          <p className='text-slate-400 mb-8 font-medium'>Welcome back! Please enter your details.</p>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className='mb-6 flex items-center gap-2 p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100'>
                <AlertCircle size={16} />
                <span className='font-semibold'>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className='space-y-6'>
            <div>
              <label className='block text-sm font-semibold text-[#1e293b] mb-2'>Enter your email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => handleInputChange(setEmail, e.target.value)}
                placeholder='name@gmail.com'
                disabled={isLoggingIn}
                className='w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#00c288] outline-none transition-all focus:bg-white bg-slate-50 font-medium'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-[#1e293b] mb-2'>Enter password</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleInputChange(setPassword, e.target.value)}
                  placeholder='••••••••'
                  disabled={isLoggingIn}
                  className='w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#00c288] outline-none transition-all focus:bg-white bg-slate-50 font-medium'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-3.5 text-slate-300 hover:text-[#00c288] transition-colors'>
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <div className='relative'>
              <label className='block text-sm font-semibold text-[#1e293b] mb-2'>Sign in as</label>
              <div className='relative'>
                <select
                  value={role}
                  onChange={(e) => handleInputChange(setRole, e.target.value)}
                  disabled={isLoggingIn}
                  className='w-full appearance-none px-4 py-3 rounded-lg border border-slate-200 focus:border-[#00c288] outline-none bg-slate-50 cursor-pointer text-slate-500 font-bold'>
                  <option value='' disabled>
                    Select your role
                  </option>
                  <option value='Student'>Student</option>
                  <option value='Teacher'>Teacher</option>
                  <option value='Admin'>Admin</option>
                </select>
                <ChevronDown size={18} className='absolute right-4 top-3.5 text-slate-300 pointer-events-none' />
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoggingIn}
              className='w-full bg-[#00c288] hover:bg-[#00b07c] text-white font-bold py-4 rounded-lg transition-all active:scale-[0.99] shadow-md text-lg flex items-center justify-center gap-2'>
              {isLoggingIn ? <Loader2 className='animate-spin' size={20} /> : "Sign in"}
            </button>
          </form>

          <div className='mt-8 pt-1 border-t border-slate-50'>
            <Link
              to='/signup'
              className='block w-full text-center border border-slate-200 py-3 rounded-lg font-bold text-[#1e293b] hover:bg-slate-50 transition-colors'>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const EyePair = ({ x, y, scale = 1, isSquinting = false, isError = false }) => (
  <div className='flex gap-4' style={{ transform: `scale(${scale})` }}>
    {[1, 2].map((i) => (
      <motion.div
        key={i}
        animate={{
          height: isError ? 22 : isSquinting ? 4 : 18,
          width: 18,
          borderRadius: isSquinting && !isError ? "2px" : "50%",
          scale: isError ? [1, 1.2, 1] : 1,
        }}
        className='bg-white flex items-center justify-center relative overflow-hidden shadow-sm'>
        <motion.div
          style={{ x, y }}
          animate={{ opacity: isSquinting && !isError ? 0 : 1 }}
          className={`w-2.5 h-2.5 bg-black rounded-full`}
        />
      </motion.div>
    ))}
  </div>
);

export default LoginPage;
