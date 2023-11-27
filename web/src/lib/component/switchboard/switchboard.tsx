import React, { createRef } from "react";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";
import WavingHand from "@root/lib/svg/WavingHand";
import SwitchboardButton from "./switchboardbutton";

type buttonPack = {
  identifier: string;
  icon: React.ReactNode;
  assigned_ref: React.RefObject<SwitchboardButton>;
};

/**
 * When rendered, displays a switch board which contains buttons that can open different windows.
 * @extends Stylist
 */
class Switchboard extends Stylist<{}> {
  private is_visible: boolean = false;

  private buttons: buttonPack[] = [];

  constructor(props: {}) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  // TODO: Remove toggled param, not needed
  handleButton(identifier: any, toggled: boolean) {
    this.buttons.filter((button) => button.identifier !== identifier).forEach((button) => button.assigned_ref.current?.toggle_off());
  }

  addButton(identifier: any, icon: React.ReactNode) {
    this.buttons.push({ identifier: identifier, icon: icon, assigned_ref: React.createRef<SwitchboardButton>() });
  }

  unpackButtons(): React.ReactNode {
    return this.buttons.map((v, i, a) => <SwitchboardButton ref={v.assigned_ref} callback_to={this.handleButton} icon={v.icon} identifier={v.identifier} key={`${v.identifier};;lo`} />);
  }

  componentDidMount(): void {}

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);
    this.addButton("1", <WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("2", <WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("3", <WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("4", <WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    console.warn(this.buttons);
    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>{this.unpackButtons()}</FlexRow>
      </>
    );
  }
}

export default Switchboard;
