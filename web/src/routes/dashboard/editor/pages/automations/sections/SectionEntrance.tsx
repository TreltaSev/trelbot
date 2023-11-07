import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import WavingHand from "@root/lib/svg/WavingHand";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import { alternate } from ".";
import { props as togglebutton_props } from "@root/routes/dashboard/editor/ToggleButton";

const SectionEntrance: React.FC<alternate & togglebutton_props> = ({ readable, callback }) => {
  return (
    <Section icon={<WavingHand style={{ width: 24, height: 24, flex: "0 0 auto" }} />} name='On Join Event' description='Sends a customized message based on the configuration below.'>
      <ToggleButton initial={false} callback={callback} />
    </Section>
  );
};

export default SectionEntrance;
