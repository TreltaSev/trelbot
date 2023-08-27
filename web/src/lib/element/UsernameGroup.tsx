import React from "react";
import styling from "@assets/styling.module.css";
import Text from "@lib/element/Text";
import user from "@lib/types/user";
import FlexRow from "@lib/element/FlexRow";

interface UsernameGroupProps {
  user: user | undefined;
}

const UsernameGroup: React.FC<UsernameGroupProps> = ({ user }) => {
  if (user === undefined) {
    return <></>;
  }
  return (
    <FlexRow style={{whiteSpace: "nowrap"}}>
      <Text preset="normal" style={{fontSize: 14}}>{user.name}</Text>
      <Text preset="normal" style={{fontSize: 14, opacity: "0.5"}}>
        #{user.discriminator}
      </Text>
    </FlexRow>
  );
};

export default UsernameGroup;
