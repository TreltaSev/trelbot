import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import TextArea from "@root/routes/dashboard/editor/TextArea";
import Text from "@lib/component/Text";
import Url from "@root/lib/component/Url";
import { alternate } from ".";

const SectionTextContent: React.FC<alternate> = ({ readable }) => {
  return (
    <Section
      name='Text Content'
      description={
        <Text style={{ color: "rgba(255,255,255,0.5)" }}>
          The message that will be sent, will only show if Enable Text is toggled ON. This message also supports formatting which can be accessed with{" "}
          <Url href={"https://en.wikipedia.org/wiki/Bracket"} style={{ color: "#8c52ff", cursor: "pointer" }}>
            brackets
          </Url>
          /
          <Url href={"https://peps.python.org/pep-0498/"} style={{ color: "#8c52ff", cursor: "pointer" }}>
            fstrings
          </Url>
        </Text>
      }>
      <TextArea />
    </Section>
  );
};

export default SectionTextContent;
