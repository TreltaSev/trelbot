import React from "react";
import component from "@lib/types/component";
import FlexRow from "@lib/element/FlexRow";
import FlexColumn from "@lib/element/FlexColumn";

import scss_LoadingAnimated from "@assets/LoadingAnimated.module.scss";

const LoadingAnimated: React.FC<component> = ({ className, style }) => {
  return (
    <FlexRow style={{height: "calc(0.5em + 10px)", width: "35px" }} className={`${scss_LoadingAnimated.animationcontainer} ${scss_LoadingAnimated.small}`}>
      <FlexColumn />
      <FlexColumn />
      <FlexColumn />
    </FlexRow>
  );
};

export default LoadingAnimated;
