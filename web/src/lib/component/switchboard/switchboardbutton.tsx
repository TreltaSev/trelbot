import React from "react";
import styling from "@assets/styling.module.css";
import Stylist from "@lib/component/stylist/stylist";
import FlexColumn from "@lib/component/FlexColumn";

type props = {
  icon?: React.ReactNode;
  identifier?: any;
  callback_to?: (identifier: any) => void;
};

class SwitchboardButton extends Stylist<props> {
  private button_reference = React.createRef<HTMLDivElement>();
  private toggled: boolean = false;
  private icon: React.ReactNode;
  private identifier?: string;
  private callback_to?: (identifier: any) => void;

  constructor(props: props) {
    super(props);
    this.icon = props.icon;
    this.identifier = props.identifier;
    this.callback_to = props.callback_to;
    this.handleMouse = this.handleMouse.bind(this);
  }

  push_down() {
    this.button_reference.current?.animate({ transform: "translateY(2px)", boxShadow: "inset 0 -3px 0 rgba(0, 0, 0, 0.1)" }, this.base_options);
  }

  push_up() {
    this.button_reference.current?.animate({ transform: "translateY(0)", boxShadow: "inset 0 -5px 0 rgba(0, 0, 0, 0.1)" }, this.base_options);
  }

  modify_backgroundOpacity(value: string | number) {
    this.button_reference.current?.animate({ backgroundColor: `rgba(255, 255, 255, ${value})` }, this.base_options);
  }

  toggle_off() {
    this.toggled = false;
    this.modify_backgroundOpacity("0.25");
  }

  /**
   * If the user passes a `callback_to` method within the props of this component, this method is applicable.
   * whenever this component is clicked, this class will call the `callback_to` method inputted, and proceed to apply
   * its own arguments through this method like the current state of the button after the click. this state will be a `boolean`.
   */
  toggle_callback() {
    if (this.callback_to) {
      this.callback_to(this.identifier);
    }
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
        if (!this.toggled) {
          this.modify_backgroundOpacity("0.50");
        }

        break;

      case "mouseleave":
        this.push_up();

        if (!this.toggled) {
          this.modify_backgroundOpacity("0.25");
        }

        break;

      case "mousedown":
        this.push_down();
        break;

      case "mouseup":
        this.push_up();

        if (this.toggled) {
          return;
        }

        this.toggled = !this.toggled;
        this.modify_backgroundOpacity("1.00");
        this.toggle_callback();
        break;
    }
  }

  /**
   * Attach event listeners to the main flex column within this component to simulate and use animations.
   */
  componentDidMount(): void {
    this.button_reference.current?.addEventListener("mouseenter", this.handleMouse);
    this.button_reference.current?.addEventListener("mouseleave", this.handleMouse);
    this.button_reference.current?.addEventListener("mousedown", this.handleMouse);
    this.button_reference.current?.addEventListener("mouseup", this.handleMouse);
  }

  render(): React.ReactNode {
    this.set_decor("button_container", { width: 40, height: 40, cursor: "pointer", borderRadius: 10, backgroundColor: "rgba(255,255,255,0.25)", boxShadow: "inset 0 -5px 0 rgba(0, 0, 0, 0.1)" }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.no_shrink}`);

    return (
      <FlexColumn innerref={this.button_reference} {...this.get_decor("button_container")}>
        {this.icon}
      </FlexColumn>
    );
  }
}

export default SwitchboardButton;
