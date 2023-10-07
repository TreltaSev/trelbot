import React from "react";
import loader from "@root/routes/dashboard/editor/loader";
import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import OnJoin from "./OnJoin";

const Automations: React.FC = () => {
  return (
    <FlexColumn style={{ width: 800, padding: 30, gap: 25, borderRadius: 5 }} className={`${styling.align_items_flex_start} ${styling.darksub} ${styling.border_box}`}>
      <OnJoin />
    </FlexColumn>
  );
};

new loader().register("Automations", <Automations />, 1);
