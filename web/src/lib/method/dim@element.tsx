import React from "react";
import defaultValue from "@lib/method/defaultValue";

const dim_element = (ref: React.RefObject<HTMLDivElement>, intensity?: string | number | null): Animation | undefined | null => {
  if (!ref.current) {
    return null;
  }
  const opacity = defaultValue(intensity, "0.8", undefined);
  return ref.current.animate({ opacity: opacity }, { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" });
};

export default dim_element;
