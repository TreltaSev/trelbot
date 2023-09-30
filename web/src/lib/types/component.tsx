import React, { HTMLProps } from "react";

type component = HTMLProps<HTMLDivElement> & {
  innerref?: React.RefObject<HTMLDivElement>;
};

export default component;
