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
import Url from "@root/lib/component/Url";
import styling from "@assets/styling.module.css";

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
    <FlexColumn style={{ gap: 25 }} className={`${styling.fill_all}`}>
      <Section icon={<WavingHand style={{ width: 24, height: 24, flex: "0 0 auto" }} />} name='On Join Event' description='Sends a customized message based on the configuration below.' />

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <Section name='Channel' description='The channel which the event is assigned'>
        <Dropdown identifier='Channel' items={sharded_channels as shard[] | undefined} ref={channels_dropdown} />
      </Section>

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <Section name='Enable Text' description='By enabling text, a text message will be sent with everything else. its similar to a user just typing a message.'>
        <ToggleButton initial={false} />
      </Section>

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <Section
        name='Text Content'
        description={
          <Text style={{ color: "rgba(255,255,255,0.5)" }}>
            The message that will be sent, will only show if Enable Text is toggled ON. This message also supports formatting which can be accessed with{" "}
            <Url href={"https://en.wikipedia.org/wiki/Bracket"} style={{ color: "#8c52ff", cursor: "pointer" }}>
              brackets
            </Url>
            /
            <Url href={"https://peps.python.org/pep-0498/"} style={{ color: "#8c52ff", cursor: "pointer" }}>
              fstrings
            </Url>
          </Text>
        }>
        <TextArea />
      </Section>

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <Section name='Use Custom Image' description='By enabling this, a image will be created using the configuration below and sent to the selected channel.'>
        <ToggleButton initial={false} />
      </Section>

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <Section
        name='Custom Image Data'
        description={
          <Text style={{ color: "rgba(255,255,255,0.5)" }}>
            The data that will be used to generate the custom image, this data is in a css-like string format who's documentation you can find{" "}
            <Url href='/docs/cssid' style={{ color: "#8c52ff", cursor: "pointer" }}>
              here
            </Url>
            , if you don't know about css, you should probably read up on it{" "}
            <Url href={"https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics"} style={{ color: "#8c52ff", cursor: "pointer" }}>
              here
            </Url>
            , its pretty simple, trust me. If the image data is invalid you will be warned with a notification, if you choose to ignore this warning, custom Image will be disabled.
          </Text>
        }>
        <TextArea />
      </Section>

      <FlexRow style={{ width: "100%", height: 2, borderRadius: 1, background: "rgb(255,255,255,0.1)" }} />

      <FlexColumn style={{ gap: 25 }}>
        <FlexRow style={{ borderRadius: 5, cursor: "pointer", height: 50 }} className={`${styling.align_self_stretch} ${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`}>
          <Text preset='normal' style={{ fontSize: 24 }}>
            Save
          </Text>
        </FlexRow>
        <Text preset='normal' style={{ fontSize: 16 }}>
          This concept design was influenced by{" "}
          <Url href='https://www.welcomer.gg/' style={{ color: "#8c52ff", cursor: "pointer" }}>
            welcomer.gg
          </Url>
          's dashboard and will be changed to something more original and unique after I stop procrastinating.
        </Text>
      </FlexColumn>
    </FlexColumn>
  );
};

export default OnJoin;
