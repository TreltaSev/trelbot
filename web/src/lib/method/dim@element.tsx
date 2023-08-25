import React from "react"

const dim_element = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) {
    return
  }

  ref.current.animate({})

}