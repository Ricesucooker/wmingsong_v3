import React, { useState } from "react";

// TypeScript Interfaces
export interface FileTab {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export interface FileContentMap {
  [key: string]: string;
}

// Custom SVGs for File Types
const MarkdownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
);

const DatabaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);

// Tab Configuration (about_me.txt removed)
const TABS: FileTab[] = [
  { id: "readme.md", name: "readme.md", icon: <MarkdownIcon /> },
  { id: "experience.json", name: "experience.json", icon: <DatabaseIcon /> },
  { id: "network.json", name: "network.json", icon: <NetworkIcon /> },
];

// Content Data Structure
const FILE_CONTENTS: FileContentMap = {
  "readme.md": `# Hi, I'm Top.
I’m a Cloud & Support Engineer who likes making complicated tech feel simple. My career began in a fast-paced professional kitchen, where I learned how to handle high-pressure situations, solve problems quickly, and work well with a team. I brought that same energy into IT.
Today, my job is to make systems run better. I love using AI to help me understand complex architectures and build automation pipelines much faster. Whether it’s writing scripts to cut troubleshooting time by 70% or migrating entire networks to the cloud, I focus on building things that are efficient and easy to use.
When I’m not working, I’m usually at a local cafe with my terminal open. I’m always building something new—from serverless cloud projects to fast web apps. I believe that if you want to build something great, you first have to understand how it works under the hood.`,
  "experience.json": `{
  "career_objective": {
    "target_roles": "Cloud Engineer",
    "focus_areas": "System resilience, infrastructure automation, and cloud security architecture."
  },
  "technical_certifications": [
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Developer – Associate",
    "AWS Certified Cloud Practitioner",
    "Microsoft Azure Fundamentals (AZ-900)"
  ],
  "employment_history": [
    {
      "company": "ConnectWise",
      "role": "Software Support Specialist II",
      "timeline": "2023 - Present",
      "key_impacts": [
        "🚀 Reduced troubleshooting and log analysis resolution times by 70% by engineering custom PowerShell and Bash scripts.",
        "🛠️ Maintained system reliability and data integrity by diagnosing and hotfixing corrupted MySQL databases and application bugs."
      ]
    },
    {
      "company": "Wanstor",
      "role": "Technical Consultant",
      "timeline": "2019 - 2023",
      "key_impacts": [
        "☁️ Successfully engineered and executed a 300-device migration to Azure Intune and network infrastructure upgrades across 10 sites.",
        "⚙️ Designed and built a Windows Deployment Service (WDS) infrastructure that reduced corporate machine build times by 30%.",
        "🔑 Managed secure Identity Access Management (IAM) architectures across complex hybrid cloud environments."
      ]
    },
    {
      "company": "Wanstor",
      "role": "Service Desk Analyst",
      "timeline": "2017 - 2019",
      "key_impacts": [
        "📈 Maintained 100% strict SLA compliance for enterprise-level critical incidents using remote group policies.",
        "⚡ Executed high-stakes infrastructure and database upgrades (Oracle SQL / POS systems) ensuring zero operational downtime for corporate clients."
      ]
    }
  ]
}`,
  "network.json": `{\n  "linkedin": "https://www.linkedin.com/in/woraphong-mingsong/",\n  "github": "https://github.com/Ricesucooker"\n}`,
};

