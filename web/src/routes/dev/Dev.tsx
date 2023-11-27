import React from "react";
import { dotPulse } from "ldrs";
import NavigationLayout from "@root/lib/layouts/Navigation";
import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import FlexRow from "@root/lib/component/FlexRow";
import LoadingText from "@root/lib/component/LoadingText";
import Switchboard from "@root/lib/component/switchboard/switchboard";
import Stylist from "@root/lib/component/stylist/stylist";

dotPulse.register();

class Dev extends Stylist {
  private gathering_ref = React.createRef<LoadingText>();
  private loading_tsx_ref = React.createRef<LoadingText>();
  private dots_ref = React.createRef<LoadingText>();

  componentDidMount(): void {
    setTimeout(() => {
      this.gathering_ref.current?.hide();
    }, 3000);
  }

  render() {
    this.set_decor("content_container", { gap: 20, position: "relative" }, `${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`);
    return (
      <NavigationLayout>
        <FlexColumn {...this.get_decor("content_container")}>
          <FlexRow>
            <LoadingText duration={500.0} ref={this.gathering_ref} achieve_text='Gathering Permissions' type='run_on_render' hide_callback={() => this.loading_tsx_ref.current?.call()} />
            <LoadingText duration={500.0} ref={this.loading_tsx_ref} achieve_text='Loading TSX Components' type='run_on_call' show_callback={() => this.dots_ref.current?.call()} />
            <LoadingText duration={500.0} ref={this.dots_ref} achieve_text='...' type='loop_when_called' />
          </FlexRow>
          <Switchboard />
        </FlexColumn>
      </NavigationLayout>
    );
  }
}

export default Dev;
