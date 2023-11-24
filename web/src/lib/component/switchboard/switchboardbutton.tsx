import React from "react";
import styling from "@assets/styling.module.css";
import Stylist from "@lib/component/stylist/stylist";
import FlexColumn from "@lib/component/FlexColumn";
import dim_element from "@root/lib/method/dim@element";

type props = {
  icon?: React.ReactNode;
};

class SwitchboardButton extends Stylist<props> {
  private icon: React.ReactNode;
  private button_ref = React.createRef<HTMLDivElement>();

  constructor(props: props) {
    super(props);
    this.icon = props.icon;
    this.handleMouse = this.handleMouse.bind(this);
  }

  push_down() {
    this.button_ref.current?.animate({ transform: "translateY(2px)" }, this.base_options);
  }

  push_up() {
    this.button_ref.current?.animate({ transform: "translateY(0)" }, this.base_options);
  }

  /**
   * Handles basic mouse triggered events for the button within this component to allow for
   * better looking and better structured tsx within the interfaced render method. extends
   *
   * Included events:
   *
   * `mouseenter`, `mouseleave`, `mousedown`, `mouseup`
   * @param event Mouse Event
   */
  handleMouse(event: MouseEvent) {
    switch (event.type) {
      case "mouseenter":
        dim_element(this.button_ref, "0.5");
        break;

      case "mouseleave":
        dim_element(this.button_ref, "0.25");
        this.push_up();
        break;

      case "mousedown":
        this.push_down();
        break;

      case "mouseup":
        this.push_up();
        break;
    }
  }

  componentDidMount(): void {
    this.button_ref.current?.addEventListener("mouseenter", this.handleMouse);
    this.button_ref.current?.addEventListener("mouseleave", this.handleMouse);
    this.button_ref.current?.addEventListener("mousedown", this.handleMouse);
    this.button_ref.current?.addEventListener("mouseup", this.handleMouse);
  }

  render(): React.ReactNode {
    this.set_decor("button_container", { width: 40, height: 40, cursor: "pointer", borderRadius: 10, backgroundColor: "rgba(255,255,255,1)", boxShadow: "inset 0 -5px 0 rgba(0, 0, 0, 0.1)" }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.no_shrink}`);

    return (
      <FlexColumn innerref={this.button_ref} {...this.get_decor("button_container")}>
        {this.icon}
      </FlexColumn>
    );
  }
}

export default SwitchboardButton;
