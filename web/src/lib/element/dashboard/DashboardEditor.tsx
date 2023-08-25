import React, { useContext, useEffect, useState } from "react";

import guild from "@lib/types/guild";
import fetch_guild from "@lib/method/fetch_guild";
import styling from "@assets/styling.module.css";
import LeftNavigationBar from "@lib/element/dashboard/specific/LeftNavigationBar";
import PageContent from "@lib/element/dashboard/specific/PageContent";
import { dashboardPage, parent } from "@lib/element/dashboard/loader";

type type_DashboardEditor = {
  guild_id: string | number | undefined;
};

export const update = React.createContext<((parent: parent) => void) | null>(null);

const DashboardEditor: React.FC<type_DashboardEditor> = ({ guild_id }) => {
  const [guild, setGuild] = useState<guild | undefined>(undefined);
  const [content, setContent] = useState<dashboardPage[] | undefined>(undefined);

  const set = (parent: parent) => {
    setContent(parent.contents);
  };

  useEffect(() => {
    fetch_guild(guild_id).then((guild_data: guild) => {
      setGuild(guild_data);
    });
  }, []);

  return (
    <update.Provider value={set}>
      <div className={`${styling.flex_row} ${styling.fill_all} ${styling.justify_content_start} ${styling.align_items_center}`}>
        <LeftNavigationBar guild={guild} />
        <PageContent guild={guild} content={content} />
      </div>
    </update.Provider>
  );
};

export default DashboardEditor;
