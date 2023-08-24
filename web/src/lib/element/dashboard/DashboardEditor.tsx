import fetch_guild from "@root/lib/method/fetch_guild";
import React, { useEffect } from "react";

const DashboardEditor: React.FC = () => {
  useEffect(() => {
    // Load Data
    fetch_guild()
  }, [])
  return <div>Editor</div>;
};

export default DashboardEditor;