function FileExplorer() {
  const [activeFile, setActiveFile] = useState<string>("readme.md");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const activeContent = FILE_CONTENTS[activeFile] || "";
  const lines = activeContent.split("\n");

  const activeTab = TABS.find((t) => t.id === activeFile) || TABS[0];

  // A basic client-side syntax highlighter for code block rows
  const highlightLine = (line: string, index: number) => {
    // Render blank lines correctly
    if (!line.trim()) return <span>&nbsp;</span>;

    // Check file type specific overrides
    if (activeFile === "readme.md") {
      // Heading highlighting
      if (line.startsWith("#")) {
        return <span className="text-emerald-400 font-bold select-all">{line}</span>;
      }
      // Codeblock fence highlighting
      if (line.startsWith("```")) {
        return <span className="text-zinc-500 italic select-none">{line}</span>;
      }

      // Inside markdown python code blocks formatting
      // Lines index boundaries check (lines 8 to 22 in readme.md strings)
      if (index >= 7 && index <= 20) {
        // Comments
        if (line.includes("#")) {
          const parts = line.split("#");
          return (
            <span>
              <span className="text-zinc-300">{parts[0]}</span>
              <span className="text-zinc-500 italic">#{parts[1]}</span>
            </span>
          );
        }
        // Imports
        if (line.startsWith("from ") || line.startsWith("import ")) {
          const words = line.split(" ");
          return (
            <span>
              <span className="text-violet-400 font-semibold">{words[0]} </span>
              <span className="text-zinc-100">{words[1]} </span>
              {words[2] && <span className="text-violet-400 font-semibold">{words[2]} </span>}
              {words.slice(3).map((w, idx) => (
                <span key={idx} className={w.endsWith(",") ? "text-cyan-400" : "text-cyan-400"}>{w} </span>
              ))}
            </span>
          );
        }
        // Functions
        if (line.startsWith("def ")) {
          return (
            <span>
              <span className="text-violet-400 font-semibold">def </span>
              <span className="text-cyan-400 font-medium">get_age_level</span>
              <span className="text-zinc-300">():</span>
            </span>
          );
        }
        // Return statement
        if (line.includes("return ")) {
          return (
            <span>
              <span className="text-violet-400 font-semibold">&nbsp;&nbsp;&nbsp;&nbsp;return </span>
              <span className="text-zinc-100">level</span>
            </span>
          );
        }
        // Strings & Variable definitions
        if (line.includes(" = ")) {
          const eqParts = line.split(" = ");
          const val = eqParts[1].trim();
          let styledVal = <span className="text-zinc-300">{val}</span>;
          if (val.startsWith('"') || val.startsWith("'")) {
            styledVal = <span className="text-emerald-400">{val}</span>;
          } else if (!isNaN(Number(val))) {
            styledVal = <span className="text-amber-500">{val}</span>;
          }
          return (
            <span>
              <span className="text-zinc-100">{eqParts[0]}</span>
              <span className="text-violet-400"> = </span>
              {styledVal}
            </span>
          );
        }
      }
    } else if (activeFile.endsWith(".json")) {
      const trimmed = line.trim();
      if (!trimmed) return <span>&nbsp;</span>;

      // Punctuation characters (brackets, braces, commas)
      if (/^[\{\}\[\]\s,]+$/.test(trimmed)) {
        return <span className="text-zinc-400 font-semibold">{line}</span>;
      }

      // Key-value mapping pairs
      if (line.includes(":")) {
        const colonIdx = line.indexOf(":");
        const keyPart = line.substring(0, colonIdx);
        const valPart = line.substring(colonIdx + 1);

        let valStyled = <span className="text-zinc-300">{valPart}</span>;
        const trimmedVal = valPart.trim();
        if (trimmedVal.startsWith('"')) {
          // It's a string value, let's keep brackets/commas at the end of the string clean
          const startQuoteOffset = valPart.indexOf('"');
          const endQuoteIdx = valPart.lastIndexOf('"');
          const rawUrl = valPart.substring(startQuoteOffset + 1, endQuoteIdx);
          const isUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://");

          valStyled = (
            <span>
              <span className="text-zinc-400">{valPart.substring(0, startQuoteOffset)}</span>
              {isUrl ? (
                <a
                  href={rawUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 cursor-pointer transition-colors duration-200"
                >
                  "{rawUrl}"
                </a>
              ) : (
                <span className="text-emerald-400">{valPart.substring(startQuoteOffset, endQuoteIdx + 1)}</span>
              )}
              <span className="text-zinc-400">{valPart.substring(endQuoteIdx + 1)}</span>
            </span>
          );
        } else if (/^\d/.test(trimmedVal) || trimmedVal.startsWith("true") || trimmedVal.startsWith("false")) {
          // Numbers or booleans
          const commaIdx = valPart.indexOf(",");
          if (commaIdx !== -1) {
            valStyled = (
              <span>
                <span className="text-amber-500">{valPart.substring(0, commaIdx)}</span>
                <span className="text-zinc-400">{valPart.substring(commaIdx)}</span>
              </span>
            );
          } else {
            valStyled = <span className="text-amber-500">{valPart}</span>;
          }
        } else {
          // Object/array openers or fallbacks
          valStyled = <span className="text-zinc-400">{valPart}</span>;
        }

        return (
          <span>
            <span className="text-violet-400 font-semibold">{keyPart}</span>
            <span className="text-zinc-500">:</span>
            {valStyled}
          </span>
        );
      }

      // Array strings (e.g. "AWS Certified...")
      if (line.includes('"')) {
        const startQuoteIdx = line.indexOf('"');
        const endQuoteIdx = line.lastIndexOf('"');
        return (
          <span>
            <span className="text-zinc-500">{line.substring(0, startQuoteIdx)}</span>
            <span className="text-emerald-400">{line.substring(startQuoteIdx, endQuoteIdx + 1)}</span>
            <span className="text-zinc-400">{line.substring(endQuoteIdx + 1)}</span>
          </span>
        );
      }

      return <span className="text-zinc-400">{line}</span>;
    }

    return <span className="text-zinc-300">{line}</span>;
  };

  return (
    <div className="page-wf-hlvh relative flex items-center justify-center bg-zinc-950 overflow-y-auto md:overflow-hidden py-6 md:py-0 px-4 md:px-8">

      {/* Main Folder Explorer Window Wrapper */}
      <div className="w-full max-w-7xl transition-all duration-500 relative z-10">
        
        {/* Desktop Tabs (Hidden on mobile) */}
        <div className="hidden md:flex gap-1.5 pl-4">
          {TABS.map((tab) => {
            const isActive = activeFile === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFile(tab.id)}
                className={`px-6 py-3 text-sm font-mono flex items-center gap-2 border-t border-x rounded-t-xl transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-zinc-900/40 text-emerald-400 border-zinc-800/80 z-10 -mb-[1px] font-semibold"
                    : "bg-zinc-950/80 text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-zinc-900/20"
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Mobile Dropdown Header (Hidden on desktop) */}
        <div className="md:hidden relative mb-3">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-5 py-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl font-mono text-sm text-zinc-100 flex items-center justify-between cursor-pointer focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              {activeTab.icon}
              <span className="font-semibold text-emerald-400">{activeTab.name}</span>
            </div>
            <svg
              className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {/* Dropdown Options */}
          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+6px)] left-0 right-0 bg-zinc-950/95 border border-zinc-800/80 rounded-xl overflow-hidden shadow-2xl z-30 font-mono text-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFile(tab.id);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-5 py-3 text-left flex items-center gap-2.5 cursor-pointer border-b border-zinc-900/40 last:border-0 hover:bg-zinc-900/40 transition-colors ${
                    activeFile === tab.id ? "text-emerald-400 bg-zinc-900/20 font-medium" : "text-zinc-400"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Viewport Area */}
        <div className="border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-md rounded-2xl md:rounded-tl-none p-3 md:p-8 h-[72dvh] md:h-auto min-h-[60dvh] md:min-h-[420px] max-h-[75dvh] md:max-h-[550px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-y-auto flex flex-col justify-start">
          <div className="font-mono text-xs sm:text-sm leading-relaxed select-text space-y-0.5 w-full">
            {lines.map((line, i) => (
              <div key={i} className="flex items-start min-h-[1.5rem] w-full py-0.5">
                <span className="select-none text-zinc-600 text-right pr-2 md:pr-4 border-r border-zinc-800/50 min-w-[2rem] md:min-w-[2.5rem] shrink-0 font-medium mr-2 md:mr-4">
                  {i + 1}
                </span>
                <span className="text-zinc-300 flex-1 whitespace-pre-wrap break-words pr-2">
                  {highlightLine(line, i)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default FileExplorer;
