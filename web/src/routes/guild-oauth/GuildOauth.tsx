import action from "@root/lib/method/action";
import React, { useEffect } from "react";

const GuildOauth: React.FC = () => {
  useEffect(() => {
    const guild_id: string | null = new URLSearchParams(window.location.search).get("guild_id");
    if (guild_id) {
      new action().set("gSelectorAction", "redirect");
      new action().set("gSelectorRedirect", `/dashboard/${guild_id}`);
    }
    window.close();
  }, []);
  return (
    <>
      <></>
    </>
  );
};

export default GuildOauth;
