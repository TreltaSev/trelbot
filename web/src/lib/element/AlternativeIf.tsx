import React from "react";
import component from "../types/component";

type type_AlternativeIf = component &{
  input_value?: any;
  alternative?: React.ReactNode;
  to_check?: any;
};

/**
 * Returns the specified alternative component if the input value is the same as the to_check value
 * returns the children if the value does not equal to check
 * value can be any value
 */
const AlternativeIf: React.ForwardRefRenderFunction<HTMLDivElement, type_AlternativeIf> = ({ input_value, alternative, to_check, children }) => {
  if (input_value === to_check) {
    return <>{alternative}</>;
  }
  return <>{children}</>;
};

export default AlternativeIf;
