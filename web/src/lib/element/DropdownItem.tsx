import React from "react";
import Text from "@lib/element/Text";
import FlexRow from "@lib/element/FlexRow";
import component from "@lib/types/component";
import styling from "@assets/styling.module.css";
import defaultValue from "@lib/method/defaultValue";
import animate_color from "@lib/method/animate@color";
import animate_background from "@lib/method/animate@background";

type type_DropdownItem = component & {
  displayName: string;
  nonActiveColor?: string;
  activeColor?: string;
  activeBackground?: string;
  nonActiveBackground?: string;
  backing?: React.ReactNode;
  forwarding?: React.ReactNode;
};
const DropdownItem: React.FC<type_DropdownItem> = ({ onClick, displayName, nonActiveColor, activeColor, activeBackground, nonActiveBackground, backing, forwarding }) => {
  const dropdownItemRef = React.useRef<HTMLDivElement | null>(null);
  const dropdownTextRef = React.useRef<HTMLSpanElement | null>(null);

  const _displayName = defaultValue(displayName, "empty", undefined);
  const _nonActiveColor = defaultValue(nonActiveColor, "rgba(255,255,255,0.5)", undefined);
  const _activeColor = defaultValue(activeColor, "rgba(255,255,255,1.0)", undefined);
  const _activeBackground = defaultValue(activeBackground, "rgba(255,255,255,0.1)");
  const _nonActiveBackground = defaultValue(nonActiveBackground, "rgba(0,0,0,0)");
  return (
    <>
      <FlexRow
        innerref={dropdownItemRef}
        style={{ borderRadius: 5, padding: 10, cursor: "pointer", gap: 5, height: 40 }}
        onClick={onClick}
        onMouseEnter={() =>
          animate_background({
            ref: dropdownItemRef,
            new_color: _activeBackground,
            whileAnimate: () => {
              animate_color({ ref: dropdownTextRef, new_color: _activeColor });
            },
          })
        }
        onMouseLeave={() =>
          animate_background({
            ref: dropdownItemRef,
            new_color: _nonActiveBackground,
            whileAnimate: () => {
              animate_color({ ref: dropdownTextRef, new_color: _nonActiveColor });
            },
          })
        }
        className={`${styling.align_self_stretch} ${styling.align_items_flex_end} ${styling.border_box}`}>
        <React.Fragment>{backing}</React.Fragment>
        <Text innerref={dropdownTextRef} preset='basic' style={{ fontSize: "1em", color: _nonActiveColor }}>
          {_displayName}
        </Text>
        <React.Fragment>{forwarding}</React.Fragment>
      </FlexRow>
    </>
  );
};

export default DropdownItem;
