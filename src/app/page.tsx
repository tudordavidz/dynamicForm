"use client";

import { useState } from "react";

interface FormField {
  name: string;
  type: "text" | "number" | "select";
  label: string;
  options?: string[];
  required?: boolean;
}

interface FormSettings {
  formType: string;
  fields: FormField[];
}

export default function DynamicForm() {
  const [apiUrl, setApiUrl] = useState<string>("");
  const [formData, setFormData] = useState<any[]>([]);
  const [formSettings, setFormSettings] = useState<FormSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleApiUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApiUrl(e.target.value);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const newFormData = [...formData];
    newFormData[index] = {
      ...newFormData[index],
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
  };

  const fetchFormSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const isArray = Array.isArray(data);

      const settings: FormSettings = {
        formType: "dynamic",
        fields: Object.keys(isArray ? data[0] : data).map((key) => ({
          name: key,
          type: "text",
          label: key,
        })),
      };

      setFormSettings(settings);
      const initialData: any[] = [];

      if (isArray) {
        data.forEach((item: any) => {
          const itemData: any = {};
          settings.fields.forEach((field) => {
            itemData[field.name] = item[field.name] || "";
          });
          initialData.push(itemData);
        });
      } else {
        const itemData: any = {};
        settings.fields.forEach((field) => {
          itemData[field.name] = data[field.name] || "";
        });
        initialData.push(itemData);
      }

      setFormData(initialData);
    } catch (error) {
      console.error("Error fetching form settings:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg space-y-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center">
        Dynamic Form
      </h2>

      <div className="space-y-6">
        <label className="block text-lg font-medium text-gray-700">
          Enter API URL:
        </label>
        <input
          className="border p-4 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter API URL"
          value={apiUrl}
          onChange={handleApiUrlChange}
        />
        <button
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={fetchFormSettings}
          disabled={loading || !apiUrl}
        >
          {loading ? "Loading..." : "Fetch Form"}
        </button>
      </div>

      {formSettings ? (
        <form className="space-y-8">
          {formData.map((dataItem, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Entry {index + 1}
              </h3>

              {formSettings.fields.map((field) => (
                <div key={field.name} className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    {field.label}
                  </label>

                  {field.type === "select" ? (
                    <select
                      className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name={field.name}
                      value={dataItem[field.name] || ""}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {field.options?.map((option, optionIndex) => (
                        <option key={optionIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="border p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type={field.type}
                      name={field.name}
                      value={dataItem[field.name] || ""}
                      onChange={(e) => handleChange(e, index)}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}

          <button
            className="w-full bg-green-600 text-white px-4 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600">
          {loading ? "Fetching form..." : "Enter an API URL to fetch the form"}
        </p>
      )}
    </div>
  );
}
