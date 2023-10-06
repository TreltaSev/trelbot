import React from "react";
import mutgl from "@lib/vars/mutgl";
import Url from "@lib/component/Url";
import Text from "@lib/component/Text";
import FlexRow from "@lib/component/FlexRow";
import styling from "@assets/styling.module.css";
import InlineFlex from "@lib/component/InlineFlex";
import FlexColumn from "@lib/component/FlexColumn";
import LoadingAnimated from "@lib/component/LoadingAnimated";

const GuildContainer: React.FC = () => {
  // Multi used values for simplicity
  const main_style: React.CSSProperties = { paddingLeft: 10, paddingRight: 10, gap: 10, borderRadius: 5, height: 65, flexShrink: 0 };
  const main_class: string = `${styling.align_items_center} ${styling.align_self_stretch} ${styling.darksub}`;

  // Get cached meta data from guild object
  const metaGuild = mutgl.cGuild.meta;

  console.log(metaGuild);

  /**
   * ! Stoped Here
   * TODO: Implement looper to check metaGuild
   * Since the data is loaded only once and since
   * I refuse to use `useContext` I should create a method
   * that loops until a value equals something else.
   */

  if (Object.keys(metaGuild).length == 0) {
    // Return a loading animation or smth
    return (
      <FlexRow style={main_style} className={`${main_class} ${styling.justify_content_center}`}>
        <LoadingAnimated size={8} gap={4} heightoffset={6} amount={3} duration={0.5} />
      </FlexRow>
    );
  }

  return (
    // Return a guild chip, containing a link to go back to guild selector
    <FlexRow style={main_style} className={main_class}>
      {/**
       * Image
       */}
      <img alt='' src={metaGuild.icon_url} style={{ borderRadius: "50%" }} width={40} height={40} />

      <FlexColumn style={{ gap: 5 }}>
        {/**
         * Name Container
         */}
        <Text preset='1em-normal' style={{ color: "white", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: 150 }}>
          {metaGuild.name}
        </Text>

        {/**
         * Go to selctor
         */}
        <InlineFlex>
          <Url preset='1em-normal' style={{ opacity: "0.5", cursor: "pointer", display: "inline-block" }} href='/dashboard'>
            Go to Selector
          </Url>
        </InlineFlex>
      </FlexColumn>
    </FlexRow>
  );
};

export default GuildContainer;
