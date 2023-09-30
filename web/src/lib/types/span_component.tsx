import React, { HTMLProps } from "react";

type span_component = HTMLProps<HTMLSpanElement> & {
  innerref?: React.RefObject<HTMLSpanElement>;
};

export default span_component;
