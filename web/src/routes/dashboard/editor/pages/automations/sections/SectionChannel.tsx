import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import Dropdown from "@root/routes/dashboard/editor/Dropdown";
import shard from "@root/lib/types/shard";
import { alternate, dropdown_type } from ".";

type props = dropdown_type &
  alternate & {
    innerref?: React.RefObject<any>;
  };

const SectionChannel: React.FC<props> = ({ items, innerref, readable, callback }) => {
  return (
    <Section name='Channel' description='The channel which the event is assigned'>
      <Dropdown identifier='Channel' items={items as shard[] | undefined} ref={innerref} callback={callback} />
    </Section>
  );
};

export default SectionChannel;
