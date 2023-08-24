import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "../../FlexColumn";
import guild from "@lib/types/guild";

type type_PageContent = {
  guild: guild | undefined
}

const PageContent: React.FC<type_PageContent> = ({ guild }) => {
  return (
    <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      
    </FlexColumn>
  );
}

export default PageContent;