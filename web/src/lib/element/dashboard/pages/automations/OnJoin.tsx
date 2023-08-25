import FlexColumn from "@lib/element/FlexColumn";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text"
import React from "react";

const OnJoin: React.FC = () => {
  return (
    <>
    <FlexColumn>
      <TextGroup>
        <Text>On Join Event</Text>
        <Text>Sends some sort of message based on the configuration below</Text>
      </TextGroup>
    </FlexColumn>
    
    </>
  );
};

export default OnJoin;
