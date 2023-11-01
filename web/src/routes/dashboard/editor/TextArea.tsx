import React from "react";
import Grab from "./Grab";
import callback from "@root/lib/types/callback";
import styling from "@assets/styling.module.css";
import custom from "@assets/custom.module.css";
/**
 * Props of the text area, the user input.
 * @param name The name of the text area
 * @param backing The component/image at the start of the text area
 */
type props = callback & {
  name?: string;
  backing?: React.ReactNode;
};

/**
 * The state of Text Area,
 * Includes the current content of the text area
 */
type state = {
  content: string;
};

/**
 * A text area as shown in project source files.
 * Contains a text area which is modifieable byu the user and
 * the contents of this text area can be accessed through a class method called
 * `unamed`
 */
class TextArea extends React.Component<props, state> implements Grab {
  private callback?: (...args: any[]) => any;

  constructor(props: props) {
    super(props);
    this.callback = props.callback;
    this.state = {
      content: ``,
    };
  }

  grab() {
    return this.state.content;
  }

  /**
   * Gets content inside text area with state.
   * @returns Current Content
   */
  public get = (): string => {
    return this.state.content;
  };

  /**
   * Render
   * @returns React.ReactNode
   */
  render() {
    return (
      <textarea
        onChange={(event) => {
          this.setState({ content: event.currentTarget.value });
          if (this.callback) {
            this.callback(event.currentTarget.value);
          }
        }}
        value={this.state.content}
        style={{ minWidth: 500, maxWidth: 500, maxHeight: 200, minHeight: 50, color: "rgba(255,255,255,0.5)", fontFamily: "Lato", fontWeight: "400", fontSize: "0.75em", borderRadius: 5, padding: "20px 10px" }}
        className={`${styling.darker} ${custom.input_no_border} ${styling.border_box}`}
      />
    );
  }
}

export default TextArea;
