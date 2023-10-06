import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styling from "@assets/styling.module.css";
import mutgl from "@lib/vars/mutgl";
import FlexRow from "@lib/component/FlexRow";
import NavigationLayout from "@lib/layouts/Navigation";

const Editor: React.FC = () => {
  let { guildId } = useParams();

  /**
   * @useEffect Fetches the guild data from the guild id by sending
   * a get request to the backend api, that response gets saved into a
   * guild object inside const guild.
   */
  useEffect(() => {
    /* Fetch and Save Guild Data like channels and settings */
    mutgl.rc_guild(guildId as string).then((response) => {
      mutgl.cGuild.cache("meta", response);
    });
  }, []);

  return (
    <FlexRow className={`${styling.fill_all} ${styling.justify_content_start} ${styling.align_items_center}`}>
      <NavigationLayout />
      <>Mid Content</>
    </FlexRow>
  );
};

export default Editor;
