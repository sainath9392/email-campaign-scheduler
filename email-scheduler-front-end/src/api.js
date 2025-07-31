// src/api/index.js
export const API_BASE = import.meta.env.VITE_API_BASE;

const getToken = () => localStorage.getItem("token"); // assuming you stored it after login

export const createCampaign = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("❌ createCampaign error:", err);
    return { error: "Network error" };
  }
};

export const fetchCampaigns = async () => {
  try {
    const res = await fetch(`${API_BASE}/campaigns`, {
      method: "GET",
    });
    return await res.json();
  } catch (err) {
    console.error("❌ fetchCampaigns error:", err);
    return { error: "Network error" };
  }
};
