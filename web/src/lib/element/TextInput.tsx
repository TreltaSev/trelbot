import React from "react";
import input_element from "@lib/types/input_element";

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, input_element> = ({ children, className, style, onChange, innerref}) => {
  return <input style={style} className={className} onChange={onChange} ref={innerref}>{children}</input>
}

export default TextInput