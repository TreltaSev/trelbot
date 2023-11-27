import React from "react";
import FlexRow from "@root/lib/component/FlexRow";
import { alternate } from ".";

const SectionSeparator: React.FC<alternate> = ({ readable }) => {
  return <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />;
};

export default SectionSeparator;
