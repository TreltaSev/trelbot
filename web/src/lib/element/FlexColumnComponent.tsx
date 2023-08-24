import React from "react";
import styling from "@assets/styling.module.css";

type type_FlexColumnComponent = {
  children?: React.ReactNode;
  classNames?: string;
  style?: React.CSSProperties;
}

const FlexColumnComponent: React.FC<type_FlexColumnComponent> = ({children, classNames, style}) => {
  return (
    <div style={style} className={`${styling.flex_col} ${classNames}`}>
      {children}
    </div>
  )
}

export default FlexColumnComponent