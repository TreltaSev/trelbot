import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import { alternate } from ".";
import { props as togglebutton_props } from "@root/routes/dashboard/editor/ToggleButton";

const SectionEnableText: React.FC<alternate & togglebutton_props> = ({ readable, callback, initial }) => {
  return (
    <Section name='Enable Text' description='By enabling text, a text message will be sent with everything else. its similar to a user just typing a message.'>
      <ToggleButton initial={initial} callback={callback} />
    </Section>
  );
};

export default SectionEnableText;
