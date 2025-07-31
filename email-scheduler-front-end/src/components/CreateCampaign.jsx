import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCampaign = ({ token }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emails = recipients.split(",").map((email) => email.trim());

    try {
      const res = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          message,
          recipients: emails,
          scheduledTime,
        }),
      });

      if (res.ok) {
        alert("Campaign created successfully");
        navigate("/campaigns");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to create campaign");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating campaign");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Campaign</h2>

        <input
          type="text"
          placeholder="Campaign Title"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Message (HTML or Plain Text)"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Recipients (comma-separated emails)"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          required
        />

        <input
          type="datetime-local"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={scheduledTime}
          onChange={(e) => setScheduledTime(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
