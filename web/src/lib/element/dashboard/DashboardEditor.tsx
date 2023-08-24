import React, { useEffect, useState } from "react";

import guild from "@lib/types/guild";
import fetch_guild from "@lib/method/fetch_guild";
import styling from "@assets/styling.module.css";

type type_DashboardEditor = {
  guild_id: string | number | undefined
}

const DashboardEditor: React.FC<type_DashboardEditor> = ({guild_id}) => {
  const [guild, setGuild] = useState<guild | undefined>(undefined)
  useEffect(() => {
    fetch_guild(guild_id).then((guild_data: guild) => {
      setGuild(guild_data)
    })
  }, [])
  return (
  <div>

  </div>
  );
};

export default DashboardEditor;
