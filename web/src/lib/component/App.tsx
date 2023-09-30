import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Main Entry */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<></>} />
      </Routes>
    </Router>
  );
};

export default App;
