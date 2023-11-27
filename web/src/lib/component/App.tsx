import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "@routes/dashboard";
import DiscordCallback from "@routes/discord-callback";
import GuildOauth from "@routes/guild-oauth";
import Login from "@routes/login";
import Dev from "@routes/dev";

/* Main Entry */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/dashboard'>
          <Route path=':guildId' element={<Dashboard />} />
          <Route path='' element={<Dashboard />} />
        </Route>
        <Route path='/discord-callback' element={<DiscordCallback />} />
        <Route path='/guild-oauth' element={<GuildOauth />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dev' element={<Dev />} />
      </Routes>
    </Router>
  );
};

export default App;
