import React from "react";
import styling from "@assets/styling.module.css";

type type_InlineFlex = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const InlineFlex: React.FC<type_InlineFlex> = ({children, className, style}) => {
  return (
    <div style={style} className={`${styling.inline_flex} ${className}`}>
      {children}
    </div>
  )
}

export default InlineFlex