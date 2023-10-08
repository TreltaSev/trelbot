import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import FlexColumn from "@lib/component/FlexColumn";
import ToggleButton from "@root/routes/dashboard/editor/ToggleButton";
import Dropdown from "@root/routes/dashboard/editor/Dropdown";

const OnJoin: React.FC = () => {
  return (
    <FlexColumn style={{ gap: 25 }}>
      <Section name='Channel' description='The channel which the event is assigned'>
        <Dropdown identifier='Channel' items={[]} />
        <ToggleButton initial={false} />
      </Section>

      <Section name='Text' description='Sends a text message to the selected channel'>
        Text Area...
        <ToggleButton initial={false} />
      </Section>

      <Section name='Image' description='Creates an image using css-like format'>
        Text Area...
        <ToggleButton initial={false} />
      </Section>
    </FlexColumn>
  );
};

export default OnJoin;
