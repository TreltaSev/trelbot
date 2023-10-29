import React from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/component/FlexColumn";
import GuildContainer from "./GuildContainer";
import loader, { cModal } from "./loader";
import TabContainer from "./TabContainer";

type props = {
  onUpdate?: ((modal: cModal) => void) | null;
};

/**
 * @displays A navigation tab containing the guild information and inner buttons that link to other tabs.
 * @usedin Editor.tsx
 */
const NavigationTab: React.FC<props> = ({ onUpdate }) => {
  const bUpdate = (modal: cModal) => {
    if (onUpdate) {
      onUpdate(modal);
    }
  };
  return (
    <FlexColumn style={{ width: 250, gap: 10, padding: "0 10px", flexShrink: 0 }} className={`${styling.fill_height} ${styling.align_items_center} ${styling.border_box} ${styling.dark}`}>
      <GuildContainer />
      {new loader().get().map((child) => (
        <TabContainer
          meta={child as cModal}
          key={`${child.name}--container`}
          onClick={() => {
            bUpdate(child as cModal);
          }}
        />
      ))}
    </FlexColumn>
  );
};

export default NavigationTab;
