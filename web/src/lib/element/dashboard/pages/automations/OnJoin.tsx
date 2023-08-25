import FlexColumn from "@lib/element/FlexColumn";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text"
import React from "react";

const OnJoin: React.FC = () => {
  return (
    <>
    <FlexColumn>
      <TextGroup>
        <Text preset="1.5em-normal" style={{color: "white", fontWeight: "700"}}>On Join Event</Text>
        <Text preset="1.5em-normal" style={{color: "white", opacity: "0.5"}}>Sends some sort of message based on the configuration below</Text>
      </TextGroup>
    </FlexColumn>
    
    </>
  );
};

export default OnJoin;
