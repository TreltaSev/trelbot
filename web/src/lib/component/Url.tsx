import React from "react";
import Text, { type_Text } from "@lib/component/Text";

type type_Url = type_Text & { href?: string; new_window?: boolean };

const Url: React.FC<type_Url> = ({ children, className, style, preset, href, new_window }) => {
  const redirect = () => {
    if (!href) {
      return;
    }
    if (new_window) {
      window.open(href);
    } else {
      window.location.href = href;
    }
  };
  return (
    <Text onClick={() => redirect()} className={className} style={style} preset={preset}>
      {children}
    </Text>
  );
};

export default Url;
