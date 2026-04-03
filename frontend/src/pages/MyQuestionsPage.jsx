import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { Plus, Copy, Trash2, Tag, Sparkles, Edit3, CheckCircle2, Save, X } from "lucide-react";

const MyQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();
  const teacherEmail = sessionStorage.getItem("userEmail");

  const fetchQuestions = () => {
    fetch(`http://observexx-dvc7f4hhhmfxbedx.centralindia-01.azurewebsites.net/api/questions/${teacherEmail}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // এডিট মুড চালু করা
  const handleEditClick = (q) => {
    setEditId(q.id);
    setEditData({ ...q });
  };

  // এডিট সেভ করা
  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://observexx-dvc7f4hhhmfxbedx.centralindia-01.azurewebsites.net/api/questions/${editId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editData),
        },
      );

      if (res.ok) {
        setEditId(null);
        fetchQuestions();
        alert("Updated successfully!");
      }
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this question? This will also remove any student records for this specific question.",
      )
    ) {
      try {
        const res = await fetch(
          `http://observexx-dvc7f4hhhmfxbedx.centralindia-01.azurewebsites.net/api/questions/${id}`,
          {
            method: "DELETE",
          },
        );

        if (res.ok) {
          // UI থেকে সাথে সাথে রিমুভ করা
          setQuestions(questions.filter((q) => q.id !== id));
          alert("Question and associated data erased!");
        }
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className='flex min-h-screen bg-[#f1f5f9] font-sans'>
      <Sidebar />
      <main className='flex-1 ml-64 p-10'>
        <h1 className='text-2xl font-bold mb-8 text-slate-800'>My Questions</h1>

        <div className='space-y-6'>
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-8 shadow-sm transition-all ${editId === q.id ? "ring-2 ring-emerald-500" : ""}`}>
              {/* HEADER AREA */}
              <div className='flex justify-between items-start mb-6'>
                <div className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                  {idx + 1} MULTIPLE CHOICE • 30 sec • 1 Pt
                </div>

                <div className='flex gap-4'>
                  {editId === q.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className='flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-lg hover:bg-emerald-100'>
                        <Save size={16} /> Save
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className='flex items-center gap-1 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100'>
                        <X size={16} /> Cancel
                      </button>
                    </>
                  ) : (
                    <div className='flex gap-4'>
                      {/* Edit Button */}
                      <button
                        onClick={() => handleEditClick(q)}
                        className='flex items-center gap-1 text-slate-700 font-bold hover:text-emerald-600 transition-colors'>
                        <Edit3 size={16} /> Edit
                      </button>

                      {/* Delete Button (Added) */}
                      <button
                        onClick={() => handleDelete(q.id)}
                        className='flex items-center gap-1 text-slate-400 font-bold hover:text-red-600 transition-colors'>
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTENT AREA */}
              {editId === q.id ? (
                // EDITING MODE UI
                <div className='space-y-6'>
                  <textarea
                    className='w-full text-xl font-bold text-slate-800 border-b-2 border-emerald-500 outline-none p-2 bg-slate-50 rounded'
                    value={editData.text}
                    onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                  />
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {editData.options.map((opt, i) => (
                      <div key={i} className='flex items-center gap-3 bg-slate-50 p-3 rounded-lg border'>
                        <input
                          type='radio'
                          name={`correct-${q.id}`}
                          checked={opt.isCorrect}
                          onChange={() => {
                            const newOptions = editData.options.map((o, index) => ({ ...o, isCorrect: i === index }));
                            setEditData({ ...editData, options: newOptions });
                          }}
                        />
                        <input
                          className='bg-transparent outline-none w-full font-medium'
                          value={opt.text}
                          onChange={(e) => {
                            const newOptions = [...editData.options];
                            newOptions[i].text = e.target.value;
                            setEditData({ ...editData, options: newOptions });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // DISPLAY MODE UI (Static)
                <>
                  <h2 className='text-xl font-bold text-slate-800 mb-8'>{q.text}</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4'>
                    {q.options.map((opt, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${opt.isCorrect ? "bg-green-500 border-green-500 text-white" : "border-slate-300"}`}>
                          {opt.isCorrect && <CheckCircle2 size={12} />}
                        </div>
                        <span className={`text-lg ${opt.isCorrect ? "text-slate-800 font-medium" : "text-slate-500"}`}>
                          {opt.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MyQuestionsPage;
