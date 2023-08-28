import React from "react";
import styling from "@assets/styling.module.css";
import guild from "@lib/types/guild";
import FlexRow from "@lib/element/FlexRow";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text";
import Url from "@lib/element/Url";
import InlineFlex from "@lib/element/InlineFlex";
import LoadingAnimated from "@lib/element/LoadingAnimated";

type type_GuildContainer = {
  guild: guild | undefined;
};

const GuildContainer: React.FC<type_GuildContainer> = ({ guild }) => {
  const main_style: React.CSSProperties = { paddingLeft: 10, paddingRight: 10, gap: 10, borderRadius: 5, height: 65, flexShrink: 0 };
  const main_class: string = `${styling.align_items_center} ${styling.align_self_stretch} ${styling.darksub}`;

  if (!guild) {
    return (
      <FlexRow style={main_style} className={`${main_class} ${styling.justify_content_center}`}>
        <LoadingAnimated size={8} gap={4} heightoffset={6} amount={3} duration={0.5} />
      </FlexRow>
    );
  }

  return (
    <FlexRow style={main_style} className={main_class}>
      <img alt='' src={guild?.icon_url} style={{ borderRadius: "50%" }} width={40} height={40} />
      <TextGroup style={{ gap: 5 }}>
        <Text preset='1em-normal' style={{ color: "white", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: 150 }}>
          {guild?.name}
        </Text>

        <InlineFlex>
          <Url preset='1em-normal' style={{ opacity: "0.5", cursor: "pointer", display: "inline-block" }} href='/dashboard'>
            Go to Selector
          </Url>
        </InlineFlex>
      </TextGroup>
    </FlexRow>
  );
};

export default GuildContainer;
