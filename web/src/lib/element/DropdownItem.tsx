import React from "react";
import Text from "@lib/element/Text";
import FlexRow from "@lib/element/FlexRow";
import styling from "@assets/styling.module.css";
import animate_background from "@lib/method/animate@background";
import animate_color from "../method/animate@color";
import defaultValue from "../method/defaultValue";

type type_DropdownItem = {
  displayName: string;
  nonActiveColor?: string;
  activeColor?: string;
  activeBackground?: string;
  nonActiveBackground?: string;
};
const DropdownItem: React.FC<type_DropdownItem> = ({ displayName, nonActiveColor, activeColor, activeBackground, nonActiveBackground }) => {
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
        style={{ borderRadius: 5, padding: 10, cursor: "pointer" }}
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
        className={`${styling.align_self_stretch} ${styling.align_items_center} ${styling.border_box}`}>
        <Text innerref={dropdownTextRef} preset='basic' style={{ fontSize: "1em", color: _nonActiveColor }}>
          {_displayName}
        </Text>
      </FlexRow>
    </>
  );
};

export default DropdownItem;
