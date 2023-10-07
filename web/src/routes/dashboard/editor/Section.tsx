import React from "react";
import Text from "@lib/component/Text";
import identifier from "@lib/types/identifier";
import FlexColumn from "@root/lib/component/FlexColumn";

import styling from "@assets/styling.module.css";

const Section: React.FC<identifier> = ({ name, description, children }) => {
  return (
    <FlexColumn style={{ gap: 10 }} className={styling.align_items_flex_start}>
      <Text preset='1.5em-bold'>{name}</Text>
      <Text preset='1.5em-normal' style={{ opacity: 0.5 }}>
        {description}
      </Text>
      {children}
    </FlexColumn>
  );
};

export default Section;
