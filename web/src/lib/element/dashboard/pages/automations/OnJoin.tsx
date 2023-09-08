import React from "react";
import Text from "@lib/element/Text";
import ChannelTag from "@lib/svg/ChannelTag";
import Dropdown from "@lib/element/Dropdown";
import channel from "@root/lib/types/channel";
import TextGroup from "@lib/element/TextGroup";
import FlexColumn from "@lib/element/FlexColumn";
import ToggleButton from "@lib/element/ToggleButton";
import DropdownItem from "@lib/element/DropdownItem";
import Section from "@lib/element/dashboard/specific/Section";
import { channels } from "@lib/element/dashboard/pages/automations";

const OnJoin: React.FC = () => {
  const ref_channel_toggle = React.useRef(null);
  const ref_text_toggle = React.useRef(null);
  const ref_image_toggle = React.useRef(null);
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
      <FlexColumn style={{ gap: 25 }}>
        <Section context_name='On Join Event' context_description='Sends some sort of message when a user joins based on the configuration below' />
        
        <Section context_name='Channel' context_description='The channel which the event is assigned'>
          <Dropdown ref={channelsDropdownRef} _items={shard_each} _plural_concat={true} />
          <ToggleButton ref={ref_channel_toggle} ontoggle={() => console.log("heheheha")} />
        </Section>        

        <Section context_name="Text" context_description="Sends a text message to the selected channel">
          <ToggleButton ref={ref_text_toggle} ontoggle={() => console.log("heheheha")} />
        </Section>

        <Section context_name="Image" context_description="Creates an image using css-like text">
          <ToggleButton ref={ref_image_toggle} ontoggle={() => console.log("heheheha")} />
        </Section>
        
      </FlexColumn>
    </>
  );
};

export default OnJoin;
