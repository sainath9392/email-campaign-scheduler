import { useEffect, useState } from "react";

const CampaignList = ({ token }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/campaigns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setCampaigns(data);
        } else {
          const errorData = await res.json();
          alert(errorData.message || "Failed to fetch campaigns");
        }
      } catch (err) {
        console.error(err);
        alert("Error fetching campaigns");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [token]);

  if (loading) return <div className="p-4">Loading campaigns...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <a
            href="/create"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬅️ Back to Create Campaign
          </a>
        </div>

        <h2 className="text-2xl font-bold mb-4">Your Campaigns</h2>

        {campaigns.length === 0 ? (
          <p className="text-gray-600">No campaigns found.</p>
        ) : (
          <ul className="space-y-4">
            {campaigns.map((campaign) => (
              <li
                key={campaign._id}
                className="border border-gray-200 p-4 rounded"
              >
                <h3 className="font-semibold text-lg">{campaign.title}</h3>
                <p className="text-sm text-gray-500">
                  Scheduled: {new Date(campaign.scheduledTime).toLocaleString()}
                </p>

                <p className="mt-1 text-sm">
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold ${
                      campaign.status === "sent"
                        ? "bg-green-500"
                        : campaign.status === "failed"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {campaign.status || "Pending"}
                  </span>
                </p>

                <p className="mt-2 text-gray-700">
                  Recipients:{" "}
                  {campaign.recipients.map((r) => r.email).join(", ")}
                </p>
                <div className="mt-2 text-gray-600">
                  Message:{" "}
                  <div dangerouslySetInnerHTML={{ __html: campaign.message }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CampaignList;
