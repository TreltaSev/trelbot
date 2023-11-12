import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import TextArea from "@root/routes/dashboard/editor/TextArea";
import Text from "@lib/component/Text";
import Url from "@root/lib/component/Url";
import { alternate } from ".";
import { props as textarea_props } from "@root/routes/dashboard/editor/TextArea";

const SectionTextContent: React.FC<alternate & textarea_props> = ({ readable, callback, initial }) => {
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
      <TextArea initial={initial} callback={callback} />
    </Section>
  );
};

export default SectionTextContent;
