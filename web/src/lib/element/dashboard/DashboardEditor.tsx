import fetch_guild from "@root/lib/method/fetch_guild";
import React, { useEffect } from "react";

type type_DashboardEditor = {
  guild_id: string | number | undefined
}

const DashboardEditor: React.FC<type_DashboardEditor> = ({guild_id}) => {
  useEffect(() => {
    // Load Data
    fetch_guild(guild_id)
  }, [])
  return <div>Editor</div>;
};

export default DashboardEditor;
