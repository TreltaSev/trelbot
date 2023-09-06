import React from "react";
import Text from "@lib/element/Text";
import ChannelTag from "@lib/svg/ChannelTag";
import Dropdown from "@lib/element/Dropdown";
import TextGroup from "@lib/element/TextGroup";
import FlexColumn from "@lib/element/FlexColumn";
import ToggleButton from "@lib/element/ToggleButton";
import DropdownItem from "@lib/element/DropdownItem";
import { channels } from "@lib/element/dashboard/pages/automations";

const OnJoin: React.FC = () => {
  const toggleRef = React.useRef(null);
  const channelsDropdownRef = React.useRef<Dropdown>(null);
  const { value_channels } = React.useContext(channels);
  let shard_each: any = undefined;
  

  if (value_channels) {
    shard_each = value_channels.map((_v) => {
      return Dropdown.form(_v.name as string, <DropdownItem displayName={_v.name as string} backing={<ChannelTag style={{width: 16, height: 16, opacity: 0.8}}/>} />, 0);
    });
  }

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
        <Dropdown ref={channelsDropdownRef} _items={shard_each} />
      </FlexColumn>
    </>
  );
};

export default OnJoin;
