import React from "react";
import { dotPulse } from "ldrs";
import NavigationLayout from "@root/lib/layouts/Navigation";
import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import FlexRow from "@root/lib/component/FlexRow";
import LoadingText from "@root/lib/component/LoadingText";

dotPulse.register();

const Dev: React.FC = () => {
  let gatheringRef = React.createRef<LoadingText>();
  let otherref = React.createRef<LoadingText>();

  setTimeout(() => {
    gatheringRef.current?.hide();
  }, 3000);

  return (
    <NavigationLayout>
      <FlexColumn style={{ gap: 20 }} className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`}>
        <FlexRow>
          <LoadingText duration={500.0} ref={gatheringRef} achieve_text='Gathering Permissions' type='run_on_render' hide_callback={() => otherref.current?.call()} />
          <LoadingText duration={500.0} ref={otherref} achieve_text='Loading TSX Components' type='run_on_call' />
        </FlexRow>
        <l-dot-pulse size={50} speed={1.3} color='white' />
      </FlexColumn>
    </NavigationLayout>
  );
};

export default Dev;
