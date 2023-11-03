import React from "react";
import FlexRow from "@root/lib/component/FlexRow";
import FlexColumn from "@root/lib/component/FlexColumn";
import Text from "@lib/component/Text";
import Url from "@root/lib/component/Url";
import styling from "@assets/styling.module.css";
import { alternate } from ".";

const SectionConceptSave: React.FC<alternate> = ({ readable }) => {
  return (
    <FlexColumn style={{ gap: 25 }}>
      <FlexRow style={{ borderRadius: 5, cursor: "pointer", height: 50 }} className={`${styling.align_self_stretch} ${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`}>
        <Text preset='normal' style={{ fontSize: 24 }}>
          Save
        </Text>
      </FlexRow>
      <Text preset='normal' style={{ fontSize: 16 }}>
        This concept design was influenced by{" "}
        <Url href='https://www.welcomer.gg/' style={{ color: "#8c52ff", cursor: "pointer" }}>
          welcomer.gg
        </Url>
        's dashboard and will be changed to something more original and unique after I stop procrastinating.
      </Text>
    </FlexColumn>
  );
};

export default SectionConceptSave;
