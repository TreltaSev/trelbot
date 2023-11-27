import React from "react";
import component from "@lib/types/component";
import styling from "@assets/styling.module.css";

const FlexColumn: React.ForwardRefRenderFunction<HTMLDivElement, component> = ({ children, className, style, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onClick, innerref }) => {
  return (
    <div ref={innerref} onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={style} className={`${styling.flex_col} ${className}`} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
};

export default FlexColumn;
