import React from "react";

type props = {
  onToggle?: (...args: any[]) => any;
  callback?: (value: boolean) => any;
  initial?: boolean;
};

type state = {};

/**
 * A "Toggleable" button whos value can be accessed through ref using a method.
 */
class ToggleButton extends React.Component<props, state> {
  private inner: React.RefObject<HTMLDivElement>;
  private outer: React.RefObject<HTMLDivElement>;
  private onToggle?: (...args: any[]) => any;
  private callback?: (...args: any[]) => any;
  private initial: boolean;
  private toggled: boolean;

  // Defined values in the contrructor
  constructor(props: props) {
    super(props);
    this.inner = React.createRef();
    this.outer = React.createRef();
    this.onToggle = props.onToggle;
    this.callback = props.callback;
    this.initial = props.initial === true;
    this.toggled = this.initial;
    this.state = {
      toggled: this.initial,
    };
  }

  toggle() {
    // Run defined ontoggle method
    if (this.onToggle) {
      this.onToggle();
    }

    // Return if both aren't present
    if (!this.outer.current || !this.inner.current) {
      return;
    }

    this.toggled = !this.toggled;

    const bg = this.toggled ? "#8C52FF" : "rgba(255,255,255,0.2)";
    const offset = `translateX(${this.toggled ? 30 : 4}px)`;
    const options: KeyframeAnimationOptions = { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" };
    this.outer.current.animate({ background: bg }, options);
    this.inner.current.animate({ transform: offset }, options);
  }

  // Set the inital color of the switch
  componentDidMount(): void {
    if (this.outer.current && this.inner.current) {
      this.outer.current.style.background = this.initial ? "#8C52FF" : "rgba(255,255,255,0.2)";
      this.inner.current.style.transform = `translateX(${this.toggled ? 30 : 4}px)`;
    }
  }

  render(): React.ReactNode {
    return (
      <div ref={this.outer} onClick={() => this.toggle()} style={{ width: 50, height: 20, position: "relative", borderRadius: 5, cursor: "pointer" }}>
        <div ref={this.inner} style={{ width: 16, height: 16, borderRadius: 5, top: 2, border: "4px solid rgba(255,255,255,0.5)", background: "rgba(255,255,255,0.5)", boxSizing: "border-box", position: "absolute" }} />
      </div>
    );
  }
}

export default React.forwardRef((props: props, ref: React.Ref<ToggleButton>) => <ToggleButton {...props} ref={ref} />);
