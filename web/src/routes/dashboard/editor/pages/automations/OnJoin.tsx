import React, { useEffect, useReducer, useState } from "react";
import FlexColumn from "@lib/component/FlexColumn";
import Text from "@lib/component/Text";
import mutgl from "@lib/vars/mutgl";
import intervalHelper from "@lib/method/intervalHelper";
import ChannelTag from "@lib/svg/ChannelTag";
import channel from "@lib/types/channel";
import shard from "@lib/types/shard";
import Dropdown from "@root/routes/dashboard/editor/Dropdown";
import DropdownItem from "@root/routes/dashboard/editor/DropdownItem";

import styling from "@assets/styling.module.css";
import { SectionChannel, SectionConceptSave, SectionCustomImageData, SectionEnableText, SectionEntrance, SectionSeparator, SectionTextContent, SectionUseCustomImage } from "./sections";

const OnJoin: React.FC = () => {
  // Force update used when refreshing metaguild
  const forceUpdate = useReducer((x) => x + 1, 0)[1];
  const channels_dropdown = React.useRef<Dropdown>(null);
  let sharded_channels: shard[] | channel[] | undefined = undefined;
  const readable: string = "On Join";
  const parent: string = "automations";
  const script_use: string = `${parent}:onjoin`;
  const [initial_values, set_initial_values] = useState<undefined | any>(undefined);

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

    if (mutgl.cGuild.meta.settings) {
      handleActive(mutgl.cGuild.meta.settings.automations.on_join.active);
      handleChannel("initial", mutgl.cGuild.meta.settings.automations.on_join.channel);
      handleEnableText(mutgl.cGuild.meta.settings.automations.on_join.enable_text);
      handleTextContent(mutgl.cGuild.meta.settings.automations.on_join.text_content);
      handleUseCustomImage(mutgl.cGuild.meta.settings.automations.on_join.use_custom_image);
      handleCustomImageData(mutgl.cGuild.meta.settings.automations.on_join.custom_image_data);
      set_initial_values(mutgl.cGuild.meta.settings.automations.on_join);
    }
  }, []);

  // Convert list to shard
  if (mutgl.cChannels.meta !== undefined) {
    sharded_channels = [...mutgl.cChannels.meta];
    sharded_channels = sharded_channels
      .filter((channel) => channel.type === 0)
      .map((channel) => {
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

  // OYE since the set possible initial is first fired after the first event,
  // this means that the initial value isn't actual activated until after the user already makes a change, swapping the values. fix this.
  const handleActive = (currentToggle: boolean) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:active`, currentToggle, false, true);
  };

  const handleChannel = (serverName: string | null, serverID: string | null) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:channel`, serverID === null ? null : { name: serverName, id: serverID }, false, true);
  };

  const handleEnableText = (currentToggle: boolean) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:enable_text`, currentToggle, false, true);
  };

  const handleTextContent = (currentValue: string) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:text_content`, currentValue === null ? null : currentValue, false, true);
  };

  const handleUseCustomImage = (currentToggle: boolean) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:use_custom_image`, currentToggle, false, true);
  };

  const handleCustomImageData = (currentValue: string | null) => {
    mutgl.DashboardChangeable.setPossibleInitial(`${script_use}:custom_image_data`, currentValue === null ? null : currentValue, false, true);
  };

  if (initial_values === undefined) {
    return <span>Nothing...</span>;
  }

  return (
    <FlexColumn style={{ gap: 25 }} className={`${styling.fill_all}`}>
      <SectionEntrance callback={(currentToggle: boolean) => handleActive(currentToggle)} readable={readable} initial={initial_values.active} />

      <SectionSeparator />

      <SectionChannel callback={(serverName: string, serverID: string) => handleChannel(serverName, serverID)} items={sharded_channels} innerref={channels_dropdown} readable={readable} />

      <SectionSeparator />

      <SectionEnableText callback={(currentToggle: boolean) => handleEnableText(currentToggle)} readable={readable} initial={initial_values.enable_text} />

      <SectionSeparator />

      <SectionTextContent callback={(currentValue: string) => handleTextContent(currentValue)} readable={readable} initial={initial_values.text_content} />

      <SectionSeparator />

      <SectionUseCustomImage callback={(currentToggle: boolean) => handleUseCustomImage(currentToggle)} readable={readable} initial={initial_values.use_custom_image} />

      <SectionSeparator />

      <SectionCustomImageData callback={(currentValue: string) => handleCustomImageData(currentValue)} readable={readable} initial={initial_values.custom_image_data} />

      <SectionSeparator />

      <SectionConceptSave readable={readable} />
    </FlexColumn>
  );
};

export default OnJoin;
