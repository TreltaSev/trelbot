import React from "react";
import user from "@root/lib/types/user";
import FlexRow from "@root/lib/component/FlexRow";
import Text from "@root/lib/component/Text";

type props = {
  user?: user | undefined;
};

/**
 * Contains a username component, takes in a user object.
 */
const UsernameGroup: React.FC<props> = ({ user }) => {
  if (user === undefined) {
    return <></>;
  }
  return (
    <FlexRow style={{ whiteSpace: "nowrap" }}>
      <Text preset='normal' style={{ fontSize: 14 }}>
        {user.name}
      </Text>
      <Text preset='normal' style={{ fontSize: 14, opacity: "0.5" }}>
        #{user.discriminator}
      </Text>
    </FlexRow>
  );
};

export default UsernameGroup;
