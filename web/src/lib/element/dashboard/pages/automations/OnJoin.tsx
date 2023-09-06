import FlexColumn from "@lib/element/FlexColumn";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text";
import React, { useContext, useEffect } from "react";
import ToggleButton from "@lib/element/ToggleButton";
import Dropdown from "@lib/element/Dropdown";
import { channels } from ".";
import channel from "@lib/types/channel";
import DropdownItem from "@root/lib/element/DropdownItem";
import dropdown_item_shard from "@lib/types/dropdown_item_shard";

const OnJoin: React.FC = () => {
  const toggleRef = React.useRef(null);
  const channelsDropdownRef = React.useRef<Dropdown>(null);
  const { value_channels } = React.useContext(channels);
  let shard_each: any = [];

  if (value_channels) {
    shard_each = value_channels.map((_v) => {
      if (!channelsDropdownRef.current) {
        return;
      }
      return Dropdown.form(_v.name as string, <DropdownItem displayName={_v.name as string}/>, 0);
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
