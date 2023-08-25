import React from "react";
import styling from "@assets/styling.module.css";
import { get } from "@lib/element/dashboard/loader";
import guild from "@lib/types/guild";
import FlexRow from "@lib/element/FlexRow";
import TextGroup from "@lib/element/TextGroup";
import Text from "@lib/element/Text";
import Url from "@lib/element/Url";
type type_GuildContainer = {
  guild: guild | undefined;
};

const GuildContainer: React.FC<type_GuildContainer> = ({ guild }) => {
  return (
    <FlexRow style={{ padding: 10, gap: 10 }} className={`${styling.align_items_center} ${styling.align_self_stretch}`}>
      {/* Image */}
      <img alt='' src={guild?.icon_url} style={{ borderRadius: "50%" }} width={40} height={40} />
      <TextGroup style={{ gap: 5 }}>
        <Text preset='1em-normal' style={{ color: "white" }}>
          {guild?.name}
        </Text>
        <Url preset='1em-normal' style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
          Go to Selector
        </Url>
      </TextGroup>
    </FlexRow>
  );
};

export default GuildContainer;
