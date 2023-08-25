import React from "react";
import styling from "@assets/styling.module.css";
import component from "@lib/types/component";

const FlexRow: React.FC<component> = ({children, className, style, onMouseEnter, onMouseLeave, onClick, ref}) => {
  return (
    <div ref={ref} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} className={`${styling.flex_row} ${className}`}>
      {children}
    </div>
  )
}

export default FlexRow