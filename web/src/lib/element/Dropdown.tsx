import React, { useRef } from "react";
import styling from "@assets/styling.module.css";
import component from "@lib/types/component";
import FlexRow from "@lib/element/FlexRow";
import ChannelTag from "@lib/svg/ChannelTag";
import Text from "@lib/element/Text";
import Spacer from "@lib/element/Spacer";
import Arrow from "@lib/svg/Arrow";
import defaultValue from "@lib/method/defaultValue";
import FlexColumn from "./FlexColumn";

type props_Dropdown = {
  name?: string;
};

type state_Dropdown = {};

class Dropdown extends React.Component<props_Dropdown, state_Dropdown> {
  private _menu: React.RefObject<HTMLDivElement>;
  private _name = defaultValue(this.props.name, "Select", undefined);
  private _isopen: boolean = false;

  constructor(props: props_Dropdown) {
    super(props);
    this.state = {} as state_Dropdown;
    this._menu = React.createRef();
  }

  toggle_menu() {
    if (!this._menu.current) {
      return;
    }

    if (this._isopen) {
      this._menu.current.style.display = "none";
    } else {
      this._menu.current.style.display = "flex";
    }

    this._isopen = !this._isopen;
  }

  populate_options() {}

  render() {
    return (
      <>
        <FlexRow onClick={() => this.toggle_menu()} style={{ width: 300, height: 30, flexShrink: 0, padding: "0 10px", gap: 10, borderRadius: 5 }} className={`${styling.align_items_center} ${styling.dark}`}>
          <ChannelTag style={{ minWidth: 16, minHeight: 16, width: 16, height: 16 }} />
          <Text preset='1em-normal' style={{ opacity: "0.8", whiteSpace: "nowrap" }}>
            Select a Channel
          </Text>
          <Spacer />
          <Arrow style={{ minWidth: 20, minHeight: 20, width: 20, height: 20 }} />
        </FlexRow>

        <FlexColumn ref={this._menu} style={{ width: 300, height: 300, background: "red" }}></FlexColumn>
      </>
    );
  }
}

export default React.forwardRef((props: props_Dropdown, ref: React.Ref<Dropdown>) => <Dropdown {...props} ref={ref} />);
