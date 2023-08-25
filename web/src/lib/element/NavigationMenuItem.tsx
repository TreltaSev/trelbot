import React, { useRef } from "react";
import DepracatedText from "@root/lib/element/DepracatedText";

interface NavigationMenuItemProperties {
  name: string;
  href?: string;
  method?: () => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProperties> = ({ name, href, method }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const HoverOn = () => {
    if (componentRef.current) {
      componentRef.current.animate([{ opacity: "1" }], {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      });
    }
  };

  const HoverOff = () => {
    if (componentRef.current) {
      componentRef.current.animate([{ opacity: "0.8" }], {
        duration: 500,
        fill: "forwards",
        easing: "ease-in-out",
      });
    }
  };

  const Action = () => {
    if (method !== undefined) {
      method();
    }

    if (href !== undefined) {
      window.location.href = href;
    }
  };

  return (
    <div onClick={() => Action()} onMouseEnter={() => HoverOn()} onMouseLeave={() => HoverOff()} style={{ opacity: 0.8, cursor: "pointer" }} ref={componentRef}>
      <DepracatedText>{name}</DepracatedText>
    </div>
  );
};

export default NavigationMenuItem;
