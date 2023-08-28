import React from "react";
import styling from "@assets/styling.module.css";
import component from "@lib/types/component";
import FlexRow from "./FlexRow";
import ChannelTag from "@lib/svg/ChannelTag";
import Text from "@lib/element/Text";
import Spacer from "@lib/element/Spacer";
import Arrow from "../svg/Arrow";

type type_dropdown = component & {};

const Dropdown: React.ForwardRefRenderFunction<HTMLDivElement, type_dropdown> = () => {
  return (
    <>
      <FlexRow style={{ width: 300, height: 30, flexShrink: 0, padding: "0 10px", gap: 10, borderRadius: 5 }} className={`${styling.align_items_center} ${styling.dark}`}>
        <ChannelTag style={{minWidth: 16, minHeight: 16, width: 16, height: 16}}/>
        <Text preset='1em-normal' style={{ opacity: "0.8", whiteSpace: "nowrap" }}>
          Select a Channel
        </Text>
        <Spacer />
        <Arrow style={{minWidth: 20, minHeight: 20, width: 20, height: 20}} />
      </FlexRow>
    </>
  );
};

export default Dropdown