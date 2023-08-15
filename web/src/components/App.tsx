import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@routes/login";
import DiscordCallback from "@routes/discord-callback";

/* Main router that controls everything being displayed depending on the route. */
const App: React.FC = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/discord-callback" element={<DiscordCallback/>}/>
                </Routes>
            </Router>
        </>
    )
}

export default App;