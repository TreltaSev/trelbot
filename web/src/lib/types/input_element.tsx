import React, { HTMLProps } from "react";

type input_element = HTMLProps<HTMLInputElement> & {
  innerref?: React.RefObject<HTMLInputElement>;
};

export default input_element;
