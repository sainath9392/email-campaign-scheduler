// src/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Adjust if deployed

export const createCampaign = async (data) => {
  const res = await fetch(`${BASE_URL}/api/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const fetchCampaigns = async () => {
  const res = await fetch(`${BASE_URL}/api/campaigns`);
  return await res.json();
};
