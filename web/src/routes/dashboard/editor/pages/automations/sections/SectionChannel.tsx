import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import Dropdown from "@root/routes/dashboard/editor/Dropdown";
import shard from "@root/lib/types/shard";
import { dropdown_type } from ".";

type props = dropdown_type & {
  innerref?: React.RefObject<any>;
};

const SectionChannel: React.FC<props> = ({ items, innerref }) => {
  return (
    <Section name='Channel' description='The channel which the event is assigned'>
      <Dropdown identifier='Channel' items={items as shard[] | undefined} ref={innerref} />
    </Section>
  );
};

export default SectionChannel;
