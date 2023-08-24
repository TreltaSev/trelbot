import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "../../FlexColumn";

type type_PageContent = {}

const PageContent: React.FC<type_PageContent> = () => {
  return (
    <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      
    </FlexColumn>
  );
}

export default PageContent;