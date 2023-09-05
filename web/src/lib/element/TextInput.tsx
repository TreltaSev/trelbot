import React from "react";
import input_element from "@lib/types/input_element";

type type_TextInput = input_element & {
  onFocusOut?: (event?: React.FocusEvent<HTMLInputElement, Element>) => void;
};

const TextInput: React.ForwardRefRenderFunction<HTMLInputElement, type_TextInput> = ({ children, className, style, onChange, innerref, disabled, value, placeholder, onFocus, onFocusOut }) => {
  return (
    <input style={style} value={value} placeholder={placeholder} className={className} onChange={onChange} onFocus={onFocus} onBlur={onFocusOut} disabled={disabled} ref={innerref}>
      {children}
    </input>
  );
};

export default TextInput;
