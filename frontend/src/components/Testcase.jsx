import React from "react";

function Testcase({ testcase = [] }) {
  return (
    <div className="w-full h-full bg-[#1E1E1E] text-white p-4 overflow-y-auto">
      
      <h2 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
        Sample Test Cases
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testcase.slice(0, 4).map((tc, index) => (
          <div
            key={index}
            className="bg-[#252526] border border-gray-700 rounded-xl p-4 shadow-md hover:border-blue-500 transition-all duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-blue-400">
                Test Case {index + 1}
              </h3>

              <span className="text-xs bg-green-600 px-2 py-1 rounded-full">
                Sample
              </span>
            </div>

            {/* Input */}
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">
                Input
              </p>

              <pre className="bg-[#0F172A] rounded-lg p-3 text-sm text-green-300 overflow-x-auto whitespace-pre-wrap break-words">
                {tc.input}
              </pre>
            </div>

            {/* Expected Output */}
            <div>
              <p className="text-gray-400 text-sm mb-2">
                Expected Output
              </p>

              <pre className="bg-[#0F172A] rounded-lg p-3 text-sm text-blue-300 overflow-x-auto whitespace-pre-wrap break-words">
                {tc.output}
              </pre>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Testcase;