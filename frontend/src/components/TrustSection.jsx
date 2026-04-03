import React from "react";

const TrustSection = () => {
  const logos = [
    {
      id: "rsm",
      content: (
        <div className='flex items-center gap-2 text-obs-gray'>
          <div className='flex flex-col gap-1'>
            <div className='w-10 h-1.5 bg-obs-gray'></div>
            <div className='w-12 h-1.5 bg-obs-gray'></div>
          </div>
          <span className='text-4xl font-black tracking-tighter ml-1'>RSM</span>
        </div>
      ),
    },
    {
      id: "esky",
      content: (
        <div className='flex items-end gap-1.5 text-obs-gray'>
          <span className='text-5xl font-bold lowercase tracking-tighter'>e</span>
          <div
            className='w-6 h-10 bg-obs-gray mb-2'
            style={{ clipPath: "polygon(0 0, 100% 40%, 100% 100%, 0 100%)" }}></div>
          <span className='text-4xl font-bold tracking-tighter'>Sky</span>
        </div>
      ),
    },
    {
      id: "uws",
      content: (
        <div className='flex items-center gap-4 text-obs-gray'>
          <span className='text-4xl font-serif font-light tracking-tight'>UWS</span>
          <div className='text-[11px] leading-tight font-bold uppercase border-l-2 border-obs-gray/60 pl-4 text-left'>
            University of the <br /> West of Scotland
          </div>
        </div>
      ),
    },
    {
      id: "zagreb",
      content: (
        <div className='flex items-center gap-4 text-obs-gray'>
          <div className='text-[10px] leading-tight font-bold text-right uppercase'>
            Poslovno Veleučilište <br /> Zagreb School <br /> Of Business
          </div>
          <div
            className='w-9 h-14 bg-obs-gray'
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 40% 100%, 40% 40%, 0 40%)" }}></div>
        </div>
      ),
    },
    {
      id: "db",
      content: (
        <div className='flex items-center gap-4 text-obs-gray'>
          <div className='border-[3px] border-obs-gray px-2 py-1 text-3xl font-black leading-none'>DB</div>
          <span className='text-4xl font-black tracking-tighter uppercase'>Schenker</span>
        </div>
      ),
    },
    {
      id: "hardrock",
      content: (
        <div className='relative flex items-center justify-center border-[4px] border-obs-gray rounded-full w-24 h-20 text-obs-gray'>
          <div className='text-center leading-none'>
            <div className='text-[15px] font-serif italic font-bold'>Hard Rock</div>
            <div className='h-0.5 w-14 bg-obs-gray my-1.5 mx-auto'></div>
            <div className='text-[10px] font-bold tracking-widest uppercase'>Cafe</div>
          </div>
        </div>
      ),
    },
    {
      id: "liquimoly",
      content: (
        <div className='border-[4px] border-obs-gray p-2.5 flex flex-col items-center justify-center leading-none text-obs-gray'>
          <span className='text-[20px] font-black uppercase tracking-tighter'>Liqui</span>
          <span className='text-[24px] font-black uppercase tracking-tighter'>Moly</span>
        </div>
      ),
    },
  ];

  return (
    <section className='bg-white py-24 overflow-hidden select-none'>
      <div className='max-w-7xl mx-auto px-6 text-center mb-24'>
        <h2 className='text-3xl md:text-5xl font-bold text-obs-dark mb-6'>
          Create online <span className='underline decoration-obs-dark/20 decoration-4 underline-offset-8'>tests</span>,{" "}
          <span className='underline decoration-obs-dark/20 decoration-4 underline-offset-8'>quizzes</span> and{" "}
          <span className='underline decoration-obs-dark/20 decoration-4 underline-offset-8'>exams</span>
        </h2>
        <div className='text-slate-500 text-lg md:text-xl space-y-1'>
          <p>We helped these great brands write their success stories. Join them now.</p>
          <p>Choose professional online assessment tool.</p>
        </div>
      </div>

      {/* 
          The "Seamless Wrapper":
          - We use 'w-max' so the container is exactly the width of its content.
          - We use a fixed 'gap-x-24' so spacing is perfectly even everywhere.
      */}
      <div className='relative flex overflow-hidden'>
        <div className='flex animate-infinite-scroll whitespace-nowrap items-center w-max gap-x-24 px-12'>
          {/* We render 2 identical sets. Because the animation goes to -50%, it loops invisibly. */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className='flex-none flex items-center justify-center transition-transform duration-300'>
              <div className='scale-110'>
                {" "}
                {/* Extra size boost */}
                {logo.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
