import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import FlexColumn from "@lib/component/FlexColumn";

const OnJoin: React.FC = () => {
  return (
    <FlexColumn style={{ gap: 25 }}>
      <Section name='Channel' description='The channel which the event is assigned'>
        Dropdown... Button...
      </Section>

      <Section name='Text' description='Sends a text message to the selected channel'>
        Text Area... Button...
      </Section>

      <Section name='Image' description='Creates an image using css-like format'>
        Text Area... Button...
      </Section>
    </FlexColumn>
  );
};

export default OnJoin;
