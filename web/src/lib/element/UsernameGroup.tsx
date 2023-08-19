import React from "react";
import styling from "@assets/styling.module.css";
import me from "@lib/types/me";
import Text from "@lib/element/Text";

interface UsernameGroupProps {
  me: me;
}

const UsernameGroup: React.FC<UsernameGroupProps> = ({ me }) => {
  if (me.user === undefined) {
    return <></>;
  }
  return (
    <div className={`${styling.flex_row}`}>
      <Text size={14}>{me.user.name}</Text>
      <Text size={14} opacity='0.5'>
        #{me.user.discriminator}
      </Text>
    </div>
  );
};

export default UsernameGroup;