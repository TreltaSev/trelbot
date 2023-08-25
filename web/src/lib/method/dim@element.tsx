import React, {useRef} from "react"

const dim_element = (ref: React.RefObject<HTMLDivElement>): Animation | undefined | null => {
  if (!ref.current) {
    return null
  }
  return ref.current.animate({opacity: "0.8"}, {duration: 300, fill: "forwards", easing: "cubic-bezier(0.68, -0.6, 0.32, 1.6)"})
}

export default dim_element