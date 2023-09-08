import React from "react";
import Text from "@lib/element/Text";
import ChannelTag from "@lib/svg/ChannelTag";
import Dropdown from "@lib/element/Dropdown";
import TextGroup from "@lib/element/TextGroup";
import FlexColumn from "@lib/element/FlexColumn";
import ToggleButton from "@lib/element/ToggleButton";
import DropdownItem from "@lib/element/DropdownItem";
import { channels } from "@lib/element/dashboard/pages/automations";
import channel from "@root/lib/types/channel";

const OnJoin: React.FC = () => {
  const toggleRef = React.useRef(null);
  const channelsDropdownRef = React.useRef<Dropdown>(null);
  const { value_channels } = React.useContext(channels);
  let shard_each: any = undefined;

  const get_parent = (array: channel[], parent_id: null | string): channel | undefined => {
    return array.find((child) => child.id.toString() === parent_id);
  };

  if (value_channels) {
    shard_each = value_channels
      .filter((_v) => _v.type === 0)
      .map((_v) => {
        let forwarding = null;
        if (_v.parent_id) {
          forwarding = (
            <Text preset='normal' style={{ fontSize: "0.5em", opacity: "0.5", marginLeft: "auto" }}>
              {get_parent(value_channels, _v.parent_id)?.name}
            </Text>
          );
        }

        return Dropdown.form(_v.name as string, <DropdownItem onClick={() => channelsDropdownRef.current?.choose(_v.name, _v.id)} forwarding={forwarding} displayName={_v.name as string} backing={<ChannelTag style={{ width: 16, height: 16, opacity: 0.8 }} />} />, _v.position);
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
        <Dropdown ref={channelsDropdownRef} _items={shard_each} _plural_concat={true} />
        <ToggleButton ref={toggleRef} ontoggle={() => console.log("heheheha")} />
      </FlexColumn>
    </>
  );
};

export default OnJoin;
