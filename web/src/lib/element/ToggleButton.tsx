import React from "react";
import defaultValue from "../method/defaultValue";
import boolValue from "../method/boolValue";

type props_ToggleButton = {
  ontoggle?: (...args: any[]) => any;
  initialValue?: boolean;
};

type state_ToggleButton = {
  initial?: boolean;
  active?: boolean;
};

class ToggleButton extends React.Component<props_ToggleButton, state_ToggleButton> {
  private toggleRef: React.RefObject<HTMLDivElement>;
  private innerRef: React.RefObject<HTMLDivElement>;

  constructor(props: props_ToggleButton) {
    super(props);
    this.toggleRef = React.createRef();
    this.innerRef = React.createRef();
    this.state = {
      initial: props.initialValue,
    };
  }

  /**
   * Animates the button
   */
  toggle() {
    console.log("toggle");

    if (this.props.ontoggle) {
      this.props.ontoggle();
    }

    if (!this.innerRef.current || !this.toggleRef.current) {
      return;
    }

    let _nv: boolean | undefined = defaultValue(!this.state.active, this.state.initial, undefined);
    this.innerRef.current.animate({ transform: `translateX(${boolValue(_nv, 30, 4)}px)` }, { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" });
    this.toggleRef.current.animate({ background: boolValue(_nv, "#8C52FF", "rgba(255,255,255,0.2)") }, { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" });
    this.setState({ active: _nv });
  }

  componentDidMount(): void {
    const _v: boolean = defaultValue(this.props.initialValue, false, undefined);

    if (this.innerRef.current && this.toggleRef.current) {
      this.innerRef.current.style.transform = `translateX(${boolValue(_v, 30, 4)}px)`;
      this.toggleRef.current.style.background = boolValue(_v, "#8C52FF", "rgba(255,255,255,0.2)");
    }
  }

  render() {
    return (
      <div onClick={() => this.toggle()} ref={this.toggleRef} style={{ background: "#E45853", width: 50, height: 20, position: "relative", borderRadius: 5, cursor: "pointer" }}>
        <div ref={this.innerRef} style={{ width: 16, height: 16, background: "rgba(255,255,255,0.5)", borderRadius: 5, position: "absolute", top: 2, border: "4ps solid rgba(255,255,255,0.5)" }} />
      </div>
    );
  }
}

export default React.forwardRef((props: props_ToggleButton, ref: React.Ref<ToggleButton>) => <ToggleButton {...props} ref={ref} />);
