import React from "react";
import styling from "@assets/styling.module.css";

type type_FlexRow = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FlexRow: React.FC<type_FlexRow> = ({children, className, style}) => {
  return (
    <div style={style} className={`${styling.flex_row} ${className}`}>
      {children}
    </div>
  )
}

export default FlexRow