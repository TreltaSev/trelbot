import React from "react";
import input_element from "@lib/types/input_element";

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, input_element> = ({ children, className, style, onChange, innerref, disabled}) => {
  return <input style={style} className={className} onChange={onChange} disabled={disabled} ref={innerref}>{children}</input>
}

export default TextInput