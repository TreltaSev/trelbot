import React from "react";
import FlexColumn from "./FlexColumn";

type type_TextGroup = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const TextGroup: React.FC<type_TextGroup> = ({ children, className, style }) => {
  return (
    <FlexColumn style={style} className={className}>
      {children}
    </FlexColumn>
  );
};

export default TextGroup;
