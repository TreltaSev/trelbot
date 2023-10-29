import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import mutgl from "@root/lib/vars/mutgl";
import FlexColumn from "@root/lib/component/FlexColumn";
import loader from "@root/routes/dashboard/editor/loader";

import OnJoin from "./OnJoin";
import styling from "@assets/styling.module.css";

const Automations: React.FC = () => {
  let { guildId } = useParams();

  /**
   * @useEffect fetches the channels of a guild id using the current session token and caches it for
   * later use in dropdowns etc.
   */
  useEffect(() => {
    /* Fetch and save channel data */
    mutgl.rc_channels(guildId as string).then((response) => {
      mutgl.cChannels.cache("meta", response);
    });
  }, []);
  return (
    <FlexColumn style={{ padding: "30px", background: "#1C1A1D", overflowY: "scroll" }} className={`${styling.fill_all} ${styling.border_box}`}>
      <FlexColumn style={{ width: "100%", padding: 30, gap: 25, borderRadius: 5 }} className={`${styling.align_items_flex_start} ${styling.darksub} ${styling.border_box}`}>
        <OnJoin />
      </FlexColumn>
    </FlexColumn>
  );
};

new loader().register("Automations", <Automations />, 1);
