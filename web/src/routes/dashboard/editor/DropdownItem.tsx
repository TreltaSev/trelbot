import React from "react";
import component from "@root/lib/types/component";
import styling from "@assets/styling.module.css";
import defaultValue from "@root/lib/method/defaultValue";
import FlexRow from "@root/lib/component/FlexRow";
import Text from "@root/lib/component/Text";
import animate_color from "@lib/method/animate@color";
import animate_background from "@lib/method/animate@background";

type props = component & {
  name?: string;
  nonActiveColor?: string;
  activeColor?: string;
  activeBackground?: string;
  nonActiveBackground?: string;
  backing?: React.ReactNode;
  forwarding?: React.ReactNode;
};

const DropdownItem: React.FC<props> = ({ onClick, name, nonActiveColor, activeColor, nonActiveBackground, activeBackground, backing, forwarding }) => {
  const wrapper = React.useRef<HTMLDivElement | null>(null);
  const text = React.useRef<HTMLSpanElement | null>(null);

  name = defaultValue(name, "empty", undefined);
  nonActiveColor = defaultValue(nonActiveColor, "rgba(255,255,255,0.5)", undefined);
  activeColor = defaultValue(activeColor, "rgba(255,255,255,1.0)", undefined);
  activeBackground = defaultValue(activeBackground, "rgba(255,255,255,0.1)");
  nonActiveBackground = defaultValue(nonActiveBackground, "rgba(0,0,0,0)");
  return (
    <FlexRow
      innerref={wrapper}
      style={{ borderRadius: 5, padding: 10, cursor: "pointer", gap: 5, height: 40 }}
      onClick={onClick}
      onMouseEnter={() =>
        animate_background({
          ref: wrapper,
          new_color: activeBackground,
          whileAnimate: () => {
            animate_color({ ref: text, new_color: activeColor });
          },
        })
      }
      onMouseLeave={() =>
        animate_background({
          ref: wrapper,
          new_color: nonActiveBackground,
          whileAnimate: () => {
            animate_color({ ref: text, new_color: nonActiveColor });
          },
        })
      }
      className={`${styling.align_self_stretch} ${styling.align_items_flex_end} ${styling.border_box}`}>
      <React.Fragment>{backing}</React.Fragment>
      <Text innerref={text} preset='basic' style={{ fontSize: "1em", color: activeColor }}>
        {name}
      </Text>
      <React.Fragment>{forwarding}</React.Fragment>
    </FlexRow>
  );
};

export default DropdownItem;
