import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "../../FlexColumn";
import { get } from "@lib/element/dashboard/loader";

type type_LeftNavigationBar = {}

const LeftNavigationBar: React.FC<type_LeftNavigationBar> = () => {
  console.log(get())
  return (
    <FlexColumn style={{width: 250, gap:10, padding: "0 10px 0 10px"}} className={`${styling.fill_height} ${styling.align_items_center} ${styling.dark}`}>
      
    </FlexColumn>
  );
}

export default LeftNavigationBar;