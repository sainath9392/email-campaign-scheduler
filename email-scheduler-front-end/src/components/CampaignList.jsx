// src/components/CampaignList.jsx
import { useEffect, useState } from "react";
import { fetchCampaigns } from "../api";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns().then(setCampaigns);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Campaigns</h2>
      <ul>
        {campaigns.map((c, idx) => (
          <li key={idx} className="mb-4 border p-3 rounded">
            <strong>{c.title}</strong> - {c.status} <br />
            To: {c.recipients.join(", ")} <br />
            Time: {new Date(c.scheduledTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
