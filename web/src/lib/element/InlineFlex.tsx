import React from "react";
import styling from "@assets/styling.module.css";
import component from "@lib/types/component";

const InlineFlex: React.FC<component> = ({children, className, style, onMouseEnter, onMouseLeave, onClick}) => {
  return (
    <div onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} className={`${styling.inline_flex} ${className}`}>
      {children}
    </div>
  )
}

export default InlineFlex