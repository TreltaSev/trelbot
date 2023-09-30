import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "@routes/login";
/* Main Entry */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
