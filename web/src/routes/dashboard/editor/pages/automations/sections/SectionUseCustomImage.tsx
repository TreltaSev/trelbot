import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import { alternate } from ".";
import { props as togglebutton_props } from "@root/routes/dashboard/editor/ToggleButton";

const SectionUseCustomImage: React.FC<alternate & togglebutton_props> = ({ readable, callback }) => {
  return (
    <Section name='Use Custom Image' description='By enabling this, a image will be created using the configuration below and sent to the selected channel.'>
      <ToggleButton initial={false} callback={callback} />
    </Section>
  );
};

export default SectionUseCustomImage;
