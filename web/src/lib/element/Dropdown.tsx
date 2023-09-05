import React from "react";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
import FlexRow from "@lib/element/FlexRow";
import Arrow from "@lib/svg/Arrow";
import defaultValue from "@lib/method/defaultValue";
import FlexColumn from "./FlexColumn";
import dropdown_change from "./dashboard/declerations/dropdown_change";
import TextInput from "./TextInput";

type props_Dropdown = {
  name?: string;
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
  private _isopen: boolean = false;

  constructor(props: props_Dropdown) {
    super(props);
    this.state = {
      button_content: `Select a ${this._name}`,
      search_value: "",
    } as state_Dropdown;
    this._menu = React.createRef();
    this._button = React.createRef();
    this._input = React.createRef();
  }

  toggle_menu() {
    if (!this._menu.current || !this._button.current) {
      return;
    }

    if (this._isopen) {
      this.update_button_content(`Select a ${this._name}`);

      new dropdown_change(this._menu.current, "dropdown").onclose();
      new dropdown_change(this._button.current, "button").onclose();
    } else {
      this._input.current?.focus();
      this.update_button_content(`Search for a ${this._name}`);

      new dropdown_change(this._menu.current, "dropdown").onopen();
      new dropdown_change(this._button.current, "button").onopen();
    }
    this._isopen = !this._isopen;
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

  populate_options() {}

  test(event: React.FormEvent<HTMLInputElement>) {
    console.log(event);
  }

  private HandleText(event: React.FormEvent<HTMLInputElement>) {
    this.update_search_value(event.currentTarget.value);
  }

  private HandleFocus(event: React.FocusEvent<HTMLInputElement> | undefined) {
    switch (event?.type) {
      case "blur":
        // Focus off
        break;

      case "focus":
        // Focus on
        break;
    }
  }

  componentDidMount(): void {
    new dropdown_change(this._menu.current, "dropdown").onclose();
    new dropdown_change(this._button.current, "button").onclose();
  }

  render() {
    return (
      <FlexColumn style={{ width: 300, borderRadius: 5, gap: 0 }} className={`${styling.align_items_flex_start}`}>
        {/* Select Button */}
        <FlexRow innerref={this._button} onClick={() => this.toggle_menu()} style={{ flexShrink: 0, padding: "10px", borderRadius: 5 }} className={`${styling.border_box} ${styling.align_items_center} ${styling.align_self_stretch} ${styling.dark} ${styling.justify_content_space_between}`}>
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
        <FlexColumn innerref={this._menu} className={`${styling.align_self_stretch}`} style={{ height: 300, background: "red" }}></FlexColumn>
      </FlexColumn>
    );
  }
}

export default React.forwardRef((props: props_Dropdown, ref: React.Ref<Dropdown>) => <Dropdown {...props} ref={ref} />);
