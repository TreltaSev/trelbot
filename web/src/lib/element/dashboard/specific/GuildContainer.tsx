import React from "react";
import styling from "@assets/styling.module.css";
import { get } from "@lib/element/dashboard/loader";
import guild from "@lib/types/guild";
import FlexRow from "@lib/element/FlexRow";

type type_GuildContainer = {
  guild: guild | undefined
}

const GuildContainer: React.FC<type_GuildContainer> = ({ guild }) => {
  return (
    <FlexRow style={{padding: 10, gap: 10}} className={`${styling.align_items_center} ${styling.align_self_stretch}`}>
      {/* Image */}

      
    </FlexRow>
  )
}