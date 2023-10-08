import React from "react";

type props = {
  onToggle?: (...args: any[]) => any;
  callback?: (value: boolean) => any;
  initial?: boolean;
};

type state = {
  initial?: boolean;
};

/**
 * A "Toggleable" button whos value can be accessed through ref using a method.
 */
class ToggleButton extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      initial: props.initial === true,
    };
  }

  render(): React.ReactNode {
    return <div style={{ background: "#e45853", width: 50, height: 20, position: "relative", borderRadius: 5, cursor: "pointer" }}></div>;
  }
}

export default React.forwardRef((props: props, ref: React.Ref<ToggleButton>) => <ToggleButton {...props} ref={ref} />);
