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

export type props_Dropdown = {
  name?: string;
  _items?: dropdown_item_shard[] | undefined;
};

type state_Dropdown = {
  button_content?: string;
  search_value?: string;
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
      search_value: ""
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

  private HandleFocus(event: React.FocusEvent<HTMLInputElement> | undefined) {
    switch (event?.type) {
      case "blur":
        // Focus off
        this.update_button_content(`Select a ${this._name}`);
        this.Close();
        break;

      case "focus":
        // Focus on
        this.update_button_content(`Search for a ${this._name}`);
        this.Open();
        break;
    }
  }

  private Close() {
    new dropdown_change(this._menu.current, "dropdown").onclose();
    new dropdown_change(this._button.current, "button").onclose();
  }

  private Open() {
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

  componentDidMount(): void {
    this.Close();
  }

  render() {
    let dropdown_status: "failed_search" | "allgud" = "failed_search";
    const analyzed_items = this.props._items?.map((value) => {
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
        analyzed_items?.push(<Text preset="1em-normal" style={{opacity: "0.5"}} key={uuidv4()}>Failed Search</Text>)
        break;
      default:
        break;
    }

    return (
      <FlexColumn style={{ width: 300, height: 40, borderRadius: 5, gap: 0, position: "relative" }} className={`${styling.align_items_flex_start}`}>
        {/* Select Button */}
        <FlexRow innerref={this._button} style={{ flex: "0 0 auto", height: 40, padding: 10, borderRadius: 5 }} className={`${styling.border_box} ${styling.align_items_center} ${styling.align_self_stretch} ${styling.darker} ${styling.justify_content_space_between}`}>
          <FlexColumn className={`${styling.align_items_stretch}`}>
            <TextInput
              innerref={this._input}
              className={`${custom.input_no_border} ${custom.input_no_focus}`}
              style={{ background: "transparent", fontSize: "1em", fontWeight: "400", fontFamily: "Lato", opacity: "0.8", color: "white" }}
              placeholder={this.state.button_content}
              value={this.state.search_value}
              onChange={(event) => this.HandleText(event)}
              onFocus={(event) => this.HandleFocus(event)}
              onFocusOut={(event) => this.HandleFocus(event)}></TextInput>
          </FlexColumn>
          <Arrow style={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }} />
        </FlexRow>

        {/* Menu */}
        <FlexColumn innerref={this._menu} className={`${styling.align_self_stretch} ${styling.border_box} ${styling.darker}`} style={{ width: 300, minHeight: 30, position: "absolute", borderRadius: "0px 0px 10px 10px", top: "100%", gap: 10, padding: 5 }}>
          <FlexRow style={{ background: "rgba(255,255,255,0.1)", height: 2, borderRadius: 1 }} className={`${styling.align_self_stretch}`} />
          {<React.Fragment>{analyzed_items}</React.Fragment>}
        </FlexColumn>
      </FlexColumn>
    );
  }
}

export default Dropdown;
