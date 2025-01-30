"use client";

import { useState, useEffect } from "react";

interface FormData {
  name?: string;
  age?: number;
  gender?: string;
  jobTitle?: string;
  company?: string;
  experience?: number;
}

export default function DynamicForm() {
  const [hydrated, setHydrated] = useState(false);
  const [formType, setFormType] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({});
  const [urls, setUrls] = useState<string[]>([""]);
  const [apiResults, setApiResults] = useState<string[]>([]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="p-4 max-w-lg mx-auto">Loading...</div>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const fetchUrls = async () => {
    const requests = urls.map((url) =>
      fetch(url)
        .then((res) => res.text())
        .catch(() => "Failed to fetch")
    );
    const results = await Promise.all(requests);
    setApiResults(results);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    await fetchUrls();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Dynamic Form</h2>

      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">
          Select Form Type:
        </label>
        <select
          className="border p-2 w-full rounded-md"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <option value="">-- Choose --</option>
          <option value="personal">Personal Info</option>
          <option value="professional">Professional Details</option>
        </select>
      </div>

      {formType === "personal" && (
        <>
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Name:
            </label>
            <input
              className="border p-2 w-full rounded-md"
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />

            <label className="block text-lg font-medium text-gray-700">
              Age:
            </label>
            <input
              className="border p-2 w-full rounded-md"
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              required
              min="1"
            />

            <label className="block text-lg font-medium text-gray-700">
              Gender:
            </label>
            <select
              className="border p-2 w-full rounded-md"
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      )}

      {formType === "professional" && (
        <>
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">
              Job Title:
            </label>
            <input
              className="border p-2 w-full rounded-md"
              type="text"
              name="jobTitle"
              value={formData.jobTitle || ""}
              onChange={handleChange}
              required
            />

            <label className="block text-lg font-medium text-gray-700">
              Company:
            </label>
            <input
              className="border p-2 w-full rounded-md"
              type="text"
              name="company"
              value={formData.company || ""}
              onChange={handleChange}
              required
            />

            <label className="block text-lg font-medium text-gray-700">
              Years of Experience:
            </label>
            <input
              className="border p-2 w-full rounded-md"
              type="number"
              name="experience"
              value={formData.experience || ""}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </>
      )}

      <h3 className="text-lg font-semibold text-gray-700 mt-6">Enter URLs</h3>
      {urls.map((url, index) => (
        <div key={index} className="space-y-2">
          <input
            className="border p-2 w-full rounded-md"
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => handleUrlChange(index, e.target.value)}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600"
        onClick={addUrlField}
      >
        Add URL
      </button>

      <button
        className="bg-green-500 text-white px-4 py-2 mt-4 w-full rounded-md hover:bg-green-600"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {apiResults.length > 0 && (
        <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">Fetched Data:</h3>
          <pre className="bg-gray-200 p-4 rounded-md overflow-auto">
            {JSON.stringify(apiResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
