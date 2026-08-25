import React, { useEffect, useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import ProblemPanel from "../components/ProblemPanel";
import Timer2 from "../components/Timer2";
import { useLocation } from "react-router-dom";
import Testcase from "../components/Testcase";
import axios from "axios";
import { Serverurl } from "../App";
import codeTemplates from "../utils/Tamplet";
import CodeOutput from "../components/CodeOutput";

function Dsa() {
  const [afterrundata, setafterrundata] = useState({});
  const [running, setRunning] = useState(false);

  // Controls what is shown in bottom panel
  const [showInput, setShowInput] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  // User input
  const [input, setInput] = useState("");

  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(codeTemplates.cpp);

  const location = useLocation();
  const { topic, difficulty } = location.state || {};

  const [testcase, Settestcase] = useState([]);

  // ================= TIMER =================

  const totalTime = 90 * 60;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          alert("Time is over!");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ================= TESTCASE =================

  const handleData = useCallback((tc) => {
    Settestcase(tc);
  }, []);

  // ================= LANGUAGE CHANGE =================

  const handleLanguageChange = (e) => {
    const lang = e.target.value;

    setLanguage(lang);
    setCode(codeTemplates[lang]);

    // Reset everything
    setShowInput(false);
    setHasRun(false);
    setInput("");
    setafterrundata({});
  };

  // ================= RUN BUTTON =================
  // Only shows input box

  const handleRun = () => {
    setShowInput(true);
    setHasRun(false);
    setafterrundata({});
  };

  // ================= EXECUTE BUTTON =================
  // Sends code + input to backend

  const handleExecute = async () => {
    try {
      setRunning(true);

      // Clear previous output
      setafterrundata({});

      const res = await axios.post(
        `${Serverurl}/api/dsa/run`,
        {
          language,
          code,
          input,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Response:", res.data);

      setafterrundata(res.data);

      // Show output
      setHasRun(true);

      // Hide input
      setShowInput(false);
    } catch (error) {
      console.log("Error:", error);

      setafterrundata({
        error:
          error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong while executing the code.",
      });

      setHasRun(true);
      setShowInput(false);
    } finally {
      setRunning(false);
    }
  };

  // ================= CLOSE OUTPUT =================

  const handleCloseOutput = () => {
    setHasRun(false);
    setShowInput(true);
  };

  // ================= UI =================

  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">

      {/* ================= LEFT PANEL ================= */}

      <div className="w-[35%] min-w-[380px] border-r border-gray-700">
        <ProblemPanel
          sendData={handleData}
          difficultys={difficulty}
          topics={topic}
        />
      </div>

      {/* ================= RIGHT PANEL ================= */}

      <div className="flex-1 flex flex-col bg-[#1E1E1E]">

        {/* ================= HEADER ================= */}

        <div className="h-20 bg-[#252526] border-b border-gray-700 flex items-center justify-between px-6">

          <div className="flex items-center gap-5">

            {/* LANGUAGE */}

            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-[#333333] text-white border border-gray-600 rounded-lg px-3 py-2 outline-none"
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
            </select>

            {/* TIMER */}

            <Timer2
              timeLeft={timeLeft}
              totalTime={totalTime}
            />

          </div>

          {/* ================= RUN BUTTON ================= */}

          <div className="flex gap-3">

            <button
              onClick={handleRun}
              disabled={running}
              className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold transition"
            >
              ▶ Run
            </button>

          </div>

        </div>

        {/* ================= EDITOR ================= */}

        <div className="flex-1 overflow-hidden">

          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 16,

              minimap: {
                enabled: false,
              },

              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",

              padding: {
                top: 20,
              },

              tabSize: 4,
              fontFamily: "Fira Code, Consolas, monospace",
              cursorBlinking: "smooth",
              smoothScrolling: true,
              renderLineHighlight: "all",
              roundedSelection: true,
              cursorSmoothCaretAnimation: "on",

              bracketPairColorization: {
                enabled: true,
              },
            }}
          />

        </div>

        {/* ================= BOTTOM PANEL ================= */}

        <div className="h-56 border-t border-gray-700 bg-[#181818]">

          {/* ================= TEST CASE ================= */}

          {!showInput && !hasRun && (
            <Testcase testcase={testcase} />
          )}

          {/* ================= INPUT BOX ================= */}

          {showInput && !hasRun && (
            <div className="h-full flex flex-col">

              {/* Header */}

              <div className="h-10 flex items-center justify-between px-4 border-b border-gray-700">

                <span className="text-sm font-semibold text-gray-300">
                  Input
                </span>

                <button
                  onClick={() => setShowInput(false)}
                  className="text-gray-400 hover:text-white px-2"
                >
                  ✕
                </button>

              </div>

              {/* Input */}

              <div className="flex-1 p-3">

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your input here..."
                  className="w-full h-full resize-none bg-[#1E1E1E] text-white border border-gray-700 rounded-md p-3 outline-none font-mono text-sm focus:border-blue-500"
                  autoFocus
                />

              </div>

              {/* Execute button */}

              <div className="h-12 flex justify-end items-center px-4 border-t border-gray-700">

                <button
                  onClick={handleExecute}
                  disabled={running}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold"
                >
                  {running ? "Executing..." : "▶ Execute"}
                </button>

              </div>

            </div>
          )}

          {/* ================= OUTPUT ================= */}

          {hasRun && (
            <CodeOutput
              output={afterrundata.output}
              error={afterrundata.error}
              loading={running}
              onClose={handleCloseOutput}
            />
          )}

        </div>

      </div>

    </div>
  );
}

export default Dsa;