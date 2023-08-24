import React from "react";
import styling from "@assets/styling.module.css";
import Text from "@lib/element/Text";
import user from "../types/user";

interface UsernameGroupProps {
  user: user;
}

const UsernameGroup: React.FC<UsernameGroupProps> = ({ user }) => {
  if (user === undefined) {
    return <></>;
  }
  return (
    <div className={`${styling.flex_row}`}>
      <Text size={14}>{user.name}</Text>
      <Text size={14} opacity='0.5'>
        #{user.discriminator}
      </Text>
    </div>
  );
};

export default UsernameGroup;
