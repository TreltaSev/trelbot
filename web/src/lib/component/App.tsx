import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@routes/login";
import DiscordCallback from "@routes/discord-callback";
/* Main Entry */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/discord-callback' element={<DiscordCallback />} />
      </Routes>
    </Router>
  );
};

export default App;
