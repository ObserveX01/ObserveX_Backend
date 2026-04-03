import React, { useState } from "react";
import { Trash2, CheckCircle2, Plus, Send, Book } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditorPage = () => {
  const navigate = useNavigate();
  const teacherEmail = sessionStorage.getItem("userEmail");

  const [courseName, setCourseName] = useState("");
  const [questionsList, setQuestionsList] = useState([]);

  // State for the question currently being typed
  const [currentText, setCurrentText] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false, color: "bg-[#2d70ae]" },
    { text: "", isCorrect: false, color: "bg-[#2d9da6]" },
    { text: "", isCorrect: false, color: "bg-[#efa929]" },
    { text: "", isCorrect: false, color: "bg-[#d5546d]" },
  ]);

  // 1. Logic to convert current screen inputs into a question object
  const validateAndCreateCurrentQuestion = () => {
    if (!currentText.trim()) return null;

    if (!options.some((o) => o.isCorrect)) {
      alert("Please select a correct answer for the current question.");
      return "ERROR";
    }

    if (options.some((o) => !o.text.trim())) {
      alert("Please fill in all answer options for the current question.");
      return "ERROR";
    }

    // --- NEW LOGIC: Check for duplicate options ---
    // সব অপশন থেকে টেক্সট গুলো নিয়ে trim এবং lowercase করা হচ্ছে যাতে 'Apple' আর 'apple' এক হিসেবে ধরা হয়
    const optionTexts = options.map((o) => o.text.trim().toLowerCase());

    // Set ব্যবহার করে চেক করা হচ্ছে ইউনিক ভ্যালু কয়টি আছে
    const uniqueOptions = new Set(optionTexts);

    if (uniqueOptions.size !== optionTexts.length) {
      alert("All answer options must be unique. You cannot have the same text in multiple choices.");
      return "ERROR";
    }

    return {
      text: currentText,
      type: "MULTIPLE CHOICE",
      options: options.map((o) => ({
        text: o.text,
        isCorrect: o.isCorrect,
      })),
    };
  };

  // 2. Add current question to the local queue (NEXT QUESTION button)
  const addQuestionToList = () => {
    const newQ = validateAndCreateCurrentQuestion();

    if (newQ === "ERROR") return;
    if (newQ === null) {
      alert("Please type a question first.");
      return;
    }

    setQuestionsList([...questionsList, newQ]);

    // Reset fields for the next question
    setCurrentText("");
    setOptions(options.map((o) => ({ ...o, text: "", isCorrect: false })));
  };

  // 3. Submit everything (ALL DONE button)
  const handleFinishCourse = async () => {
    if (!courseName.trim()) return alert("Please enter a Course Name first.");

    let finalQuestionsToSave = [...questionsList];
    const currentQ = validateAndCreateCurrentQuestion();

    if (currentQ === "ERROR") return;

    if (currentQ !== null) {
      finalQuestionsToSave.push(currentQ);
    }

    if (finalQuestionsToSave.length === 0) {
      return alert("Please add at least one question.");
    }

    // Prepare payload
    const payload = finalQuestionsToSave.map((q) => ({
      courseName: courseName,
      teacherEmail: teacherEmail,
      text: q.text,
      type: q.type,
      options: q.options.map((opt) => ({
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }));

    try {
      const res = await fetch("/api/questions/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(`Success! Saved ${finalQuestionsToSave.length} questions to ${courseName}.`);
        navigate("/course-questions");
      } else {
        const errorData = await res.json();
        alert("Error: " + (errorData.message || "Failed to save course."));
      }
    } catch (err) {
      console.error("Connection Error:", err);
      alert("Could not connect to server.");
    }
  };

  return (
    <div className='min-h-screen bg-[#461a42] p-10 flex flex-col items-center'>
      {/* Course Title */}
      <div className='w-full max-w-6xl mb-8 flex flex-col md:flex-row items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/5'>
        <div className='flex items-center gap-3 flex-1 w-full'>
          <Book className='text-emerald-400' size={24} />
          <input
            placeholder='Enter Course Name...'
            className='bg-transparent border-b-2 border-white/20 text-white text-2xl w-full outline-none p-2 focus:border-emerald-400 transition-colors'
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className='bg-emerald-500/20 px-6 py-2 rounded-full border border-emerald-500/50 text-emerald-400 font-bold text-sm'>
          Already in Queue: {questionsList.length}
        </div>
      </div>

      {/* Question Textarea */}
      <div className='w-full max-w-6xl bg-[#361333] rounded-3xl p-10 mb-8 border border-white/10 shadow-2xl'>
        <textarea
          placeholder='Type your question here...'
          className='w-full bg-transparent text-center text-3xl text-white outline-none h-32 placeholder-white/20 resize-none font-medium'
          value={currentText}
          onChange={(e) => setCurrentText(e.target.value)}
        />
      </div>

      {/* Options */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
        {options.map((opt, i) => (
          <div
            key={i}
            className={`${opt.color} rounded-2xl p-6 h-64 relative flex flex-col items-center justify-center shadow-lg border-b-8 border-black/20 transform hover:scale-[1.02] transition-all`}>
            <button
              onClick={() => setOptions(options.map((o, idx) => ({ ...o, isCorrect: i === idx })))}
              className={`absolute top-4 right-4 rounded-full border-2 p-1.5 transition-all ${
                opt.isCorrect ? "bg-white text-green-600 border-white shadow-lg" : "border-white/30 text-transparent"
              }`}>
              <CheckCircle2 size={20} />
            </button>
            <textarea
              placeholder='Type answer...'
              className='bg-transparent text-center text-white placeholder-white/40 outline-none w-full h-full mt-10 resize-none text-xl font-bold'
              value={opt.text}
              onChange={(e) => {
                const newOpts = [...options];
                newOpts[i].text = e.target.value;
                setOptions(newOpts);
              }}
            />
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className='mt-16 flex flex-col md:flex-row gap-6 w-full max-w-6xl justify-center items-center'>
        <button
          onClick={addQuestionToList}
          className='w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95'>
          <Plus size={24} /> NEXT QUESTION
        </button>

        <button
          onClick={handleFinishCourse}
          className='w-full md:w-auto bg-white hover:bg-slate-100 text-[#461a42] px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95'>
          <Send size={24} /> ALL DONE, SAVE COURSE
        </button>
      </div>
    </div>
  );
};

export default EditorPage;
