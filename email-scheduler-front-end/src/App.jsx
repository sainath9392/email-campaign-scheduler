import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Dashboard from "./components/Dashboard";
import CampaignList from "./components/CampaignList";
import CreateCampaign from "./components/CreateCampaign";
import Navbar from "./components/Navbar"; // Optional shared nav bar

const App = () => {


  return (
    <Router>
     <Navbar/>
      <Routes>
        {/* Default route → Go to login */}
        <Route path="/" element={<Dashboard />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<Dashboard />
          
        }/>
        <Route
          path="/campaigns"
          element={
           <CampaignList/>
          }
        />
        <Route
          path="/create"
          element={
           <CreateCampaign />
          }
        />


        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
