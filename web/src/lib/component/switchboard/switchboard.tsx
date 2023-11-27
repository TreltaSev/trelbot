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

  private ref_1 = React.createRef<SwitchboardButton>();
  private ref_2 = React.createRef<SwitchboardButton>();
  private ref_3 = React.createRef<SwitchboardButton>();

  constructor(props: {}) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
  }

  // TODO: Remove toggled param, not needed
  // TODO: Automate the shitty switch case statements
  handleButton(identifier: any, toggled: boolean) {
    console.log(`Identifier: ${identifier}; toggled: ${toggled}`);

    // Loop Through this.buttons
    //      -> Toggle Off all other buttons

    this.buttons.forEach((button) => {
      if (button.identifier != identifier) {
        button.assigned_ref.current?.toggle_off();
      }
    });

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

  addButton(identifier: any, icon: React.ReactNode) {
    this.buttons.push({ identifier: identifier, icon: icon, assigned_ref: React.createRef<SwitchboardButton>() });
  }

  unpackButtons(): React.ReactNode {
    return this.buttons.map((v, i, a) => <SwitchboardButton ref={v.assigned_ref} callback_to={this.handleButton} icon={v.icon} identifier={v.identifier} key={`${v.identifier};;lo`} />);
  }

  componentDidMount(): void {}

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);
    this.addButton("pog", <WavingHand color='#ff0000' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    console.warn(this.buttons);
    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>
          {this.unpackButtons()}
          <SwitchboardButton ref={this.ref_1} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='1' />
          <SwitchboardButton ref={this.ref_2} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='2' />
          <SwitchboardButton ref={this.ref_3} callback_to={this.handleButton} icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} identifier='3' />
        </FlexRow>
      </>
    );
  }
}

export default Switchboard;
