import React from "react";
import component from "@lib/types/component";
import styling from "@assets/styling.module.css";

const FlexRow: React.ForwardRefRenderFunction<HTMLDivElement, component> = ({ children, className, style, onMouseEnter, onMouseLeave, onClick, innerref }) => {
  return (
    <div ref={innerref} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} className={`${styling.flex_row} ${className}`}>
      {children}
    </div>
  );
};

export default FlexRow;
