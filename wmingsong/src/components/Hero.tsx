import { useState, useEffect } from "react";
import { heroMP4 } from "../utils";

const ASCII_ART = `
⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
`;

function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const commandText = "fetch-profile";

  // Typewriter effect logic
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < commandText.length) {
        setTypedText((prev) => prev + commandText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 120);

    return () => clearInterval(typingInterval);
  }, []);

  // Crossfade effect logic (ASCII to Video)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wf-hlvh relative flex items-center justify-center bg-zinc-950 overflow-y-auto md:overflow-hidden py-6 md:py-0 px-4 md:px-8">

      {/* Main Terminal Window Wrapper */}
      <div className="w-full max-w-7xl rounded-2xl border-0 md:border border-zinc-800/50 bg-transparent md:bg-zinc-900/40 md:backdrop-blur-md md:shadow-[0_0_50px_-12px_rgba(139,92,246,0.15)] transition-all duration-500 overflow-hidden">
        
        {/* Terminal Header Bar (MacOS style) - Visible on Desktop only */}
        <div className="hidden md:flex items-center justify-between pl-20 pr-10 py-6 bg-zinc-950/50 border-b border-zinc-800/40 font-mono text-sm text-zinc-400">
          <div className="flex items-center gap-3">
            <span></span>
            <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 inline-block shadow-sm"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-500/80 inline-block shadow-sm"></span>
            <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 inline-block shadow-sm"></span>
          </div>
          <div className="font-semibold tracking-wider text-zinc-500 select-none">wmingsong - terminal</div>
          <div className="w-20"></div> {/* Spacer for symmetry */}
        </div>

        {/* Dynamic Inner Layout */}
        <div className="p-4 sm:p-8 md:pt-20 md:pb-14 md:px-14 flex flex-col md:flex-row gap-6 sm:gap-10 md:gap-24 items-center justify-center">
          
          {/* Left Side: Media Container (ASCII to Video Crossfade) */}
          <div className="order-2 md:order-1 w-full max-w-[340px] h-[220px] sm:max-w-[380px] sm:h-[260px] md:w-[450px] md:h-[310px] relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)] mx-auto flex items-center justify-center">
            
            {/* Layer 1: ASCII Art Portrait */}
            <pre
              className={`absolute inset-3.5 flex items-center justify-center font-mono text-[9px] min-[360px]:text-[11px] min-[390px]:text-xs sm:text-sm text-emerald-400/90 leading-tight select-none transition-all duration-1000 ease-in-out rounded-xl bg-zinc-900/30 p-4 ${
                showVideo ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
              }`}
            >
              {ASCII_ART}
            </pre>

            {/* Layer 2: Muted Looping Video */}
            <video
              src={heroMP4}
              className={`absolute inset-3.5 object-cover rounded-xl transition-all duration-1000 ease-in-out ${
                showVideo ? "opacity-25 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
              autoPlay
              muted
              loop
              playsInline
            />

            {/* Subtle retro scanline screen effect overlay */}
            <div className="absolute inset-0 rounded-xl pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] mix-blend-overlay" />
          </div>

          {/* Right Side: Data & Stats */}
          <div className="order-1 md:order-2 flex-1 w-full flex flex-col items-center text-center">
            
            {/* Desktop prompt display & Blinking Cursor */}
            <div className="hidden md:block font-mono text-emerald-400 mb-10 text-sm md:text-base border-b border-zinc-800/40 pb-2 w-full max-w-md">
              <span className="text-zinc-500">Top@wmingsong.com</span>
              <span className="text-violet-400"> ~ </span>
              <span className="text-zinc-300">% </span>
              <span className="text-emerald-400 font-semibold">{typedText}</span>
              <span className="inline-block w-2.5 h-4.5 bg-emerald-400 ml-1 translate-y-0.5 animate-cursor-blink"></span>
            </div>

            {/* Neofetch Key-Value pairs */}
            <div className="font-mono text-sm sm:text-base md:text-lg space-y-3.5 md:space-y-5.5 w-full max-w-md mx-auto">
              <div className="flex items-start w-full">
                <span className="text-violet-400 w-20 md:w-24 text-left font-semibold shrink-0">Name</span>
                <span className="text-zinc-500 mx-2 shrink-0">:</span>
                <span className="text-zinc-100 text-left flex-1">Woraphong Mingsong</span>
              </div>
              <div className="flex items-start w-full">
                <span className="text-violet-400 w-20 md:w-24 text-left font-semibold shrink-0">Role</span>
                <span className="text-zinc-500 mx-2 shrink-0">:</span>
                <span className="text-zinc-100 text-left flex-1">Cloud Engineer</span>
              </div>
              <div className="flex items-start w-full">
                <span className="text-violet-400 w-20 md:w-24 text-left font-semibold shrink-0">Stack</span>
                <span className="text-zinc-500 mx-2 shrink-0">:</span>
                <span className="text-zinc-300 text-left flex-1 leading-relaxed">
                  Automation, Architecture, CI/CD Pipelines, Containerisation, Monitoring
                </span>
              </div>
              <div className="flex items-start w-full">
                <span className="text-violet-400 w-20 md:w-24 text-left font-semibold shrink-0">Status</span>
                <span className="text-zinc-500 mx-2 shrink-0">:</span>
                <span className="text-zinc-100 text-left flex-1 font-medium">wmingsong.com v3</span>
              </div>
            </div>

            {/* Terminal Color blocks (Test pattern) */}
            <div className="flex gap-2 mt-8 md:mt-10 justify-center w-full">
              <span className="w-8 h-4 bg-zinc-800 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Black"></span>
              <span className="w-8 h-4 bg-red-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Red"></span>
              <span className="w-8 h-4 bg-emerald-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Green"></span>
              <span className="w-8 h-4 bg-yellow-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Yellow"></span>
              <span className="w-8 h-4 bg-blue-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Blue"></span>
              <span className="w-8 h-4 bg-violet-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Magenta"></span>
              <span className="w-8 h-4 bg-cyan-500 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="Cyan"></span>
              <span className="w-8 h-4 bg-zinc-300 rounded shadow-sm hover:scale-110 transition-transform duration-200" title="White"></span>
            </div>
            {/* Desktop Action Buttons - visible on Desktop below test pattern */}
            <div className="hidden md:flex items-center gap-6 mt-6 w-full max-w-md justify-center mx-auto">
              <a
                href="https://github.com/Ricesucooker"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-violet-500/50 hover:bg-zinc-800/80 text-zinc-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/woraphong-mingsong/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 hover:bg-zinc-800/80 text-zinc-100 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                LinkedIn
              </a>
              <a
                href="mailto:woraphong.mingsong@yahoo.com"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-zinc-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Send Email
              </a>
              <a
                href="https://www.dropbox.com/scl/fi/vngkd0iyg63cz02p7o1b4/Woraphong_Mingsong_CV.pdf?rlkey=8td930jqk6l8jqm43xefbg0ja&st=55fznpo7&e=1&dl=1"
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-zinc-300 shadow-sm transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Resume
              </a>
            </div>

          </div>

          {/* Mobile Layout Action Buttons (order-3) - visible on mobile only */}
          <div className="order-3 md:hidden flex items-center justify-center gap-4 w-full mt-6">
            <a
              href="https://github.com/Ricesucooker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[130px] sm:max-w-[145px] text-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-100 shadow-sm transition-all active:scale-95"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/woraphong-mingsong/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[130px] sm:max-w-[145px] text-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 shadow-sm transition-all active:scale-95"
            >
              LinkedIn
            </a>
            <a
              href="mailto:woraphong.mingsong@yahoo.com"
              className="flex-1 max-w-[130px] sm:max-w-[145px] text-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 shadow-sm transition-all active:scale-95"
            >
              Send Email
            </a>
               <a
              href="https://www.dropbox.com/scl/fi/vngkd0iyg63cz02p7o1b4/Woraphong_Mingsong_CV.pdf?rlkey=8td930jqk6l8jqm43xefbg0ja&st=55fznpo7&e=1&dl=1"
              className="flex-1 max-w-[130px] sm:max-w-[145px] text-center py-3 px-4 rounded-xl text-sm font-semibold bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/80 text-zinc-300 shadow-sm transition-all active:scale-95"
            >
              Resume
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Hero;
