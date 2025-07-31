import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/create")}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create Campaign
          </button>

          <button
            onClick={() => navigate("/campaigns")}
            className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600"
          >
            View Campaigns
          </button>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
