import React, { useEffect, useReducer } from "react";
import Section from "@root/routes/dashboard/editor/Section";
import FlexColumn from "@lib/component/FlexColumn";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import Dropdown from "@root/routes/dashboard/editor/Dropdown";
import mutgl from "@lib/vars/mutgl";
import intervalHelper from "@lib/method/intervalHelper";
import Text from "@lib/component/Text";
import channel from "@lib/types/channel";
import DropdownItem from "@root/routes/dashboard/editor/DropdownItem";
import ChannelTag from "@lib/svg/ChannelTag";
import shard from "@lib/types/shard";
import TextArea from "@root/routes/dashboard/editor/TextArea";
import WavingHand from "@root/lib/svg/WavingHand";
import FlexRow from "@root/lib/component/FlexRow";

const OnJoin: React.FC = () => {
  // Force update used when refreshing metaguild
  const forceUpdate = useReducer((x) => x + 1, 0)[1];
  const channels_dropdown = React.useRef<Dropdown>(null);
  let sharded_channels: shard[] | channel[] | undefined = undefined;

  const get_parent = (array: channel[], parent_id: null | string): channel | undefined => {
    return array.find((child) => {
      if (child.id) {
        return child.id.toString() === parent_id;
      }
      return undefined;
    });
  };

  /**
   * @useEffect creates an interval that checks if the current channels.meta
   * is undefined or if its been set.
   * if its been set it refreshes this entire component,
   */
  useEffect(() => {
    const interval = setInterval(() => {
      new intervalHelper(mutgl.cChannels.meta !== undefined, forceUpdate, interval);
    }, 500);
  }, []);

  // Convert list to shard
  if (mutgl.cChannels.meta !== undefined) {
    sharded_channels = [...mutgl.cChannels.meta];
    sharded_channels = sharded_channels
      .filter((channel) => channel.type === 0)
      .map((channel) => {
        console.info(`Map: ${channel.name}`);
        let forwarding = null;
        if (channel.parent_id) {
          forwarding = (
            <Text preset='normal' style={{ fontSize: "0.5em", opacity: "0.5", marginLeft: "auto" }}>
              {get_parent(sharded_channels as channel[], channel.parent_id as string | null)?.name}
            </Text>
          );
        }

        return Dropdown.form(channel.name as string, <DropdownItem onClick={() => channels_dropdown.current?.choose(channel.name, channel.id)} forwarding={forwarding} name={channel.name} backing={<ChannelTag style={{ width: 16, height: 16, opacity: 0.8 }} />} />, channel.position);
      });
  }

  return (
    <FlexColumn style={{ gap: 25 }}>
      <Section icon={<WavingHand style={{ width: 24, height: 24, flex: "0 0 auto" }} />} name='On Join Event' description='Sends some sort of message when a user joins based on the configuration below' />
      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />
      <Section name='Channel' description='The channel which the event is assigned'>
        <Dropdown identifier='Channel' items={sharded_channels as shard[] | undefined} ref={channels_dropdown} />
        <ToggleButton initial={false} />
      </Section>

      <Section name='Text' description='Sends a text message to the selected channel'>
        <TextArea />
        <ToggleButton initial={false} />
      </Section>

      <Section name='Image' description='Creates an image using css-like format'>
        <TextArea />
        <ToggleButton initial={false} />
      </Section>
    </FlexColumn>
  );
};

export default OnJoin;
