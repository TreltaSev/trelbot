import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import TextArea from "@root/routes/dashboard/editor/TextArea";
import Text from "@lib/component/Text";
import Url from "@root/lib/component/Url";
import { alternate } from ".";
import { props as textarea_props } from "@root/routes/dashboard/editor/TextArea";

const SectionCustomImageData: React.FC<alternate & textarea_props> = ({ readable, callback, initial }) => {
  return (
    <Section
      name='Custom Image Data'
      description={
        <Text style={{ color: "rgba(255,255,255,0.5)" }}>
          The data that will be used to generate the custom image, this data is in a css-like string format who's documentation you can find{" "}
          <Url href='/docs/cssid' style={{ color: "#8c52ff", cursor: "pointer" }}>
            here
          </Url>
          , if you don't know about css, you should probably read up on it{" "}
          <Url href={"https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics"} style={{ color: "#8c52ff", cursor: "pointer" }}>
            here
          </Url>
          , its pretty simple, trust me. If the image data is invalid you will be warned with a notification, if you choose to ignore this warning, custom Image will be disabled.
        </Text>
      }>
      <TextArea initial={initial} callback={callback} />
    </Section>
  );
};

export default SectionCustomImageData;
