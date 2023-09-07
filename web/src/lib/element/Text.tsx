import React from "react";
import span_component from "@lib/types/span_component";

export type type_Text = span_component & {
  preset?: string;
};

type type_presets = {
  [key: string]: React.CSSProperties;
};

const presets: type_presets = {
  bare: {fontFamily: "Lato"},
  basic: { fontWeight: "400", fontFamily: "Lato" },
  normal: { fontWeight: "400", fontFamily: "Lato", color: "white" },
  "1em-normal": { fontSize: "1em", fontWeight: "400", fontFamily: "Lato", color: "white" },
  "1.5em-normal": { fontSize: "1.5em", fontWeight: "400", fontFamily: "Lato", color: "white" },
};

const Text: React.FC<type_Text> = ({ children, className, style, onClick, preset, innerref }) => {
  if (preset) {
    style = { ...style, ...presets[preset] };
  }

  return (
    <span ref={innerref} style={style} onClick={onClick} className={className}>
      {children}
    </span>
  );
};

export default Text;
