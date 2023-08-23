import React, { useEffect } from "react";
import styling from "@assets/styling.module.css";
import { useMe } from "@components/Global";
import me from "@lib/types/me";
import Text from "@lib/element/Text";
import GuildChip from "@lib/element/GuildChip";
import sortGuildsAsMutable from "@lib/method/sortGuildsAsMutable";
import { form } from "@lib/types/sizes";
import custom from "@assets/custom.module.css";

const DashboardSelector: React.FC = () => {
  const meData: me = useMe();

  /*
  This use effects loops every 500 ms checking if /guild-oauth created an entry to refresh to. 
  */
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      const selector_action: string | null = localStorage.getItem("selector_action?");
      const selector_redirect: string | null = localStorage.getItem("selector_redirect?");
      if (selector_action === "redirect" && selector_redirect !== null) {
        localStorage.removeItem("selector_action?");
        localStorage.removeItem("selector_redirect?");
        window.location.href = selector_redirect;
        clearInterval(refreshInterval);
      }
    }, 500);
  }, []);

  if (meData.attempted == false) {
    return <div>Loading</div>;
  }

  sortGuildsAsMutable(meData);

  return (
    <div style={{ gap: 40 }} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
      {/* Text Group */}
      <div style={{ gap: 5 }} className={`${styling.flex_col} ${styling.align_items_center} ${custom.dashboard_select_text_padding}`}>
        <Text size={form(30, 24)} weight={"700"}>
          Select a Server
        </Text>
        <Text size={form(30, 24)} classNames={styling.text_align_center} opacity='0.5'>
          Choose a server by hitting the select or invite buttons!
        </Text>
      </div>

      {/* Guilds */}
      <div style={{ gap: 10 }} className={`${styling.flex_col}`}>
        {meData.guilds === undefined ? (
          <></>
        ) : (
          meData.guilds.map((guild) => <GuildChip name={guild.name} image={guild.icon_url} display={guild.display} present={guild.present} id={guild.id} key={`${meData.user?.id}/${guild.id}/chip`} />)
        )}
        <div style={{ height: 40, width: 40, content: "", background: "transparent" }} />
      </div>
    </div>
  );
};

export default DashboardSelector;
