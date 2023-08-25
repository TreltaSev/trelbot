import React from "react";
import component from "@lib/types/component";
import Text from "./Text";

type type_Url = component & {
  href?: string;
};

const Url: React.FC<type_Url> = ({ children, className, style, href }) => {
  const redirect = () => {
    if (!href) {
      return;
    }
    window.location.href = href;
  };
  return (
    <Text onClick={() => redirect()} className={className} style={style}>
      {children}
    </Text>
  );
};

export default Url;
