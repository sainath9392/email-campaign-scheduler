export const API_BASE = import.meta.env.VITE_API_BASE;

export const createCampaign = async (data) => {
  try {
    const res = await fetch(`${API_BASE}/api/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // <-- Needed if backend sets cookies
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
    const res = await fetch(`${API_BASE}/api/campaigns`, {
      method: "GET",
      credentials: "include", // <-- Needed if backend sets cookies
    });

    return await res.json();
  } catch (err) {
    console.error("❌ fetchCampaigns error:", err);
    return { error: "Network error" };
  }
};
