import FlexColumn from "@lib/element/FlexColumn";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text"
import React from "react";
import ToggleButton from "@root/lib/element/ToggleButton";

const OnJoin: React.FC = () => {
  const toggleRef = React.useRef(null);
  return (
    <>
    <FlexColumn style={{gap: 20}}>
      <TextGroup>
        <Text preset="1.5em-normal" style={{color: "white", fontWeight: "700"}}>On Join Event</Text>
        <Text preset="1.5em-normal" style={{color: "white", opacity: "0.5"}}>Sends some sort of message based on the configuration below</Text>
      </TextGroup>
      <ToggleButton ref={toggleRef} ontoggle={() => console.log("heheheha")}/>
    </FlexColumn>
    
    </>
  );
};

export default OnJoin;
