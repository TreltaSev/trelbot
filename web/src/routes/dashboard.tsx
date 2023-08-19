/**
 * Path: www.local.xyz/dashboard
 * Description: Dashboard, look in github
 */

import NavigationTemplate from "@lib/templates/NavigationTemplate";
import React from "react";
import { useParams } from "react-router-dom";
import styling from "@assets/styling.module.css";
import { useMe } from "@components/Global";
import me from "@root/lib/types/me";
import Text from "@lib/element/Text";
import GuildChip from "@root/lib/element/GuildChip";

type DashType = "selector" | "editor";

const Selector: React.FC = () => {
  const meData: me = useMe();

  if (meData.attempted == false) {
    return <div>Loading</div>;
  }

  return (
    <div style={{gap: 40}} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
      
      {/* Text Group */}
      <div style={{gap: 5}} className={`${styling.flex_col} ${styling.align_items_center}`}>
        <Text size={30} weight={"700"}>Select a Server</Text>
        <Text size={30} opacity="0.5">Choose a server by hitting the select or invite buttons!</Text>
      </div>
      
      {/* Guilds */}
      <div style={{ gap: 10 }} className={`${styling.flex_col}`}>
        {meData.guilds === undefined ? (
          <></>
        ) : (
          meData.guilds.map((guild) => <GuildChip name={guild.name} image={guild.icon_url} display={guild.display} present={guild.present} id={guild.id} key={`${meData.user?.id}/${guild.id}/chip`} />)
        )}
      </div>

    </div>
  );
};

const Editor: React.FC = () => {
  return <div>Editor</div>;
};

const Dashboard: React.FC = () => {
  let { guildId } = useParams();

  const DashType: DashType = guildId === undefined ? "selector" : "editor";

  switch (DashType) {
    case "selector":
      return (
        <NavigationTemplate classNames={`${styling.dark} ${styling.fill_all} ${styling.flex_col} ${styling.align_items_center}`}>
          <Selector />
        </NavigationTemplate>
      );

    case "editor":
      return (
        <NavigationTemplate classNames={`${styling.dark}`}>
          <Editor />
        </NavigationTemplate>
      );
  }
};

export default Dashboard;
