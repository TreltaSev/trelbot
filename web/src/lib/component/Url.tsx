import React from "react";
import Text, { type_Text } from "@lib/component/Text";

type type_Url = type_Text & { href?: string; result_type?: "new_window" | "redirect" };

const Url: React.FC<type_Url> = ({ children, className, style, preset, href, result_type }) => {
  return (
    <a href={href} target='_blank' style={{ textDecoration: "none" }}>
      <Text className={className} style={style} preset={preset}>
        {children}
      </Text>
    </a>
  );
};

export default Url;
