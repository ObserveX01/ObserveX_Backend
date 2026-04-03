import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Clock,
  ShieldAlert,
  Video,
  VideoOff,
  Play,
  Users,
  ScanSearch,
  Trophy,
  RefreshCw,
  Eye,
} from "lucide-react";

const ExamPage = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  // States
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [previousResult, setPreviousResult] = useState(null);

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false); // To show the Red Security Alert
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);

  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [aiWarning, setAiWarning] = useState("");

  // Refs for consistent state in event listeners
  const isStartedRef = useRef(isStarted);
  const isFinishedRef = useRef(isFinished);
  const isTerminatedRef = useRef(isTerminated);

  useEffect(() => {
    isStartedRef.current = isStarted;
    isFinishedRef.current = isFinished;
    isTerminatedRef.current = isTerminated;
  }, [isStarted, isFinished, isTerminated]);

  // 1. Initial Data Fetch
  useEffect(() => {
    const fetchData = async () => {
      const studentEmail = sessionStorage.getItem("userEmail");
      const decodedCourse = decodeURIComponent(courseName);
      try {
        const qRes = await fetch(
          "http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/questions/all",
        );
        const qData = await qRes.json();
        setQuestions(qData.filter((q) => q.courseName === decodedCourse));

        const rRes = await fetch(
          `http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/results/latest/${studentEmail}/${decodedCourse}`,
        );
        if (rRes.ok) {
          const rData = await rRes.json();
          // যদি ডাটা null না হয় তবেই সেট হবে
          if (rData) {
            setPreviousResult(rData);
          } else {
            setPreviousResult(null);
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseName]);

  // 2. Database Sync
  const saveResultToDatabase = useCallback(
    async (finalScore, total, answersList) => {
      const studentEmail = sessionStorage.getItem("userEmail");
      console.log("Submitting as email:", studentEmail); // Debug log to verify email retrieval
      const resultData = {
        StudentEmail: studentEmail,
        TeacherEmail: questions[0]?.teacherEmail || "N/A",
        TeacherName: questions[0]?.teacherName || "Sir",
        CourseName: decodeURIComponent(courseName),
        Score: finalScore,
        TotalQuestions: total,
        Percentage: parseFloat(((finalScore / total) * 100).toFixed(2)),
        Answers: answersList,
      };
      try {
        const response = await fetch(
          "http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/results/save",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resultData),
          },
        );

        if (response.ok) {
          console.log("✅ Data successfully synced with ExamResults & StudentAnswers");
        } else {
          const err = await response.json();
          console.error("❌ DB Sync Error:", err);
        }
      } catch (err) {
        console.error("❌ Network Error:", err);
      }
    },
    [questions, courseName],
  );
  // 3. Final Submission Logic
  const calculateResult = useCallback(() => {
    if (isFinishedRef.current) return;

    let correctCount = 0;
    const answersList = questions.map((q) => {
      const selectedOptionId = selectedAnswers[q.id];
      const correctOption = q.options.find((opt) => opt.isCorrect);
      const isCorrect = selectedOptionId === correctOption?.id;
      if (isCorrect) correctCount++;
      return { QuestionId: q.id, SelectedOptionId: selectedOptionId || 0, IsCorrect: isCorrect };
    });

    setScore(correctCount);
    setIsFinished(true);
    isFinishedRef.current = true;
    saveResultToDatabase(correctCount, questions.length, answersList);
  }, [questions, selectedAnswers, saveResultToDatabase]);

  // 4. INSTANT AUTO-SUBMIT ON VIOLATION (Tab/Window Blur)
  useEffect(() => {
    const handleFatalViolation = (reason) => {
      if (isStartedRef.current && !isFinishedRef.current && !isTerminatedRef.current) {
        setAiWarning(reason);
        setIsTerminated(true);
        calculateResult(); // Instant background submit
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") handleFatalViolation("TAB SWITCHING DETECTED");
    };

    const onBlur = () => handleFatalViolation("WINDOW FOCUS LOST");

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("blur", onBlur);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("blur", onBlur);
    };
  }, [calculateResult]);

  // 5. AI Analysis Loop (Every 1 second)
  const runAIProctoring = useCallback(async () => {
    if (webcamRef.current && isStarted && !isFinished && !isTerminated) {
      const imageSrc = webcamRef.current.getScreenshot({ quality: 0.8 });
      if (!imageSrc) return;
      const blob = await fetch(imageSrc).then((r) => r.blob());
      const formData = new FormData();
      formData.append("file", blob, "proctor_frame.jpg");

      try {
        const response = await fetch(
          "http://observexall-gwhfc3eabffxhhgj.centralindia-01.azurewebsites.net/api/proctor/analyze",
          {
            method: "POST",
            body: formData,
          },
        );
        const data = await response.json();
        if (data.violation) {
          setAiWarning(data.message.toUpperCase());
          setIsTerminated(true);
          calculateResult(); // Instant background submit
        }
      } catch (err) {
        console.error("AI Error:", err);
      }
    }
  }, [isStarted, isFinished, isTerminated, calculateResult]);

  useEffect(() => {
    let interval;
    if (isStarted && !isFinished && !isTerminated) {
      interval = setInterval(runAIProctoring, 1000);
    }
    return () => clearInterval(interval);
  }, [isStarted, isFinished, isTerminated, runAIProctoring]);

  // 6. Timer
  useEffect(() => {
    let timer;
    if (isStarted && !isFinished && !isTerminated && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isStarted && !isFinished) {
      calculateResult();
    }
    return () => clearInterval(timer);
  }, [isStarted, isFinished, isTerminated, timeLeft, calculateResult]);

  const handleRetakeAction = () => {
    setSelectedAnswers({});
    setTimeLeft(120);
    setScore(0);
    setIsFinished(false);
    isFinishedRef.current = false;
    setIsStarted(false);
    isStartedRef.current = false;
    setIsTerminated(false);
    setAiWarning("");
  };

  const handleOptionSelect = (questionId, optionId) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading)
    return <div className='flex justify-center items-center h-screen font-black text-slate-400'>SECURE LOADING...</div>;

  return (
    <div className='flex min-h-screen bg-[#f8fafc] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10 relative'>
        {/* --- EXACT SECURITY ALERT OVERLAY --- */}
        <AnimatePresence>
          {isTerminated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[1000] bg-[#1a1c26] flex items-center justify-center p-6 backdrop-blur-md'>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className='relative max-w-lg w-full bg-[#242736]/70 backdrop-blur-2xl border border-white/10 rounded-[3.5rem] p-12 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)]'>
                {/* Visual Red Glow inside the box */}
                <div className='absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/30 blur-[80px] rounded-full -z-10'></div>

                {/* The Red Shield Icon */}
                <div className='flex justify-center mb-8'>
                  <div className='bg-[#e22d2d] p-6 rounded-full shadow-[0_0_30px_rgba(226,45,45,0.4)]'>
                    <ShieldAlert size={64} strokeWidth={2.5} className='text-white' />
                  </div>
                </div>

                {/* Main Alert Text */}
                <h1 className='text-4xl font-black text-white uppercase tracking-tighter mb-6'>Security Alert!</h1>

                {/* Specific Violation Banner */}
                <div className='bg-[#e22d2d] text-white px-8 py-4 rounded-3xl mb-8 inline-block shadow-lg'>
                  <p className='text-xl font-black uppercase tracking-wide'>{aiWarning || "PROTOCOL BREACH"}</p>
                </div>

                {/* Subtext */}
                <p className='text-slate-400 text-sm font-medium leading-relaxed max-w-sm mx-auto mb-10'>
                  The ObserveX AI monitoring system has identified a protocol breach. This incident has been logged.
                </p>

                {/* Termination Footer */}
                <div className='flex flex-col gap-4'>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className='w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 py-4 rounded-2xl font-black uppercase text-sm transition-all'>
                    Return to Dashboard
                  </button>
                  <p className='text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse'>
                    Session Terminated & Data Synced
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {isFinished && !isTerminated ? (
          /* REGULAR RESULT VIEW (Shown only if finished normally) */
          <div className='max-w-3xl mx-auto mt-10 text-center bg-white p-12 rounded-[3rem] shadow-2xl'>
            <Trophy size={80} className='mx-auto text-emerald-500 mb-6' />
            <h1 className='text-4xl font-black text-slate-800 mb-2'>Exam Finished</h1>
            <div className='grid grid-cols-2 gap-6 my-10'>
              <div className='bg-slate-50 p-8 rounded-3xl'>
                <p className='text-xs font-black uppercase text-slate-400'>Correct</p>
                <h2 className='text-5xl font-black'>
                  {score} / {questions.length}
                </h2>
              </div>
              <div className='bg-slate-50 p-8 rounded-3xl'>
                <p className='text-xs font-black uppercase text-slate-400'>Score</p>
                <h2 className='text-5xl font-black text-[#00c288]'>
                  {Math.round((score / (questions.length || 1)) * 100)}%
                </h2>
              </div>
            </div>
            <button
              onClick={handleRetakeAction}
              className='bg-[#00c288] text-white w-full py-5 rounded-2xl font-black uppercase'>
              Retake Exam
            </button>
          </div>
        ) : !isStarted ? (
          /* RULES VIEW (Stage 1) */
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden'>
              <div className='bg-red-600 p-8 text-white flex justify-between items-center'>
                <div className='flex items-center gap-4'>
                  <ShieldAlert size={40} />
                  <h1 className='text-3xl font-black uppercase'>Secure Protocol</h1>
                </div>
              </div>
              <div className='p-10 space-y-8'>
                <div className='bg-slate-50 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 flex flex-col items-center'>
                  {isWebcamActive ? (
                    <div className='relative rounded-3xl overflow-hidden border-4 border-[#00c288] shadow-2xl mb-4 w-full max-w-sm aspect-video'>
                      <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat='image/jpeg'
                        className='w-full h-full object-cover'
                      />
                    </div>
                  ) : (
                    <div className='w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 mb-4'>
                      <VideoOff size={40} />
                    </div>
                  )}
                  <button
                    onClick={() => setIsWebcamActive(!isWebcamActive)}
                    className={`px-10 py-3 rounded-xl font-black transition-all ${isWebcamActive ? "bg-red-100 text-red-600" : "bg-[#00c288] text-white shadow-lg"}`}>
                    {isWebcamActive ? "Turn Off Camera" : "Enable & Verify Camera"}
                  </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <RuleItem
                    icon={<Eye className='text-red-600' />}
                    title='Instant Submission'
                    desc='Any attempt to leave this page or switch tabs will terminate the exam immediately.'
                  />
                  <RuleItem
                    icon={<ScanSearch className='text-red-600' />}
                    title='AI Sentinel'
                    desc='ObserveX AI monitors live for phones and multiple faces.'
                  />
                </div>
                <div className='flex justify-center'>
                  <button
                    disabled={!isWebcamActive}
                    onClick={() => setIsStarted(true)}
                    className={`bg-black text-white px-20 py-5 rounded-2xl font-black text-xl uppercase shadow-xl transition-all ${!isWebcamActive ? "opacity-30 cursor-not-allowed" : "hover:bg-slate-800 active:scale-95"}`}>
                    Start Secured Test
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ACTIVE EXAM UI (Stage 2) */
          <div className='max-w-5xl mx-auto'>
            <div className='flex justify-between items-center mb-10 sticky top-0 z-30 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-50'>
              <div>
                <h1 className='text-xl font-black text-slate-800 uppercase'>{decodeURIComponent(courseName)}</h1>
                <div className='flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest'>
                  <span className='w-2 h-2 bg-emerald-500 rounded-full animate-ping'></span> Secure Shield Active
                </div>
              </div>
              <div className='flex items-center gap-4'>
                <div className='w-24 h-16 bg-slate-900 rounded-lg border-2 border-red-500 relative flex items-center justify-center overflow-hidden shadow-lg'>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    className='w-full h-full object-cover opacity-80'
                  />
                </div>
                <div
                  className={`px-6 py-3 rounded-xl font-black text-white flex items-center gap-3 shadow-lg ${timeLeft < 30 ? "bg-red-600 animate-pulse" : "bg-slate-900"}`}>
                  <Clock size={20} />
                  <span className='text-lg tabular-nums'>{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            <div className='space-y-8 pb-32'>
              {questions.map((q, idx) => (
                <div key={q.id} className='bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100'>
                  <h2 className='text-2xl font-bold text-slate-800 mb-8'>
                    {idx + 1}. {q.text}
                  </h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        onClick={() => handleOptionSelect(q.id, opt.id)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 ${selectedAnswers[q.id] === opt.id ? "bg-[#00c288] border-[#00c288] text-white shadow-lg shadow-emerald-100" : "bg-white border-slate-100 hover:border-slate-300"}`}>
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswers[q.id] === opt.id ? "bg-white border-white" : "border-slate-300"}`}>
                          {selectedAnswers[q.id] === opt.id && (
                            <div className='w-3 h-3 bg-[#00c288] rounded-full'></div>
                          )}
                        </div>
                        <span className='font-black text-lg'>{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className='flex justify-center'>
                <button
                  onClick={calculateResult}
                  className='bg-black text-white px-24 py-6 rounded-3xl font-black text-2xl uppercase tracking-widest shadow-2xl flex items-center gap-4 active:scale-95 transition-all'>
                  Submit Exam <Send size={28} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const RuleItem = ({ icon, title, desc }) => (
  <div className='flex gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm'>
    <div className='bg-red-50 p-3 rounded-xl h-fit shadow-sm'>{icon}</div>
    <div>
      <h4 className='font-black text-slate-800 uppercase text-sm mb-1 tracking-tight'>{title}</h4>
      <p className='text-xs text-slate-500 leading-tight font-medium'>{desc}</p>
    </div>
  </div>
);

export default ExamPage;
