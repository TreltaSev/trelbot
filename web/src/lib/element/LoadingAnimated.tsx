import React from "react";
import FlexRow from "@lib/element/FlexRow";
import FlexColumn from "@lib/element/FlexColumn";

import scss_LoadingAnimated from "@assets/LoadingAnimated.module.scss";

type type_LoadingAnimated = {
  size?: "small" | "medium" | "large";
};

const LoadingAnimated: React.FC<type_LoadingAnimated> = ({ size }) => {
  if (!size) {
    size = "small";
  }
  let heightvalue: string = "0";
  let widthvalue: number = 0;
  let sizeclass: string = "";
  switch (size) {
    case "small":
      sizeclass = scss_LoadingAnimated.small;
      widthvalue = 35;
      heightvalue = "0.5em";
      break;
    case "medium":
      sizeclass = scss_LoadingAnimated.medium;
      widthvalue = 45;
      heightvalue = "0.75em";
      break;
    case "large":
      sizeclass = scss_LoadingAnimated.large;
      widthvalue = 70;
      heightvalue = "1em";
      break;
  }
  return (
    <FlexRow style={{ height: `calc(${heightvalue} + 10px)`, width: `${widthvalue}px` }} className={`${scss_LoadingAnimated.animationcontainer} ${sizeclass}`}>
      <FlexColumn />
      <FlexColumn />
      <FlexColumn />
    </FlexRow>
  );
};

export default LoadingAnimated;
