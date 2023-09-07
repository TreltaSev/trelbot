import React from "react";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexRow from "@lib/element/FlexRow";
import Arrow from "@lib/svg/Arrow";
import defaultValue from "@lib/method/defaultValue";
import FlexColumn from "@lib/element/FlexColumn";
import dropdown_change from "./dashboard/declerations/dropdown_change";
import TextInput from "@lib/element/TextInput";
import dropdown_item_shard from "@lib/types/dropdown_item_shard";
import { uuidv4 } from "uuidv7";
import Text from "@lib/element/Text";
import ChannelTag from "../svg/ChannelTag";

export type props_Dropdown = {
  name?: string;
  _items?: dropdown_item_shard[] | undefined;
};

type state_Dropdown = {
  button_content?: string;
  search_value?: string;
  _isopen?: boolean;
  _custom_display?: React.ReactNode;
  chosen?: any;
};

class Dropdown extends React.Component<props_Dropdown, state_Dropdown> {
  private _menu: React.RefObject<HTMLDivElement>;
  private _button: React.RefObject<HTMLDivElement>;
  private _input: React.RefObject<HTMLInputElement>;
  private _name = defaultValue(this.props.name, "Channel", undefined);
  public _v = "";

  constructor(props: props_Dropdown) {
    super(props);
    this.state = {
      button_content: `Select a ${this._name}`,
      search_value: "",
      _isopen: false,
    } as state_Dropdown;
    this._menu = React.createRef();
    this._button = React.createRef();
    this._input = React.createRef();
  }

  private update_button_content(new_content?: string) {
    const new_created: string = defaultValue(new_content, "Empty", undefined);
    this.setState({ button_content: new_created });
  }

  private update_search_value(input?: string) {
    // Update search value in state
    this.setState({ search_value: input });

    // Refresh filter items
  }

  private HandleText(event: React.FormEvent<HTMLInputElement>) {
    this.update_search_value(event.currentTarget.value);
  }

  private HandleFocus(event: React.FocusEvent<HTMLInputElement> | undefined) {}

  private Close() {
    this.setState({ _isopen: false });
    new dropdown_change(this._menu.current, "dropdown").onclose();
    new dropdown_change(this._button.current, "button").onclose();
  }

  private Open() {
    this.setState({ _isopen: true });
    new dropdown_change(this._menu.current, "dropdown").onopen();
    new dropdown_change(this._button.current, "button").onopen();
  }

  /**
   * Returns a dropdown item shard type which cna be used in populate()
   * @param name Name to search for
   * @param displayElement React node that will be displayed as the item
   * @param position Position, 0 at the top
   */
  static form(name: string, displayElement: React.ReactNode, position: number): dropdown_item_shard {
    return { name: name, displayElement: displayElement, position: position } as dropdown_item_shard;
  }

  public choose(display?: string, value?: any) {
    console.log(`Choosing ${display} whos value is ${value}`);
    this.setState({ search_value: "", chosen: value });
    this.change_custom(
      <FlexRow style={{ gap: 5 }} className={`${styling.align_items_center} ${styling.justify_content_center}`}>
        <ChannelTag style={{ width: 16, height: 16 }} />
        <Text preset='1em-normal'>{display}</Text>
      </FlexRow>
    );
  }

  public change_custom(new_value: React.ReactNode) {
    this.setState({ _custom_display: new_value });
  }

  private handleGlobalClick = (event: MouseEvent) => {
    if (!(event.button == 0)) {
      return;
    }

    if (!this.state._isopen) {
      if (this._button.current?.contains(event.target as Node)) {
        this.update_button_content(`Search for a ${this._name}`);
        this._input.current?.focus();
        this.Open();
      }
      return;
    }

    if (!this._menu.current || !this._button.current) {
      return;
    }

    if (this._menu.current.contains(event.target as Node) || this._button.current.contains(event.target as Node)) {
      return;
    }
    // close
    if (this.state.chosen === undefined) {
      this.update_button_content(`Select a ${this._name}`);
    } else {
      this.update_button_content(``);
    }
    this._input.current?.blur();
    this.Close();
    return;
  };

  componentDidMount(): void {
    document.addEventListener("click", this.handleGlobalClick);
    this.Close();
  }

  render() {
    let dropdown_status: "failed_search" | "allgud" = "failed_search";
    const analyzed_items = this.props._items
      ?.sort((a, b) => {
        if (!a.position || !b.position) {
          return 0;
        }
        if (a.position > b.position) {
          return -1;
        } else if (a.position < b.position) {
          return 1;
        }
        return 0;
      })
      .map((value) => {
        if (!this.state.search_value) {
          dropdown_status = "allgud";
          return <React.Fragment key={uuidv4()}>{value.displayElement}</React.Fragment>;
        }
        if (value.name?.toLowerCase().includes(this.state.search_value.toLowerCase())) {
          dropdown_status = "allgud";
          return <React.Fragment key={uuidv4()}>{value.displayElement}</React.Fragment>;
        }
        return <React.Fragment key={uuidv4()} />;
      });

    switch (dropdown_status) {
      case "failed_search":
        analyzed_items?.splice(0);
        analyzed_items?.push(
          <Text preset='1em-normal' style={{ opacity: "0.5" }} key={uuidv4()}>
            Failed Search
          </Text>
        );
        break;
      default:
        break;
    }

    return (
      <FlexColumn style={{ width: 500, height: 50, borderRadius: 5, gap: 0, position: "relative" }} className={`${styling.align_items_flex_start}`}>
        {/* Select Button */}
        <FlexRow
          innerref={this._button}
          style={{ flex: "1 0 auto", height: 50, borderRadius: 5, padding: "0px 10px 0px 10px", cursor: "pointer" }}
          className={`${styling.border_box} ${styling.align_items_center} ${styling.align_self_stretch} ${styling.darker} ${styling.justify_content_space_between}`}>
          <FlexRow style={{ gap: 2 }} className={`${styling.align_items_stretch}`}>
            <React.Fragment>{this.state._custom_display}</React.Fragment>
            <TextInput
              innerref={this._input}
              className={`${custom.input_no_border} ${custom.input_no_focus}`}
              style={{ background: "transparent", fontSize: "1em", fontWeight: "400", fontFamily: "Lato", opacity: "0.8", color: "white" }}
              placeholder={this.state.button_content}
              value={this.state.search_value}
              onChange={(event) => this.HandleText(event)}
            />
          </FlexRow>
          <Arrow style={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }} />
        </FlexRow>

        {/* Menu */}
        <FlexColumn
          innerref={this._menu}
          className={`${styling.align_self_stretch} ${styling.border_box} ${styling.darker}`}
          style={{ width: "100%", minHeight: 30, position: "absolute", borderRadius: "0px 0px 10px 10px", top: "100%", gap: 10, padding: "0 10px 10px 10px", maxHeight: 280, overflowY: "scroll" }}>
          <FlexRow style={{ background: "rgba(255,255,255,0.1)", height: 2, borderRadius: 1 }} className={`${styling.align_self_stretch}`} />
          {<React.Fragment>{analyzed_items}</React.Fragment>}
        </FlexColumn>
      </FlexColumn>
    );
  }
}

export default Dropdown;
