// src/components/code/CodeEditor.jsx
import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, code, setCode, theme = "light" }) {
  return (
    <div 
      className={`
        relative 
        rounded-xl 
        shadow-lg 
        overflow-hidden 
        border 
        transition-all duration-300 transform hover:shadow-2xl
        ${theme === "light" 
          ? "bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700" 
          : "bg-gray-900 border-gray-700"
        }
      `}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold">
        <span>{language.charAt(0).toUpperCase() + language.slice(1)} Code</span>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="p-2">
        <Editor
          height="400px"
          theme={theme}
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            tabSize: 2,
            wordWrap: "on",
            lineNumbersMinChars: 3,
          }}
        />
      </div>
    </div>
  );
}