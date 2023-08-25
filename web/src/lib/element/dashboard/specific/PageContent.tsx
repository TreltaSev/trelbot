import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/element/FlexColumn";
import guild from "@lib/types/guild";
import { dashboardPage } from "@lib/element/dashboard/loader";

type type_PageContent = {
  guild: guild | undefined,
  content: dashboardPage[] | undefined
}

const PageContent: React.FC<type_PageContent> = ({ guild, content }) => {
  return (
    <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center} ${styling.dark}`}>
      {
        content === undefined ? <></> : content.map((part) => (
          <>{part.element}</>
        ))
      }
    </FlexColumn>
  );
}

export default PageContent;