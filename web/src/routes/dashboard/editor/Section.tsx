import React from "react";
import Text from "@lib/component/Text";
import identifier from "@lib/types/identifier";
import FlexColumn from "@root/lib/component/FlexColumn";

import styling from "@assets/styling.module.css";
import FlexRow from "@root/lib/component/FlexRow";
import Spacer from "@root/lib/component/Spacer";

const Section: React.FC<identifier> = ({ name, description, children, icon }) => {
  return (
    <FlexColumn style={{ gap: 10 }} className={`${styling.align_items_flex_start} ${styling.align_self_stretch}`}>
      <FlexRow style={{ gap: 10, width: "100%" }}>
        {icon === undefined ? <></> : icon}
        <Text preset='1.5em-bold' style={{ whiteSpace: "nowrap" }}>
          {name}
        </Text>
        <Spacer />
        <FlexColumn style={{ gap: 10 }}>{children}</FlexColumn>
      </FlexRow>
      <Text preset='1.5em-normal' style={{ opacity: typeof description === "string" ? 0.5 : 1.0 }}>
        {description}
      </Text>
    </FlexColumn>
  );
};

export default Section;
