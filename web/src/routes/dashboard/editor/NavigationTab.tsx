import React, { useEffect, useReducer } from "react";
import styling from "@assets/styling.module.css";
import FlexColumn from "@lib/component/FlexColumn";
import GuildContainer from "./GuildContainer";
import loader, { cModal } from "./loader";
import TabContainer from "./TabContainer";
import intervalHelper from "@root/lib/method/intervalHelper";
import mutgl from "@root/lib/vars/mutgl";
import FlexRow from "@root/lib/component/FlexRow";
import LoadingAnimated from "@root/lib/component/LoadingAnimated";

type props = {
  onUpdate?: ((modal: cModal) => void) | null;
};

/**
 * @displays A navigation tab containing the guild information and inner buttons that link to other tabs.
 * @usedin Editor.tsx
 */
const NavigationTab: React.FC<props> = ({ onUpdate }) => {
  const forceUpdate = useReducer((x) => x + 1, 0)[1];

  const bUpdate = (modal: cModal) => {
    if (onUpdate) {
      onUpdate(modal);
    }
  };

  /**
   * @useEffect creates an interval that runs every 500 ms and that interval
   * checks if metaGuild is undefined, if it is continue about its day, if not it
   * sets the state of a value to save the current guild. this is used instead of context api
   */
  useEffect(() => {
    const interval = setInterval(() => {
      new intervalHelper(Object.keys(mutgl.cGuild.meta).length > 1, forceUpdate, interval);
    }, 500);
  }, []);

  if (Object.keys(mutgl.cGuild.meta).length == 0) {
    return (
      <FlexColumn style={{ width: 250, gap: 10, padding: "0 10px", flexShrink: 0 }} className={`${styling.fill_height} ${styling.align_items_center} ${styling.border_box} ${styling.dark}`}>
        <GuildContainer inactive={true} />
        <FlexColumn className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`}>
          <LoadingAnimated size={8} gap={4} heightoffset={6} amount={3} duration={0.5} />
        </FlexColumn>
      </FlexColumn>
    );
  }

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
