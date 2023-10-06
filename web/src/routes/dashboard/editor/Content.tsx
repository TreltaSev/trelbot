import React from "react";
import styling from "@assets/styling.module.css";
import { cModal } from "./loader";
import FlexColumn from "@root/lib/component/FlexColumn";

type props = {
  content: cModal | undefined;
};

const Content: React.FC<props> = ({ content }) => {
  return <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_start} ${styling.dark}`}>{content === undefined ? <></> : <React.Fragment key={`${content.name}/load`}>{content.element}</React.Fragment>}</FlexColumn>;
};

export default Content;
