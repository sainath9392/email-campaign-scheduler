// src/components/CreateCampaign.jsx
import { useState } from "react";
import { createCampaign } from "../api";

const CreateCampaign = () => {
  const [form, setForm] = useState({
    title: "",
    message: "",
    recipients: "",
    scheduledTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      recipients: form.recipients.split(",").map((email) => email.trim()),
    };

    const res = await createCampaign(data);
    alert(res.message || "Campaign Created");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Campaign</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <input
        name="recipients"
        placeholder="Recipients (comma-separated)"
        value={form.recipients}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />
      <input
        type="datetime-local"
        name="scheduledTime"
        value={form.scheduledTime}
        onChange={handleChange}
        className="w-full p-2 mb-2 border"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateCampaign;
