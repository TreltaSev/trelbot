import React from "react";
import component from "@lib/types/component";

export type type_Text = component & {
  preset?: string;
};

type type_presets = {
  [key: string]: React.CSSProperties;
};

const presets: type_presets = {
  "1em-normal": { fontSize: "1em", fontWeight: "400", font: "lato" },
};

const Text: React.FC<type_Text> = ({ children, className, style, onClick, preset }) => {
  if (preset) {
    style = {...style, ...presets[preset]};
  }

  return (
    <span style={style} onClick={onClick} className={className}>
      {children}
    </span>
  );
};

export default Text;
