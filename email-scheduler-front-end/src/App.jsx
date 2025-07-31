// src/App.jsx
import { useState } from "react";
import CreateCampaign from "./components/CreateCampaign";
import CampaignList from "./components/CampaignList";

const App = () => {
  const [view, setView] = useState("create");

  return (
    <div className="text-center">
      <nav className="p-4 bg-gray-100 mb-4">
        <button onClick={() => setView("create")} className="mr-4">
          Create Campaign
        </button>
        <button onClick={() => setView("list")}>View Campaigns</button>
      </nav>

      {view === "create" ? <CreateCampaign /> : <CampaignList />}
    </div>
  );
};

export default App;
