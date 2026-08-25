import React from "react";

function CodeOutput({ output, error, loading, onClose }) {
  return (
    <div className="h-full flex flex-col bg-[#181818]">

      {/* Header */}
      <div className="h-10 flex items-center justify-between px-4 border-b border-gray-700">

        <span className="text-sm font-semibold text-gray-300">
          Output
        </span>

        {/* Close button */}
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white hover:bg-gray-700 rounded px-2 py-1 transition"
          title="Back to testcases"
        >
          ✕
        </button>

      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">

        {/* Loading */}
        {loading && (
          <div className="text-gray-400">
            Running...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <pre className="text-red-400 whitespace-pre-wrap">
            {error}
          </pre>
        )}

        {/* Output */}
        {!loading && !error && output && (
          <pre className="text-green-400 whitespace-pre-wrap">
            {output}
          </pre>
        )}

        {/* Empty */}
        {!loading && !error && !output && (
          <div className="text-gray-500">
            Click Run to execute your code.
          </div>
        )}

      </div>
    </div>
  );
}

export default CodeOutput;