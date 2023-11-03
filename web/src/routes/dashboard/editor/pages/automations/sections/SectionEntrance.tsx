import React from "react";
import Section from "@root/routes/dashboard/editor/Section";
import WavingHand from "@root/lib/svg/WavingHand";

const SectionEntrance: React.FC = () => {
  return <Section icon={<WavingHand style={{ width: 24, height: 24, flex: "0 0 auto" }} />} name='On Join Event' description='Sends a customized message based on the configuration below.' />;
};

export default SectionEntrance;
