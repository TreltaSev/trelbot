import React from "react"

type animate_xd = {
  ref: React.RefObject<HTMLDivElement | HTMLSpanElement>,
  new_color?: string,
  whileAnimate?: () => void;
}

export default animate_xd