import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styling from "@assets/styling.module.css";
import mutgl from "@lib/vars/mutgl";
import FlexRow from "@lib/component/FlexRow";
import NavigationLayout from "./NavigationTab";
import "@root/routes/dashboard/editor/pages/automations";
import { cModal } from "./loader";
import Content from "./Content";
import FlexColumn from "@root/lib/component/FlexColumn";

const Editor: React.FC = () => {
  let { guildId } = useParams();
  const [content, setContent] = useState<cModal | undefined>(undefined);

  /**
   * @useEffect Fetches the guild data from the guild id by sending
   * a get request to the backend api, that response gets saved into a
   * guild object inside const guild.
   */
  useEffect(() => {
    /* Fetch and Save Guild Data like settings */
    mutgl.rc_guild(guildId as string, false, ["settings"]).then((response) => {
      mutgl.cGuild.cache("meta", response);
    });
  }, []);

  return (
    <FlexRow style={{ height: "calc(100% - 80px)" }} className={`${styling.fill_width} ${styling.justify_content_start} ${styling.align_items_center}`}>
      <NavigationLayout
        onUpdate={(modal) => {
          setContent(modal as any);
        }}
      />
      <Content content={content} />
    </FlexRow>
  );
};

export default Editor;
