import React, { useState, useEffect } from "react";
import ResourceUploader from "../../components/resources/ResourceUploader";
import ResourceTabs from "../../components/resources/ResourceTabs";
import { getResources, deleteResource } from "../../api/resources"; // ✅ API helpers

export default function ResourceLibrary() {
  const [resources, setResources] = useState([]);
  const [activeTab, setActiveTab] = useState("pyq");

  // 🔁 Fetch all resources on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResources();
        setResources(data);
      } catch (err) {
        console.error("Failed to fetch resources:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ After successful upload
  const handleUpload = (newResource) => {
    setResources((prev) => [...prev, newResource]);
    setActiveTab(newResource.type);
  };

  // ✅ After delete
  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      setResources((prev) => prev.filter((res) => res._id !== id));
    } catch (err) {
      alert("Failed to delete resource");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        📚 Premium Resource Library
      </h1>

      {/* Upload Form */}
      <ResourceUploader onUpload={handleUpload} />

      {/* Tabs for Displaying Resources */}
      <ResourceTabs
        resources={resources}
        onDelete={handleDelete}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
