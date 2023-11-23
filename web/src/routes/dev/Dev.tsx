import React from "react";
import { dotPulse } from "ldrs";
import NavigationLayout from "@root/lib/layouts/Navigation";
import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import FlexRow from "@root/lib/component/FlexRow";
import LoadingText from "@root/lib/component/LoadingText";
import SwitchBoard from "@root/lib/component/switchboard/switchboard";

dotPulse.register();

const Dev: React.FC = () => {
  let gathering_ref = React.createRef<LoadingText>();
  let loading_tsx_ref = React.createRef<LoadingText>();
  let dots_ref = React.createRef<LoadingText>();

  setTimeout(() => {
    gathering_ref.current?.hide();
  }, 3000);

  return (
    <NavigationLayout>
      <FlexColumn style={{ gap: 20 }} className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`}>
        <FlexRow>
          <LoadingText duration={500.0} ref={gathering_ref} achieve_text='Gathering Permissions' type='run_on_render' hide_callback={() => loading_tsx_ref.current?.call()} />
          <LoadingText duration={500.0} ref={loading_tsx_ref} achieve_text='Loading TSX Components' type='run_on_call' show_callback={() => dots_ref.current?.call()} />
          <LoadingText duration={500.0} ref={dots_ref} achieve_text='...' type='loop_when_called' />
          <SwitchBoard />
        </FlexRow>
      </FlexColumn>
    </NavigationLayout>
  );
};

export default Dev;
