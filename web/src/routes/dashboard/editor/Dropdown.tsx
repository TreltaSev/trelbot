import React from "react";
import { uuidv4 } from "uuidv7";
import Arrow from "@root/lib/svg/Arrow";
import shard from "@root/lib/types/shard";
import Text from "@root/lib/component/Text";
import callback from "@root/lib/types/callback";
import FlexRow from "@root/lib/component/FlexRow";
import TextInput from "@root/lib/component/TextInput";
import FlexColumn from "@root/lib/component/FlexColumn";
import defaultValue from "@root/lib/method/defaultValue";
import dropdown_change from "@root/routes/dashboard/editor/declerations/dropdown_change";

import styling from "@assets/styling.module.css";
import Grab from "./Grab";
import ChannelTag from "@root/lib/svg/ChannelTag";

type props = callback & {
  identifier?: string;
  items?: shard[];
};

type state = {
  input_value?: string;
  helper_string?: string;
};

/**
 * A animated dropdown that can display and hold information, animated in every
 * way that countes
 * @usedin `Editor.tsx/**`
 * + display items
 * + search interface
 * + select items
 * + search filters
 * @param identifier The name of the dropdown, like channel or role, make it singular since plural checks are in place.
 * @param items The items that will be displayed, should be of the `shard[]` type.
 */
class Dropdown extends React.Component<props, state> implements Grab {
  private clickable: React.RefObject<HTMLDivElement>;
  private input_field: React.RefObject<HTMLInputElement>;
  private menu_outer: React.RefObject<HTMLDivElement>;
  private menu_inner: React.RefObject<HTMLDivElement>;
  private identifier: string;
  private opened: boolean = false;
  private chosen: any = undefined;
  private custom: React.ReactNode = (<></>);
  private items: shard[] = [];

  constructor(props: props) {
    super(props);
    this.handleGlobalClick = this.handleGlobalClick.bind(this);
    this.clickable = React.createRef();
    this.input_field = React.createRef();
    this.menu_outer = React.createRef();
    this.menu_inner = React.createRef();
    this.identifier = defaultValue(props.identifier, "", undefined);
    this.items = defaultValue(props.items, [], undefined);
    this.state = {
      input_value: "",
      helper_string: `Select a ${this.identifier}`,
    };
  }

  grab() {
    return this.chosen;
  }

  public choose(name?: string, value?: any) {
    this.chosen = value;
    this.custom = (
      <FlexRow style={{ gap: 5 }} className={`${styling.align_items_center} ${styling.justify_content_center}`}>
        <ChannelTag style={{ width: 16, height: 16 }} />
        <Text preset='1em-normal' style={{ whiteSpace: "nowrap" }}>
          {name}
        </Text>
      </FlexRow>
    );
    this.setState({ input_value: "" });
  }

  private handleGlobalClick(event: MouseEvent) {
    // If not left click return
    if (!(event.button == 0)) {
      return;
    }

    // Check if click can open menu
    if (this.opened == false) {
      if (this.clickable.current?.contains(event.target as Node)) {
        this.input_field.current?.focus();
        this.toggleMenu(true);
      }
    }

    // Basic Checks
    if (!this.menu_inner.current || !this.clickable.current || this.menu_inner.current.contains(event.target as Node) || this.clickable.current.contains(event.target as Node)) {
      return;
    }

    // Update helper_string
    if (this.chosen === undefined) {
      this.setState({ helper_string: `Select a ${this.identifier}` });
    } else {
      this.setState({ helper_string: "" });
    }

    this.input_field.current?.blur();
    this.toggleMenu(false, false);
  }

  /**
   * Returns a dropdown item shard type which can be used to show items
   * @param name Name to search for
   * @param displayElement React node that will be displayed as the item
   * @param position Position, 0 at the top
   */
  static form(name: string, element: React.ReactNode, position?: number): shard {
    return { name: name, element: element, position: defaultValue(position, 0, undefined) } as shard;
  }

  /**
   * Opens or closes the menu, you can choose either option.
   * @param newState The new value for opened, can be true or false, if false, this will run the close animation, if true, this will open the open animation, defaults to the opposite of this.opened
   * @param abrupt When closing, should the component even be animated? if abrupt is set to true, the components style is forcefully changed.
   */
  toggleMenu(newState: boolean = !this.opened, abrupt: boolean = false) {
    // Open Menu
    this.opened = newState;
    if (newState == true) {
      if (this.menu_outer.current) {
        this.menu_outer.current.style.display = "flex";
      }
      new dropdown_change(this.menu_inner.current, "dropdown").onopen();
      new dropdown_change(this.clickable.current, "button").onopen();
    }

    // Close Menu
    if (newState == false) {
      new dropdown_change(this.menu_inner.current, "dropdown", () => {
        if (this.menu_outer.current) {
          this.menu_outer.current.style.display = "none";
        }
      }).onclose(abrupt);
      new dropdown_change(this.clickable.current, "button").onclose(abrupt);
    }
  }

  componentDidMount(): void {
    document.addEventListener("click", this.handleGlobalClick);
    this.toggleMenu(false, true);
  }

  render(): React.ReactNode {
    return (
      <FlexColumn className={styling.align_items_flex_Start} style={{ width: 500, height: 50, borderRadius: 5, gap: 0, position: "relative" }}>
        {/**
         * Clickable box that opens the dropdown menu when clicked.
         */}
        <FlexRow
          innerref={this.clickable}
          className={`${styling.border_box} ${styling.align_items_center} ${styling.align_self_stretch} ${styling.darker} ${styling.justify_content_space_between}`}
          style={{ flex: "1 0 auto", height: 50, borderRadius: 5, padding: "0 10px", cursor: "pointer", zIndex: 4 }}>
          {/**
           * Custom display component & Input Field
           */}
          <FlexRow style={{ gap: 2 }} className={`${styling.fill_width} ${styling.align_items_stretch}`}>
            <React.Fragment>{this.custom}</React.Fragment>
            <TextInput
              placeholder={this.state.helper_string}
              value={this.state.input_value}
              onChange={(event) => this.setState({ input_value: event.currentTarget.value })}
              innerref={this.input_field}
              className={`${styling.no_border} ${styling.no_outline} ${styling.fill_width}`}
              style={{ background: "transparent", fontSize: "1em", fontWeight: "400", fontFamily: "Lato", opacity: "0.8", color: "white" }}
            />
          </FlexRow>

          <Arrow style={{ width: 20, height: 20, flex: "0 0 auto" }} />
        </FlexRow>

        {/**
         * Menu Wrapper
         */}
        <FlexColumn innerref={this.menu_outer} style={{ position: "absolute", height: 200, top: "87%", overflow: "hidden", zIndex: 2, pointerEvents: "none", width: "100%" }}>
          {/**
           * Actual Menu
           */}
          <FlexColumn
            innerref={this.menu_inner}
            className={`${styling.fill_width} ${styling.align_self_stretch} ${styling.border_box} ${styling.darker}`}
            style={{ minHeight: 30, position: "absolute", borderRadius: "0 0 10px 10px", top: 0, gap: 10, padding: "0 10px 10px 10px", maxHeight: 280, overflowY: "scroll", zIndex: 3, pointerEvents: "auto" }}>
            <FlexRow style={{ background: "rgba(255,255,255,0.1)", height: 2, borderRadius: 1 }} className={`${styling.align_self_stretch}`} />
            <Text preset='bare' style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: "700" }}>
              {this.identifier}s
            </Text>
            {this.props.items?.map((item) => (
              <React.Fragment key={uuidv4()}>{item.element}</React.Fragment>
            ))}
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>
    );
  }
}

export default Dropdown;
