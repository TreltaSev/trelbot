import React from "react";
import { uuidv4 } from "uuidv7";
import Arrow from "@lib/svg/Arrow";
import Text from "@lib/element/Text";
import FlexRow from "@lib/element/FlexRow";
import ChannelTag from "@lib/svg/ChannelTag";
import custom from "@assets/custom.module.css";
import TextInput from "@lib/element/TextInput";
import FlexColumn from "@lib/element/FlexColumn";
import styling from "@assets/styling.module.css";
import defaultValue from "@lib/method/defaultValue";
import dropdown_item_shard from "@lib/types/dropdown_item_shard";
import dropdown_change from "@lib/element/dashboard/declerations/dropdown_change";

export type props_Dropdown = {
  name?: string;
  _items?: dropdown_item_shard[] | undefined;
  _plural_concat?: boolean;
};

type state_Dropdown = {
  button_content?: string;
  search_value?: string;
  _isopen?: boolean;
  _custom_display?: React.ReactNode;
  chosen?: any;
};

/**
 * An animated dropdown menu with customizable options
 * @param name Optional, whats displated in `Select/Search a {name}`
 * @param _items Optional, The items in a list, form it with Dropdown.form
 * @param _plural_concat Optional, If true, adds an s to the end of this.name whenever its gramatically correct to use plurals.
 */
class Dropdown extends React.Component<props_Dropdown, state_Dropdown> {
  private _menu: React.RefObject<HTMLDivElement>;
  private _menu_parent: React.RefObject<HTMLDivElement>;
  private _button: React.RefObject<HTMLDivElement>;
  private _input: React.RefObject<HTMLInputElement>;
  private _name = defaultValue(this.props.name, "Channel", undefined);
  private _plural_concat: boolean = defaultValue(this.props._plural_concat, false, undefined);

  constructor(props: props_Dropdown) {
    super(props);
    this.state = {
      button_content: `Select a ${this._name}`,
      search_value: "",
      _isopen: false,
    } as state_Dropdown;
    this._menu = React.createRef();
    this._menu_parent = React.createRef();
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

  private Close(abrupt?: boolean) {
    this.setState({ _isopen: false });
    new dropdown_change(this._menu.current, "dropdown", () => {
      if (this._menu_parent.current) {
        this._menu_parent.current.style.display = "none";
      }
    }).onclose(abrupt);
    new dropdown_change(this._button.current, "button").onclose(abrupt);
  }

  private Open() {
    this.setState({ _isopen: true });
    if (this._menu_parent.current) {
      this._menu_parent.current.style.display = "flex";
    }
    new dropdown_change(this._menu.current, "dropdown").onopen();
    new dropdown_change(this._button.current, "button").onopen();
  }

  /**
   * Returns a dropdown item shard type which cna be used in populate()
   * @param name Name to search for
   * @param displayElement React node that will be displayed as the item
   * @param position Position, 0 at the top
   */
  static form(name: string, displayElement: React.ReactNode, position: number | undefined): dropdown_item_shard {
    const _position = defaultValue(position, 0, undefined);
    return { name: name, displayElement: displayElement, position: _position } as dropdown_item_shard;
  }

  public choose(display?: string, value?: any) {
    this.setState({ search_value: "", chosen: value });
    this.change_custom(
      <FlexRow style={{ gap: 5 }} className={`${styling.align_items_center} ${styling.justify_content_center}`}>
        <ChannelTag style={{ width: 16, height: 16 }} />
        <Text preset='1em-normal' style={{ whiteSpace: "nowrap" }}>
          {display}
        </Text>
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
    this.Close(true);
  }

  render() {
    let dropdown_status: "failed_search" | "allgud" = "failed_search";
    this.props._items?.sort((a, b) => {
      if (a.position === null || b.position === null) {
        console.error("Failed in cross check, ", a, b, a.position, b.position);
        return 0;
      }

      const position_segmentA: number = a.position as number;
      const position_segmentB: number = b.position as number;
      if (position_segmentA > position_segmentB) {
        return 1;
      } else if (position_segmentA < position_segmentB) {
        return -1;
      }
      return 0;
    });

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
        analyzed_items?.push(
          <Text preset='normal' style={{ opacity: "0.5", fontSize: "0.75em" }} key={uuidv4()}>
            No items match query
          </Text>
        );
        break;
      default:
        break;
    }

    return (
      <FlexColumn style={{ width: 500, height: 50, borderRadius: 5, gap: 0, position: "relative" }} className={`${styling.align_items_flex_start}`}>
        {/* Select Button */}
        <Text preset='bare' style={{ fontWeight: "700", fontSize: "1em", color: "white", opacity: 0.8 }}></Text>
        <FlexRow
          innerref={this._button}
          style={{ flex: "1 0 auto", height: 50, borderRadius: 5, padding: "0px 10px 0px 10px", cursor: "pointer", zIndex: 4 }}
          className={`${styling.border_box} ${styling.align_items_center} ${styling.align_self_stretch} ${styling.darker} ${styling.justify_content_space_between}`}>
          <FlexRow style={{ gap: 2, width: "100%" }} className={`${styling.align_items_stretch}`}>
            <React.Fragment>{this.state._custom_display}</React.Fragment>
            <TextInput
              innerref={this._input}
              className={`${custom.input_no_border} ${custom.input_no_focus}`}
              style={{ background: "transparent", fontSize: "1em", fontWeight: "400", fontFamily: "Lato", opacity: "0.8", color: "white", width: "100%" }}
              placeholder={this.state.button_content}
              value={this.state.search_value}
              onChange={(event) => this.HandleText(event)}
            />
          </FlexRow>
          <Arrow style={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }} />
        </FlexRow>

        {/* Menu */}
        <FlexColumn innerref={this._menu_parent} style={{ position: "absolute", width: "100%", height: 280, top: "87%", overflow: "hidden", zIndex: 2 }}>
          <FlexColumn
            innerref={this._menu}
            className={`${styling.align_self_stretch} ${styling.border_box} ${styling.darker}`}
            style={{ width: "100%", minHeight: 30, position: "absolute", borderRadius: "0px 0px 10px 10px", top: 0, gap: 10, padding: "0 10px 10px 10px", maxHeight: 280, overflowY: "scroll", zIndex: 3 }}>
            <FlexRow style={{ background: "rgba(255,255,255,0.1)", height: 2, borderRadius: 1 }} className={`${styling.align_self_stretch}`} />
            <Text preset='bare' style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: "700" }}>
              {this._name}
              {this._plural_concat ? "s" : ""}
            </Text>
            {<React.Fragment>{analyzed_items}</React.Fragment>}
          </FlexColumn>
        </FlexColumn>
      </FlexColumn>
    );
  }
}

export default Dropdown;
