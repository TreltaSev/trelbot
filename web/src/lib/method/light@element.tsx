import React from "react";

const light_element = (ref: React.RefObject<HTMLDivElement>): Animation | undefined => {
  if (!ref.current) {
    return;
  }
  return ref.current.animate({ opacity: "1" }, { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" });
};

export default light_element;
