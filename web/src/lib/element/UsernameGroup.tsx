import React from "react";
import styling from "@assets/styling.module.css";
import DepracatedText from "@root/lib/element/DepracatedText";
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
      <DepracatedText size={14}>{user.name}</DepracatedText>
      <DepracatedText size={14} opacity='0.5'>
        #{user.discriminator}
      </DepracatedText>
    </div>
  );
};

export default UsernameGroup;
