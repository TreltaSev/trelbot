import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumnComponent from "../../FlexColumnComponent";

const LeftNavigationBar: React.FC = () => {
  return (
    <FlexColumnComponent style={{width: 300}} className={`${styling.fill_height}`}>

    </FlexColumnComponent>
  );
}

export default LeftNavigationBar;