import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/component/FlexColumn";
import GuildContainer from "./GuildContainer";

/**
 * @displays A navigation tab containing the guild information and inner buttons that link to other tabs.
 * @usedin Editor.tsx
 */
const NavigationTab: React.FC = () => {
  return (
    <FlexColumn style={{ width: 250, gap: 10, padding: "0 10px", flexShrink: 0 }} className={`${styling.fill_height} ${styling.align_items_center} ${styling.border_box} ${styling.dark}`}>
      <GuildContainer />
    </FlexColumn>
  );
};

export default NavigationTab;
