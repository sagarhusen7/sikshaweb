// src/components/code/LanguageSelector.jsx
// import { Select } from "@/components/ui/select"; // optional, fallback to native <select> if not using shadcn

export default function LanguageSelector({ selectedLanguage, onChange }) {
  const languages = ["cpp", "c", "python", "javascript"];

  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700">Select Language:</label>
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 p-2 border rounded w-full"
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
