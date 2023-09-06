import React, { Component, HTMLProps, LegacyRef, MutableRefObject } from "react";

type component = HTMLProps<HTMLDivElement> & {
  innerref?: React.RefObject<HTMLDivElement>;
};

export default component;
