import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProblemPanel from "../components/ProblemPanel";
function Topic() {
  const navigate = useNavigate();

  const topics = [
    "Arrays",
    "Strings",
    "Linked List",
    "Stack",
    "Queue",
    "Hashing",
    "Recursion",
    "Backtracking",
    "Binary Search",
    "Sorting",
    "Trees",
    "Binary Tree",
    "Binary Search Tree",
    "Heap",
    "Trie",
    "Graph",
    "Greedy",
    "Dynamic Programming",
    "Bit Manipulation",
    "Sliding Window",
    "Two Pointers",
    "Prefix Sum",
    "Intervals",
    "Matrix",
    "Math",
    "Number Theory",
    "Union Find (DSU)",
    "Segment Tree",
    "Fenwick Tree",
    "Topological Sort",
    "Shortest Path",
    "Minimum Spanning Tree",
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleStart = () => {
    if (!selectedTopic || !selectedDifficulty) {
      alert("Please select both Topic and Difficulty.");
      return;
    }

    navigate("/dsainterview", {
      state: {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center">
          Select Coding Interview
        </h1>

        <p className="text-gray-400 text-center mt-3">
          Choose a topic and difficulty to begin your AI coding interview.
        </p>

        {/* Difficulty */}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-5">Difficulty</h2>

          <div className="flex flex-wrap gap-4">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300
                ${
                  selectedDifficulty === difficulty
                    ? difficulty === "Easy"
                      ? "bg-green-600"
                      : difficulty === "Medium"
                        ? "bg-yellow-500 text-black"
                        : "bg-red-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Topics */}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-5">DSA Topics</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`rounded-xl p-5 border transition-all duration-300 text-left
                ${
                  selectedTopic === topic
                    ? "border-blue-500 bg-blue-600"
                    : "border-gray-700 bg-[#1E293B] hover:border-blue-400 hover:scale-105"
                }`}
              >
                <h3 className="font-semibold text-lg">{topic}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Selected */}

        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5 bg-[#1E293B] rounded-xl p-6">
          <div>
            <p className="text-gray-400">Selected Topic</p>
            <p className="text-xl font-semibold">{selectedTopic || "None"}</p>
          </div>

          <div>
            <p className="text-gray-400">Difficulty</p>
            <p className="text-xl font-semibold">
              {selectedDifficulty || "None"}
            </p>
          </div>

          <button
            onClick={handleStart}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition"
          >
            Start Interview →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topic;
