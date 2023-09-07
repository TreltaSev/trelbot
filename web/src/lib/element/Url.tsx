import React from "react";
import Text from "@lib/element/Text";
import { type_Text } from "@lib/element/Text";

type type_Url = type_Text & {
  href?: string;
};

const Url: React.FC<type_Url> = ({ children, className, style, preset, href }) => {
  const redirect = () => {
    if (!href) {
      return;
    }
    window.location.href = href;
  };
  return (
    <Text onClick={() => redirect()} className={className} style={style} preset={preset}>
      {children}
    </Text>
  );
};

export default Url;
