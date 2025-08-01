import React, { useState, useEffect } from "react";
import { Settings, Moon, Bell, Sun, Save } from "lucide-react";
import { toast } from "react-hot-toast";

export default function UserSettings({ settings = {}, onChange }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [unsaved, setUnsaved] = useState(false);

  // Sync with parent updates
  useEffect(() => {
    setLocalSettings(settings || {});
  }, [settings]);

  // Toggle setting
  const handleToggle = (key) => {
    const updated = { ...localSettings, [key]: !localSettings[key] };
    setLocalSettings(updated);
    setUnsaved(true);
  };

  // Save handler
  const handleSave = () => {
    if (onChange) {
      onChange(localSettings);
      setUnsaved(false);
      toast.success("Settings saved!");
    } else {
      toast.error("Update function not provided");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <Settings className="text-indigo-600" /> Preferences & Settings
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 🌙 Dark Mode */}
        <div
          className="backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={() => handleToggle("darkMode")}
        >
          <div className="flex items-center gap-4">
            {localSettings.darkMode ? (
              <Moon className="text-blue-400 w-7 h-7 p-1 rounded-full bg-blue-900/30" />
            ) : (
              <Sun className="text-yellow-500 w-7 h-7 p-1 rounded-full bg-yellow-100" />
            )}
            <span className="font-semibold text-gray-900 dark:text-white">
              {localSettings.darkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 dark:from-gray-800 dark:to-gray-700 dark:text-white shadow-sm">
            {localSettings.darkMode ? "On" : "Off"}
          </div>
        </div>

        {/* 🔔 Notifications */}
        <div
          className="backdrop-blur-md bg-white/70 border border-gray-200/50 rounded-2xl shadow-lg p-5 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          onClick={() => handleToggle("notifications")}
        >
          <div className="flex items-center gap-4">
            <Bell className="text-green-500 w-7 h-7 p-1 rounded-full bg-green-100" />
            <span className="font-semibold text-gray-900 dark:text-white">
              Notifications
            </span>
          </div>
          <div className="px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-700 dark:from-green-700 dark:to-green-600 dark:text-white shadow-sm">
            {localSettings.notifications ? "Enabled" : "Muted"}
          </div>
        </div>
      </div>

      {/* 💾 Save Button */}
      {unsaved && (
        <div className="mt-8 flex gap-4">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 active:scale-95 transition-transform shadow-md hover:shadow-lg"
          >
            <Save size={18} /> Save Changes
          </button>
        </div>
      )}
    </div>
  );
}
