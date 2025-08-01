import { useState, useEffect } from "react";
import LanguageSelector from "../../components/code/LanguageSelector";
import CodeEditor from "../../components/code/CodeEditor";
import { runCode } from "../../api/compiler";
import { toast } from "react-hot-toast";

const defaultTemplates = {
  c: `#include <stdio.h>

int main() {
    printf("Hello, C!\\n");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
  python: `print("Hello, Python!")`,
  javascript: `console.log("Hello, JavaScript!");`,
};

const themes = {
  light: {
    editor: "light",
    outputBg: "bg-gray-50",
    outputText: "text-gray-800",
    cardBg: "bg-white",
    border: "border-gray-200",
    textPrimary: "text-gray-900",
    btnHover: "hover:bg-blue-600",
  },
  dark: {
    editor: "vs-dark",
    outputBg: "bg-gray-900",
    outputText: "text-green-300",
    cardBg: "bg-gray-800",
    border: "border-gray-700",
    textPrimary: "text-white",
    btnHover: "hover:bg-blue-700",
  },
};

export default function CodeCompiler() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState("light");

  // Load saved code or default template
  useEffect(() => {
    const savedCode = localStorage.getItem(`code-${language}`);
    setCode(savedCode || defaultTemplates[language]);
    setOutput("");
  }, [language]);

  // Save code on change
  useEffect(() => {
    if (autoSave) {
      localStorage.setItem(`code-${language}`, code);
    }
  }, [code, language, autoSave]);

  const handleRun = async () => {
    if (!code.trim()) {
      toast.error("Code is empty!");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const result = await runCode({
        code,
        language,
        input: "", // You can add input box if needed
      });

      console.log("🔁 Backend result:", result);

      if (result.success) {
        setOutput(result.output || "// No output returned");
        toast.success("✅ Code executed");
      } else {
        setOutput(result.error || "// Error during execution");
        toast.error("❌ Execution failed");
      }
    } catch (err) {
      console.error("❌ Frontend Error:", err);
      setOutput("// Unexpected error occurred");
      toast.error("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCode(defaultTemplates[language]);
    setOutput("");
    toast.success("🔄 Template reset");
  };

  const handleCopyOutput = () => {
    if (!output) {
      toast.error("Nothing to copy!");
      return;
    }
    navigator.clipboard.writeText(output);
    toast.success("📋 Output copied");
  };

  const currentTheme = themes[theme];

  return (
    <div className={`max-w-6xl mx-auto px-4 py-6 space-y-6 font-sans ${currentTheme.textPrimary}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Code Compiler
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={() => setAutoSave(!autoSave)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            Auto Save
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            Dark Mode
          </label>

          <LanguageSelector selectedLanguage={language} onChange={setLanguage} />
        </div>
      </div>

      {/* Code Editor */}
      <div className={`rounded-xl shadow-lg border ${currentTheme.border}`}>
        <CodeEditor
          key={language}
          code={code}
          setCode={setCode}
          language={language}
          theme={currentTheme.editor}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md"
        >
          Reset Template
        </button>

        <button
          onClick={handleRun}
          disabled={!code.trim() || loading}
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md ${currentTheme.btnHover} disabled:opacity-50`}
        >
          {loading ? "Running..." : "Run"}
        </button>
      </div>

      {/* Output */}
      <div className={`rounded-lg shadow-inner p-4 max-h-64 overflow-auto whitespace-pre-wrap text-sm font-mono ${currentTheme.outputBg} ${currentTheme.outputText} border ${currentTheme.border}`}>
        {loading ? "Running..." : output || "// Output will appear here"}
      </div>

      {/* Copy Button */}
      <div className="flex justify-end">
        <button
          onClick={handleCopyOutput}
          disabled={!output}
          className="text-sm text-blue-600 hover:text-blue-800 hover:underline disabled:text-gray-400"
        >
          📋 Copy Output
        </button>
      </div>
    </div>
  );
}
