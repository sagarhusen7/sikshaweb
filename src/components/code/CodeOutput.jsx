// src/components/code/CodeOutput.jsx
export default function CodeOutput({ output }) {
  return (
    <div className="mt-4 p-4 bg-gray-100 border rounded text-sm text-gray-800 whitespace-pre-wrap">
      <strong>Output:</strong>
      <div className="mt-2">{output || "No output yet"}</div>
    </div>
  );
}
