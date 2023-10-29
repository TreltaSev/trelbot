import React from "react";
import styling from "@assets/styling.module.css";
import component from "@root/lib/types/component";
import FlexRow from "@root/lib/component/FlexRow";
import Text from "@root/lib/component/Text";
import light_element from "@root/lib/method/light@element";
import dim_element from "@root/lib/method/dim@element";
import { cModal } from "./loader";

type props = component & {
  meta: cModal;
};

const TabContainer: React.FC<props> = ({ meta, onClick }) => {
  const container_ref = React.useRef<HTMLDivElement | null>(null);

  return (
    <FlexRow
      onClick={onClick}
      onMouseEnter={() => light_element(container_ref)}
      onMouseLeave={() => dim_element(container_ref)}
      innerref={container_ref}
      style={{ gap: 10, padding: 10, borderRadius: 5, cursor: "pointer", opacity: "0.8" }}
      className={`${styling.align_items_center} ${styling.align_self_stretch} ${styling.darksub}`}>
      <Text preset='1em-normal' style={{ color: "white", fontSize: 16 }}>
        {meta.name}
      </Text>
    </FlexRow>
  );
};

export default TabContainer;
