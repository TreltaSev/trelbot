import React, { createRef } from "react";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";
import WavingHand from "@root/lib/svg/WavingHand";
import SwitchboardButton from "./switchboardbutton";
import QuestionMark from "@root/lib/svg/QuestionMark";
import FlexColumn from "../FlexColumn";

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
  private switchboard_reference = React.createRef<HTMLDivElement>();
  private window_reference = React.createRef<HTMLDivElement>();

  constructor(props: {}) {
    super(props);
    this.handleButton = this.handleButton.bind(this);
    this.mutate_window = this.mutate_window.bind(this);
  }

  handleButton(identifier: any) {
    this.buttons.filter((button) => button.identifier !== identifier).forEach((button) => button.assigned_ref.current?.toggle_off());
  }

  addButton(identifier: any, icon: React.ReactNode) {
    this.buttons.push({ identifier: identifier, icon: icon, assigned_ref: React.createRef<SwitchboardButton>() });
  }

  unpackButtons(): React.ReactNode {
    return this.buttons.map((v) => <SwitchboardButton ref={v.assigned_ref} callback_to={this.handleButton} icon={v.icon} identifier={v.identifier} key={`${v.identifier};;lo`} />);
  }

  show() {
    // Switchboard
    this.switchboard_reference.current!.style.display = "flex";
    this.switchboard_reference.current!.animate({ transform: "translateY(0)", opacity: "1" }, this.base_options);

    // Window
    this.window_reference.current!.style.display = "flex";
    this.window_reference.current!.animate({ transform: "translateY(0)", opacity: "1", height: `${this.get_new_height()}px` }, this.base_options);
  }

  hide(instant: boolean = false) {
    if (instant) {
      // Switchboard
      this.switchboard_reference.current!.style.display = "none";
      this.switchboard_reference.current!.style.opacity = "0";
      this.switchboard_reference.current!.style.transform = "translateY(50px)";

      // Window
      this.window_reference.current!.style.display = "none";
      this.window_reference.current!.style.opacity = "0";
      this.window_reference.current!.style.height = "250px";
      this.window_reference.current!.style.transform = "translateY(50px)";
      return;
    }

    // Switchboard
    this.switchboard_reference.current!.animate({ transform: "translateY(50px)", opacity: "0" }, this.base_options);

    // Window
    this.window_reference.current!.animate({ opacity: "0", height: "250px" }, this.base_options);

    setTimeout(() => {
      this.switchboard_reference.current!.style.display = "none";
      this.window_reference.current!.style.display = "none";
    }, 300);
  }

  get_new_height(): number {
    let new_height = window.innerHeight - 50 * 4 - 80;
    if (new_height < 250) {
      new_height = 250;
    }
    return new_height;
  }

  mutate_window() {
    this.window_reference.current!.animate({ height: `${this.get_new_height()}px` }, this.base_options);
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.mutate_window);
  }

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);
    this.set_decor("oth_parent", { width: 800, height: 50, position: "absolute", bottom: 50 });
    this.addButton("1", <WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("2", <QuestionMark color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("3", <QuestionMark color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    this.addButton("4", <QuestionMark color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />);
    return (
      <FlexColumn {...this.get_decor("oth_parent")}>
        {/* Bar Parent */}

        <FlexColumn innerref={this.window_reference} style={{ width: 800, height: this.get_new_height(), position: "absolute", bottom: 100, borderRadius: 10 }} className={`${styling.darksub}`}></FlexColumn>
        <FlexRow innerref={this.switchboard_reference} {...this.get_decor("swb_parent")}>
          {this.unpackButtons()}
        </FlexRow>
      </FlexColumn>
    );
  }
}

export default Switchboard;
