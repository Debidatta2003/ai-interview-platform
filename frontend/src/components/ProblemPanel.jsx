import React, { useEffect, useState } from "react";
import axios from "axios";
import { Serverurl } from "../App";
import Topic from "../pages/Topic";
function ProblemPanel({ topics, difficultys, sendData }) {
  const difficulty = difficultys;
  const topic = topics;
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const result = await axios.post(
          `${Serverurl}/api/dsa/question`,
          {
            difficulty,
            topic,
          },
          {
            withCredentials: true,
          },
        );

        console.log("API RESPONSE:", result.data);

        if (result.data?.problem) {
          setProblem(result.data.problem);
        } else {
          console.log("Problem is missing");
        }
      } catch (err) {
        console.log("Error fetching problem:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblem();
  }, [difficulty, topic]);

  useEffect(() => {
    if (problem) {
      sendData(problem.testcase);
    }
  }, [problem, sendData]);

  if (loading || !problem) {
    return (
      <div className="h-screen w-full bg-[#181818] flex items-center justify-center">
        <div className="text-gray-400 text-lg animate-pulse">
          Generating Interview Question...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#181818] border-r border-gray-800 text-white">
      {/* Header */}
      <div className="sticky top-0 bg-[#202020] border-b border-gray-700 px-6 py-5 z-20">
        <h1 className="text-3xl font-bold">{problem.title}</h1>

        <div className="flex flex-wrap gap-3 mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              problem.difficulty === "Easy"
                ? "bg-green-600"
                : problem.difficulty === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-600"
            }`}
          >
            {problem.difficulty}
          </span>

          <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">
            {problem.topic}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="px-6 py-6 space-y-8">
        {/* Description */}

        <section>
          <h2 className="text-xl font-semibold mb-3">Problem Description</h2>

          <p className="text-gray-300 leading-8 whitespace-pre-line">
            {problem.description}
          </p>
        </section>

        {/* Constraints */}

        <section>
          <h2 className="text-xl font-semibold mb-4">Constraints</h2>

          <ul className="space-y-3">
            {problem.constraints.map((constraint, index) => (
              <li
                key={index}
                className="bg-[#252525] rounded-lg p-3 border border-gray-700"
              >
                • {constraint}
              </li>
            ))}
          </ul>
        </section>

        {/* Examples */}

        <section>
          <h2 className="text-xl font-semibold mb-4">Examples</h2>

          <div className="space-y-6">
            {problem.examples.map((example, index) => (
              <div
                key={index}
                className="bg-[#252525] rounded-xl border border-gray-700 p-5"
              >
                <h3 className="font-semibold mb-4">Example {index + 1}</h3>

                <div className="space-y-3">
                  <div>
                    <p className="text-blue-400 font-medium">Input</p>

                    <pre className="bg-[#1E1E1E] p-3 rounded mt-2 overflow-x-auto">
                      {example.input}
                    </pre>
                  </div>

                  <div>
                    <p className="text-green-400 font-medium">Output</p>

                    <pre className="bg-[#1E1E1E] p-3 rounded mt-2 overflow-x-auto">
                      {example.output}
                    </pre>
                  </div>

                  <div>
                    <p className="text-yellow-400 font-medium">Explanation</p>

                    <p className="text-gray-300 mt-2 leading-7">
                      {example.explanation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProblemPanel;
