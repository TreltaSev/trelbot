/**
 * Path: www.local.xyz/guild-oauth
 * Description: Discord callback handler for guild invites
 */
import React, { useEffect } from "react";

const GuildCallback = () => {
  const guild_id: string | null = new URLSearchParams(window.location.search).get("guild_id");
  localStorage.setItem("selector_action?", "redirect");
  localStorage.setItem("selector_redirect?", `/dashboard/${guild_id}`);
  window.close();
};

const GuildOauth: React.FC = () => {
  useEffect(() => {
    GuildCallback();
  });
  return <></>;
};

export default GuildOauth;
