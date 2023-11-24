import React, { createRef } from "react";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";
import WavingHand from "@root/lib/svg/WavingHand";
import SwitchboardButton from "./switchboardbutton";

/**
 * When rendered, displays a switch board which contains buttons that can open different windows.
 * @extends Stylist
 */
class Switchboard extends Stylist<{}> {
  private is_visible: boolean = false;

  private ref_1 = React.createRef<SwitchboardButton>();
  private ref_2 = React.createRef<SwitchboardButton>();
  private ref_3 = React.createRef<SwitchboardButton>();

  constructor(props: {}) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  handleButton(identifier: any, toggled: boolean) {
    switch (identifier) {
      case "1":
        this.ref_2?.current?.toggle_off();
        this.ref_3?.current?.toggle_off();
        break;

      case "2":
        this.ref_1?.current?.toggle_off();
        this.ref_3?.current?.toggle_off();
        break;

      case "3":
        this.ref_1?.current?.toggle_off();
        this.ref_2?.current?.toggle_off();
        break;
    }
  }

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);
    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>
          <SwitchboardButton ref={this.ref_1} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='1' />
          <SwitchboardButton ref={this.ref_2} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='2' />
          <SwitchboardButton ref={this.ref_3} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='3' />
        </FlexRow>
      </>
    );
  }
}

export default Switchboard;
