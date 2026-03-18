// import React, { useState } from "react";

// const Home = () => {
//   const [userInput, setUserInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showRoadmap, setShowRoadmap] = useState(false);
//   const [showFlowchart, setShowFlowchart] = useState(false);

//   const handleGenerate = async () => {
//     if (!userInput.trim()) return;
//     setLoading(true);
//     setError("");
//     setOutput("");
//     setShowRoadmap(false);
//     setShowFlowchart(false);

//     try {
//       const res = await fetch("https://careerwise-backend.onrender.com/api/generate-career", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ userInput }),
// });


//       const data = await res.json();
//       if (res.ok) {
//         setOutput(data.output);
//       } else {
//         setError("Something went wrong while fetching career advice.");
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError("Network error or server is down.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start px-4 py-10">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4">CareerWiseAI</h1>
//       <p className="text-center max-w-2xl text-gray-700 text-lg mb-6">
//         Describe your interests or goals, and let CareerWiseAI recommend the best career path for you.
//       </p>

//       <textarea
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="e.g. I love to dance"
//         className="w-full max-w-2xl h-32 p-4 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//       />

//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {loading ? "Generating..." : "Get Career Advice"}
//       </button>

//       {output && (
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={() => setShowRoadmap(!showRoadmap)}
//             className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
//           >
//             {showRoadmap ? "Hide Roadmap" : "Show Roadmap"}
//           </button>
//           <button
//             onClick={() => setShowFlowchart(!showFlowchart)}
//             className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
//           >
//             {showFlowchart ? "Hide Flowchart" : "Show Flowchart"}
//           </button>
//         </div>
//       )}

//       {error && (
//         <p className="mt-4 text-red-600 font-medium">{error}</p>
//       )}

//       {output && (showRoadmap || showFlowchart) && (
//         <div className="mt-10 max-w-3xl w-full bg-white border border-blue-200 rounded-2xl shadow-xl p-6 space-y-6 animate-fade-in backdrop-blur-sm">
//           <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
//             📘 Career Overview
//           </h2>

//           {showRoadmap && (
//             <>
//               <h3 className="text-2xl font-semibold text-blue-600">🔧 Required Skills</h3>
//               <ul className="list-disc pl-6 space-y-2 text-gray-800 text-[15px]">
//                 <li><span className="font-semibold text-blue-700">Math & Physics:</span> Strong core engineering foundation.</li>
//                 <li><span className="font-semibold text-blue-700">Problem Solving:</span> Sharp analytical mindset to tackle challenges.</li>
//                 <li><span className="font-semibold text-blue-700">CAD Tools:</span> Proficient in SolidWorks, AutoCAD, etc.</li>
//               </ul>

//               <h3 className="text-2xl font-semibold text-blue-600 mt-6">📚 Learning Roadmap</h3>

//               <div>
//                 <p className="text-lg font-semibold text-blue-500">🎓 Education</p>
//                 <p className="text-gray-700 text-[15px]">
//                   Pursue B.Tech or B.Sc in Mechanical or Automotive Engineering. Optionally pursue a Master's for career growth.
//                 </p>
//               </div>

//               <div>
//                 <p className="text-lg font-semibold text-blue-500 mt-4">🛠️ Skill Development</p>
//                 <ul className="list-disc pl-6 text-gray-700 text-[15px] space-y-1">
//                   <li>Learn CAD software</li>
//                   <li>Learn Python or MATLAB</li>
//                   <li>Intern at automobile firms or design labs</li>
//                 </ul>
//               </div>

//               <div>
//                 <p className="text-lg font-semibold text-blue-500 mt-4">🌐 Professional Development</p>
//                 <ul className="list-disc pl-6 text-gray-700 text-[15px] space-y-1">
//                   <li>Attend expos, network with professionals</li>
//                   <li>Earn certifications like Six Sigma, EV tech</li>
//                   <li>Build a strong GitHub or portfolio</li>
//                 </ul>
//               </div>

//               <div>
//                 <h3 className="text-2xl font-semibold text-blue-600 mt-6">🏫 Best Colleges</h3>
//                 <ul className="list-disc pl-6 text-gray-800 text-[15px] space-y-2">
//                   <li>IIT Madras</li>
//                   <li>DTU (Delhi Technological University)</li>
//                   <li>MIT Manipal</li>
//                   <li>SRM University</li>
//                   <li>VIT Vellore</li>
//                 </ul>
//               </div>

//               <p className="text-sm italic text-gray-600 mt-4">
//                 💡 Pro Tip: Document your journey. Share your projects online to gain visibility!
//               </p>
//             </>
//           )}

//           {showFlowchart && (
//   <div className="w-full">
//     <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">🧭 Career Path Flowchart</h3>

//     <div className="flex flex-col items-center space-y-6">

//       {/* Step 1 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           🚀
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Start with Passion</p>
//           <p className="text-sm text-gray-600">Identify what you love and your core strengths.</p>
//         </div>
//       </div>

//       {/* Arrow */}
//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Step 2 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           🎓
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Choose Relevant Education</p>
//           <p className="text-sm text-gray-600">Pursue a degree aligned with your career field.</p>
//         </div>
//       </div>

//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Step 3 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           🛠️
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Build Core Skills</p>
//           <p className="text-sm text-gray-600">Master tools, software, and domain-specific knowledge.</p>
//         </div>
//       </div>

//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Step 4 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           📋
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Intern & Network</p>
//           <p className="text-sm text-gray-600">Apply your skills in real-world projects and build connections.</p>
//         </div>
//       </div>

//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Step 5 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           📚
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Earn Certifications</p>
//           <p className="text-sm text-gray-600">Boost your profile with niche certifications.</p>
//         </div>
//       </div>

//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Step 6 */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           🎯
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Apply for Jobs</p>
//           <p className="text-sm text-gray-600">Craft resumes, prepare for interviews & apply confidently.</p>
//         </div>
//       </div>

//       <div className="text-2xl text-blue-400 animate-bounce">↓</div>

//       {/* Final Step */}
//       <div className="flex items-center space-x-4">
//         <div className="bg-blue-100 p-4 rounded-full shadow-md text-blue-700">
//           🏆
//         </div>
//         <div className="bg-white border border-blue-200 p-4 rounded-xl shadow-md text-center w-64">
//           <p className="font-semibold text-blue-700">Grow & Lead</p>
//           <p className="text-sm text-gray-600">Advance, mentor others, and lead with purpose.</p>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;




// // import React, { useState } from "react";

// // const Home = () => {
// //   const [userInput, setUserInput] = useState("");
// //   const [output, setOutput] = useState({ roadmap: "", flowchart: "" });
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [showRoadmap, setShowRoadmap] = useState(false);
// //   const [showFlowchart, setShowFlowchart] = useState(false);

// //   const handleGenerate = async () => {
// //     if (!userInput.trim()) return;
// //     setLoading(true);
// //     setError("");
// //     setOutput({ roadmap: "", flowchart: "" });
// //     setShowRoadmap(false);
// //     setShowFlowchart(false);

// //     try {
// //       const res = await fetch("http://localhost:8000/api/generate-career", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ userInput }),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         setOutput({
// //           roadmap: data.roadmap || "No roadmap provided.",
// //           flowchart: data.flowchart || "No flowchart provided.",
// //         });
// //       } else {
// //         setError("Something went wrong while fetching career advice.");
// //       }
// //     } catch (err) {
// //       setError("Network error or server is down.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start px-4 py-10">
// //       <h1 className="text-4xl font-extrabold text-blue-700 mb-2">🚀 CareerWiseAI</h1>
// //       <p className="text-center max-w-2xl text-gray-700 text-lg mb-6">
// //         🎯 <span className="font-semibold text-blue-600">Find your perfect career path!</span><br />
// //         Describe your goal or passion and let our AI mentor you with a personalized roadmap & step-by-step guidance. 🧭
// //       </p>

// //       <textarea
// //         value={userInput}
// //         onChange={(e) => setUserInput(e.target.value)}
// //         placeholder="e.g. I love building websites, coding, or solving problems"
// //         className="w-full max-w-2xl h-32 p-4 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
// //       />

// //       <button
// //         onClick={handleGenerate}
// //         disabled={loading}
// //         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
// //       >
// //         {loading ? "🔄 Generating..." : "✨ Get Career Advice"}
// //       </button>

// //       {(output.roadmap || output.flowchart) && (
// //         <div className="flex gap-4 mt-4">
// //           <button
// //             onClick={() => setShowRoadmap(!showRoadmap)}
// //             className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
// //           >
// //             {showRoadmap ? "🔽 Hide Roadmap" : "🛣️ Show Roadmap"}
// //           </button>
// //           <button
// //             onClick={() => setShowFlowchart(!showFlowchart)}
// //             className="px-4 py-2 bg-white border border-purple-500 text-purple-700 rounded-md hover:bg-purple-100 transition"
// //           >
// //             {showFlowchart ? "🔽 Hide Flowchart" : "📊 Show Flowchart"}
// //           </button>
// //         </div>
// //       )}

// //       {error && (
// //         <p className="mt-4 text-red-600 font-medium">❌ {error}</p>
// //       )}

// //       {(output.roadmap || output.flowchart) && (showRoadmap || showFlowchart) && (
// //         <div className="mt-10 max-w-3xl w-full bg-white border border-blue-200 rounded-2xl shadow-xl p-6 space-y-8 animate-fade-in backdrop-blur-sm">
// //           <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
// //             🎓 Your Personalized Career Guide
// //           </h2>

// //           {showRoadmap && (
// //             <div className="text-gray-800 text-[15px] whitespace-pre-line">
// //               <h3 className="text-2xl font-semibold text-blue-600 mb-3">🛣️ Step-by-Step Roadmap</h3>
// //               <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-400 pl-5 pr-4 py-4 rounded-md shadow-md">
// //                 <ul className="list-disc pl-4 space-y-2 text-blue-900">
// //                   <li><span className="font-semibold">HTML, CSS, and JavaScript:</span> Core web technologies and frameworks like React or Vue.</li>
// //                   <li><span className="font-semibold">Responsive Design:</span> Adapt websites for mobile, tablet, and desktop.</li>
// //                   <li><span className="font-semibold">Version Control (Git):</span> Use GitHub/GitLab for collaboration.</li>
// //                   <li><span className="font-semibold">Testing & Debugging:</span> Ensure quality using tools and writing unit tests.</li>
// //                   <li><span className="font-semibold">Cross-Browser Compatibility:</span> Support multiple browsers like Chrome, Firefox.</li>
// //                   <li><span className="font-semibold">Accessibility (a11y):</span> Make web apps accessible to all users.</li>
// //                   <li><span className="font-semibold">Performance Optimization:</span> Speed up load times and efficiency.</li>
// //                   <li><span className="font-semibold">Backend Basics:</span> Know fundamentals of Node.js or REST APIs.</li>
// //                 </ul>
// //                 <div className="mt-4 text-sm text-blue-700">
// //                   🎥 Helpful Video: <a href="https://www.youtube.com/watch?v=rfscVS0vtbw" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-500">Learn Coding with FreeCodeCamp</a>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {showFlowchart && (
// //             <div className="text-gray-800 text-[15px]">
// //               <h3 className="text-2xl font-semibold text-purple-600 mb-3">📊 Visual Career Flowchart</h3>
// //               <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-l-4 border-purple-400 pl-5 pr-4 py-4 rounded-md shadow-md">
// //                 <div className="flex flex-col items-start space-y-4">
// //                   <div className="bg-white border border-purple-300 p-3 rounded-xl shadow text-purple-900 w-full">🎯 <span className="font-semibold">Start with Passion:</span> Identify interests and strengths</div>
// //                   <div className="bg-white border border-purple-300 p-3 rounded-xl shadow text-purple-900 w-full">🎓 <span className="font-semibold">Education:</span> Choose relevant degree or certification</div>
// //                   <div className="bg-white border border-purple-300 p-3 rounded-xl shadow text-purple-900 w-full">🛠️ <span className="font-semibold">Skill Building:</span> Learn tools and technologies</div>
// //                   <div className="bg-white border border-purple-300 p-3 rounded-xl shadow text-purple-900 w-full">🤝 <span className="font-semibold">Projects & Networking:</span> Build portfolio and connect</div>
// //                   <div className="bg-white border border-purple-300 p-3 rounded-xl shadow text-purple-900 w-full">🏆 <span className="font-semibold">Land Your Role:</span> Apply, interview, and grow</div>
// //                 </div>
// //                 <div className="mt-4 text-sm text-purple-700">
// //                   🎥 Related Tutorial: <a href="https://www.youtube.com/watch?v=PkZNo7MFNFg" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-500">JavaScript Basics - Programming for Beginners</a>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;







// import React, { useState } from "react";

// const Home = () => {
//   const [userInput, setUserInput] = useState("");
//   const [output, setOutput] = useState({ careerTitle: "", skills: "", roadmap: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showRoadmap, setShowRoadmap] = useState(false);
//   const [showFlowchart, setShowFlowchart] = useState(false);

//   const handleGenerate = async () => {
//     if (!userInput.trim()) return;
//     setLoading(true);
//     setError("");
//     setOutput({ careerTitle: "", skills: "", roadmap: "" });
//     setShowRoadmap(false);
//     setShowFlowchart(false);

//     try {
//       const res = await fetch("https://careerwise-backend.onrender.com/api/generate-career", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userInput }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         const parsed = parseOutput(data.output);
//         setOutput(parsed);
//       } else {
//         setError("Something went wrong while fetching career advice.");
//       }
//     // eslint-disable-next-line no-unused-vars
//     } catch (err) {
//       setError("Network error or server is down.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Parses the Gemini output text into structured fields
//   const parseOutput = (text) => {
//     const careerMatch = text.match(/Career Title:\s*(.*)/i);
//     const skillsMatch = text.match(/Required Skills:\s*([\s\S]*?)Learning Roadmap:/i);
//     const roadmapMatch = text.match(/Learning Roadmap:\s*([\s\S]*)/i);

//     return {
//       careerTitle: careerMatch ? careerMatch[1].trim() : "N/A",
//       skills: skillsMatch ? skillsMatch[1].trim() : "N/A",
//       roadmap: roadmapMatch ? roadmapMatch[1].trim() : "N/A",
//     };
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start px-4 py-10">
//       <h1 className="text-4xl font-bold text-blue-700 mb-4">CareerWiseAI</h1>
//       <p className="text-center max-w-2xl text-gray-700 text-lg mb-6">
//         Describe your interests or goals, and let CareerWiseAI recommend the best career path for you.
//       </p>

//       <textarea
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         placeholder="e.g. I love to dance"
//         className="w-full max-w-2xl h-32 p-4 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//       />

//       <button
//         onClick={handleGenerate}
//         disabled={loading}
//         className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
//       >
//         {loading ? "Generating..." : "Get Career Advice"}
//       </button>

//       {(output.careerTitle || output.skills || output.roadmap) && (
//         <div className="flex gap-4 mt-4">
//           <button
//             onClick={() => setShowRoadmap(!showRoadmap)}
//             className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
//           >
//             {showRoadmap ? "Hide Roadmap" : "Show Roadmap"}
//           </button>
//           <button
//             onClick={() => setShowFlowchart(!showFlowchart)}
//             className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
//           >
//             {showFlowchart ? "Hide Flowchart" : "Show Flowchart"}
//           </button>
//         </div>
//       )}

//       {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

//       {(showRoadmap || showFlowchart) && (
//         <div className="mt-10 max-w-3xl w-full bg-white border border-blue-200 rounded-2xl shadow-xl p-6 space-y-6 animate-fade-in backdrop-blur-sm">
//           <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
//             📘 Career Overview
//           </h2>

//           {showRoadmap && (
//             <>
//               <h3 className="text-xl font-semibold text-blue-600">🎯 Career Title</h3>
//               <p className="text-gray-800 text-[15px] mb-4">{output.careerTitle}</p>

//               <h3 className="text-xl font-semibold text-blue-600">🔧 Required Skills</h3>
//               <p className="text-gray-800 text-[15px] whitespace-pre-line">{output.skills}</p>

//               <h3 className="text-xl font-semibold text-blue-600 mt-4">📚 Learning Roadmap</h3>
//               <p className="text-gray-800 text-[15px] whitespace-pre-line">{output.roadmap}</p>
//             </>
//           )}

//           {showFlowchart && (
//             <div>
//               <h3 className="text-xl font-semibold text-blue-600 mb-3">🧭 General Career Flowchart</h3>
//               <ol className="list-decimal pl-6 text-gray-700 space-y-2 text-sm">
//                 <li>Discover your passion</li>
//                 <li>Choose related education</li>
//                 <li>Build technical and soft skills</li>
//                 <li>Do internships and work on projects</li>
//                 <li>Network and get certifications</li>
//                 <li>Apply for roles and grow your career</li>
//               </ol>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;





import React, { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsedData, setParsedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showFlowchart, setShowFlowchart] = useState(false);

  const handleGenerate = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setError("");
    setOutput("");
    setParsedData({});
    setShowRoadmap(false);
    setShowFlowchart(false);

    try {
      const res = await fetch("https://careerwise-backend.onrender.com/api/generate-career", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setOutput(data.output);
        const parsed = parseOutput(data.output);
        setParsedData(parsed);
      } else {
        setError("Something went wrong while fetching career advice.");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Network error or server is down.");
    } finally {
      setLoading(false);
    }
  };

  const parseOutput = (text) => {
    const extractSection = (title) => {
      const regex = new RegExp(`## ${title}:([\\s\\S]*?)(?=##|$)`);
      const match = text.match(regex);
      return match ? match[1].trim() : "";
    };

    const flowchartSteps = extractSection("Flowchart")
      .split("\n")
      .filter((line) => line.toLowerCase().includes("step"));

    return {
      career: extractSection("Career"),
      skills: extractSection("Required Skills"),
      colleges: extractSection("Best Colleges in India"),
      youtube: extractSection("Best YouTube Channels to Learn This Skill"),
      jobs: extractSection("Job Scenario"),
      future: extractSection("Future Scope"),
      flowchart: flowchartSteps,
    };
  };

  const renderFlowchart = () => (
    <div className="flex flex-col items-center space-y-6 mt-6">
      {parsedData.flowchart?.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-white border border-blue-300 shadow p-4 rounded-xl w-72 text-center text-blue-800 font-semibold">
            {step}
          </div>
          {index !== parsedData.flowchart.length - 1 && (
            <div className="text-2xl text-blue-500 animate-bounce mt-1">↓</div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">CareerWiseAI</h1>
      <p className="text-center max-w-2xl text-gray-700 text-lg mb-6">
        Describe your interests or goals, and let CareerWiseAI recommend the best career path for you.
      </p>

      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="e.g. I love to dance"
        className="w-full max-w-2xl h-32 p-4 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Generating..." : "Get Career Advice"}
      </button>

      {(parsedData.career || parsedData.flowchart?.length > 0) && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setShowRoadmap(!showRoadmap)}
            className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
          >
            {showRoadmap ? "Hide Roadmap" : "Show Roadmap"}
          </button>
          <button
            onClick={() => setShowFlowchart(!showFlowchart)}
            className="px-4 py-2 bg-white border border-blue-500 text-blue-700 rounded-md hover:bg-blue-100 transition"
          >
            {showFlowchart ? "Hide Flowchart" : "Show Flowchart"}
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-600 font-medium">{error}</p>}

      {(showRoadmap || showFlowchart) && (
        <div className="mt-10 max-w-3xl w-full bg-white border border-blue-200 rounded-2xl shadow-xl p-6 space-y-6 animate-fade-in">
          {showRoadmap && (
            <>
              <h2 className="text-2xl font-bold text-blue-800 mb-2">🎯 Career: {parsedData.career}</h2>

              <h2 className="text-xl font-semibold text-blue-600">🔧 Required Skills</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm">{parsedData.skills}</p>

              <h2 className="text-xl font-semibold text-blue-600 mt-4">🏫 Best Colleges in India</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm">{parsedData.colleges}</p>

              <h2 className="text-xl font-semibold text-blue-600 mt-4">📺 Best YouTube Channels</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm">{parsedData.youtube}</p>

              <h2 className="text-xl font-semibold text-blue-600 mt-4">💼 Job Scenario</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm">{parsedData.jobs}</p>

              <h2 className="text-xl font-semibold text-blue-600 mt-4">🔮 Future Scope</h2>
              <p className="text-gray-700 whitespace-pre-line text-sm">{parsedData.future}</p>
            </>
          )}

          {showFlowchart && (
            <>
              <h2 className="text-xl font-semibold text-blue-600 mb-2">🧭 Career Flowchart</h2>
              {renderFlowchart()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

