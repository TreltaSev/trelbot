/**
 * Path: www.local.xyz/guild-oauth
 * Description: Discord callback handler for guild invites
 */
import React, { useEffect } from "react";
import FlexRow from "@root/lib/element/FlexRow";
import styling from "@assets/styling.module.css";
import LoadingAnimated from "@root/lib/element/LoadingAnimated";

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
  return (
    <FlexRow className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      <LoadingAnimated size={30} gap={15} heightoffset={20} />
    </FlexRow>
  );
};

export default GuildOauth;
