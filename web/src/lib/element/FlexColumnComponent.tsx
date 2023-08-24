import React from "react";
import styling from "@assets/styling.module.css";

type type_FlexColumnComponent = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const FlexColumnComponent: React.FC<type_FlexColumnComponent> = ({children, className, style}) => {
  return (
    <div style={style} className={`${styling.flex_col} ${className}`}>
      {children}
    </div>
  )
}

export default FlexColumnComponent