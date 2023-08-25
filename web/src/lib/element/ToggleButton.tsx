import React from "react";

type props_ToggleButton = {
}

type state_ToggleButton = {

}

class ToggleButton extends React.Component {
  private toggleRef: React.RefObject<HTMLDivElement>;
  private innerRef: React.RefObject<HTMLDivElement>;

  constructor(props: state_ToggleButton) {
    super(props);    
    this.toggleRef = React.createRef();
    this.innerRef = React.createRef();
  }

  /**
   * Animates the button
   */
  toggle() {
    console.log("toggle")
  }

  render() {
    return (
      <div onClick={() => this.toggle()} ref={this.toggleRef} style={{background: "#E45853", width: 50, height: 20, position: "relative", borderRadius: 5, cursor: "pointer"}}>
        <div ref={this.innerRef} style={{width: 16, height: 16, background: "rgba(255,255,255,0.5)", borderRadius: 5, position: "absolute", top: 2}}/>
      </div>
    )
  }
}

export default React.forwardRef(
  (props: props_ToggleButton, ref: React.Ref<ToggleButton>) => (
    <ToggleButton {...props} ref={ref} />
  )
)