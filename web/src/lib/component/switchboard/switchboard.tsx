import React from "react";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";
import FlexColumn from "../FlexColumn";
import dim_element from "@root/lib/method/dim@element";
import WavingHand from "@root/lib/svg/WavingHand";

type props = {
  icon?: React.ReactNode;
};

class SwitchboardButton extends Stylist<props> {
  private icon: React.ReactNode;
  private button_ref = React.createRef<HTMLDivElement>();
  private hovered: boolean = false;

  constructor(props: props) {
    super(props);
    this.handleMouse = this.handleMouse.bind(this);
    this.icon = props.icon;
  }

  push_down() {
    this.button_ref.current?.animate({ transform: "translateY(2px)" }, this.base_options);
  }

  push_up() {
    this.button_ref.current?.animate({ transform: "translateY(0)" }, this.base_options);
  }

  handleMouse(event: MouseEvent) {
    console.log(event, event.type);

    switch (event.type) {
      case "mouseenter":
        this.hovered = true;
        break;

      case "mouseleave":
        this.hovered = false;
        this.push_up();
        break;

      case "mousedown":
        break;
    }
  }

  componentDidMount(): void {
    this.button_ref.current?.addEventListener("mouseenter", this.handleMouse);
    this.button_ref.current?.addEventListener("mouseleave", this.handleMouse);
    this.button_ref.current?.addEventListener("mousedown", this.handleMouse);
    this.button_ref.current?.addEventListener("mouseout", this.handleMouse);
  }

  render(): React.ReactNode {
    this.set_decor("button_container", { width: 40, height: 40, cursor: "pointer", borderRadius: 10, backgroundColor: "rgba(255,255,255,1)", boxShadow: "inset 0 -5px 0 rgba(0, 0, 0, 0.1)" }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.no_shrink}`);

    return (
      <FlexColumn innerref={this.button_ref} {...this.get_decor("button_container")} onMouseEnter={() => dim_element(this.button_ref, "0.5")} onMouseLeave={() => dim_element(this.button_ref, "0.25")} onMouseDown={() => this.push_down()} onMouseUp={() => this.push_up()}>
        {this.icon}
      </FlexColumn>
    );
  }
}

/**
 * Empty Class which can be rendered as a component
 */
class Switchboard extends Stylist {
  private is_visible: boolean = false;

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);

    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>
          <SwitchboardButton icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} />
        </FlexRow>
      </>
    );
  }
}

export default Switchboard;
