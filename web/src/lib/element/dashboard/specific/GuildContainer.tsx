import React from "react";
import styling from "@assets/styling.module.css";
import guild from "@lib/types/guild";
import FlexRow from "@lib/element/FlexRow";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text";
import Url from "@lib/element/Url";
import InlineFlex from "@lib/element/InlineFlex";

type type_GuildContainer = {
  guild: guild | undefined;
};

const GuildContainer: React.FC<type_GuildContainer> = ({ guild }) => {
  return (
    <FlexRow style={{ padding: 10, gap: 10, borderRadius: 5 }} className={`${styling.align_items_center} ${styling.align_self_stretch} ${styling.darksub}`}>
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
