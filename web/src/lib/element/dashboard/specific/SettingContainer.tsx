import React from "react";
import styling from "@assets/styling.module.css";
import component from "@root/lib/types/component";
import FlexRow from "@lib/element/FlexRow";
import Text from "@lib/element/Text";
import dim_element from "@lib/method/dim@element";
import light_element from "@lib/method/light@element";

type type_SettingContainer = component & {
  name?: string;  
  icon?: string;
}

const SettingContainer: React.FC<type_SettingContainer> = ({ name, icon }) => {
  const container_ref = React.useRef(null);

  return (
    <FlexRow onMouseEnter={() => dim_element(container_ref)} onMouseLeave={() => light_element(container_ref)} ref={container_ref} style={{gap: 10, padding:10, borderRadius: 5}} className={`${styling.align_items_center} ${styling.align_self_stretch} ${styling.darksub}`}>
      <Text preset="1em-normal" style={{color: "white", fontSize: 16}}>{name}</Text>
    </FlexRow>
  );
};

export default SettingContainer;