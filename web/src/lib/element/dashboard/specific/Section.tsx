import React from "react";
import Text from "@lib/element/Text";
import component from "@lib/types/component";
import FlexColumn from "@lib/element/FlexColumn";
import styling from "@assets/styling.module.css";

export type type_Section = component & {
  context_name?: string
  context_description?: string
}

const Section: React.FC<type_Section> = ({ children, context_name, context_description }) => {
  return (
    <FlexColumn className={`${styling.align_items_flex_start}`} style={{gap: 10}}>
      <Text preset="1.5em-bold">{context_name}</Text>
      <Text preset="1.5em-normal" style={{opacity: 0.5}}>{context_description}</Text>
      {children}
    </FlexColumn>
  )
}

export default Section;