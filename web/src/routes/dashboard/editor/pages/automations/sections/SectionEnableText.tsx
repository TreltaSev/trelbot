import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import { alternate } from ".";

const SectionEnableText: React.FC<alternate> = ({ readable }) => {
  return (
    <Section name='Enable Text' description='By enabling text, a text message will be sent with everything else. its similar to a user just typing a message.'>
      <ToggleButton initial={false} />
    </Section>
  );
};

export default SectionEnableText;
