import React from "react";
import Text from "@lib/element/Text";
import FlexRow from "@lib/element/FlexRow";
import styling from "@assets/styling.module.css";
import animate_background from "@lib/method/animate@background";
import animate_color from "../method/animate@color";

type type_DropdownItem = {};
const DropdownItem: React.FC<type_DropdownItem> = () => {
  const dropdownItemRef = React.useRef<HTMLDivElement | null>(null);
  const dropdownTextRef = React.useRef<HTMLSpanElement | null>(null);
  return (
    <>
      <FlexRow
        innerref={dropdownItemRef}
        style={{ borderRadius: 5, padding: 5 }}
        onMouseEnter={() =>
          animate_background({
            ref: dropdownItemRef,
            new_color: "rgba(255,255,255,0.1)",
            whileAnimate: () => {
              animate_color({ ref: dropdownTextRef, new_color: "rgba(255,255,255,1.0)" });
            },
          })
        }
        onMouseLeave={() =>
          animate_background({
            ref: dropdownItemRef,            
            new_color: "rgba(0,0,0,0)",
            whileAnimate: () => {
              animate_color({ ref: dropdownTextRef, new_color: "rgba(255,255,255,0.5)" });
            },
          })
        }
        className={`${styling.align_self_stretch} ${styling.align_items_center} ${styling.border_box} ${styling.main}`}>
        <Text innerref={dropdownTextRef} preset='1em-normal'>
          Some Server
        </Text>
      </FlexRow>
    </>
  );
};

export default DropdownItem;
