import FlexColumn from "@lib/element/FlexColumn";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text";
import React, { useContext } from "react";
import ToggleButton from "@lib/element/ToggleButton";
import Dropdown from "@lib/element/Dropdown";
import { channels } from ".";
import channel from "@lib/types/channel";

const OnJoin: React.FC = () => {
  const toggleRef = React.useRef(null);
  const channelsDropdownRef = React.useRef(null);
  const v_channels: channel[] | undefined = useContext(channels)
  
  console.log(channelsDropdownRef)
  return (
    <>
      <FlexColumn style={{ gap: 20 }}>
        <TextGroup>
          <Text preset='1.5em-normal' style={{ color: "white", fontWeight: "700" }}>
            On Join Event
          </Text>
          <Text preset='1.5em-normal' style={{ color: "white", opacity: "0.5" }}>
            Sends some sort of message based on the configuration below
          </Text>
        </TextGroup>
        <ToggleButton ref={toggleRef} ontoggle={() => console.log("heheheha")} />
        <Dropdown ref={channelsDropdownRef}/>
      </FlexColumn>
    </>
  );
};

export default OnJoin;
