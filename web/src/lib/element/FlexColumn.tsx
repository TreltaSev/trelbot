import React from "react";
import styling from "@assets/styling.module.css";
import component from "@lib/types/component";

const FlexColumn: React.FC<component> = ({children, className, style, onMouseEnter, onMouseLeave, onClick}) => {
  return (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} className={`${styling.flex_col} ${className}`}>
      {children}
    </div>
  )
}

export default FlexColumn