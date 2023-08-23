import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@routes/login";
import DiscordCallback from "@routes/discord-callback";
import Dashboard from "@routes/dashboard";
import GuildOauth from "@routes/guild-oauth";
import Test from "@routes/test";

/* Main router that controls everything being displayed depending on the route. */
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/discord-callback' element={<DiscordCallback />} />
          <Route path='/guild-oauth' element={<GuildOauth />} />
          <Route path='/dashboard'>
            <Route path=':guildId' element={<Dashboard />} />
            <Route path='' element={<Dashboard />} />
          </Route>
          <Route path="/test" element={<Test/>}/>
        </Routes>
      </Router>
    </>
  );
};

export default App;
