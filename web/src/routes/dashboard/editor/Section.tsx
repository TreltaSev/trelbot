import React from "react";
import Text from "@lib/component/Text";
import identifier from "@lib/types/identifier";
import FlexColumn from "@root/lib/component/FlexColumn";

const Section: React.FC<identifier> = ({ name, description, children }) => {
  return (
    <FlexColumn>
      <Text>{name}</Text>
      <Text>{description}</Text>
      {children}
    </FlexColumn>
  );
};

export default Section;
