import React from "react";
import Grab from "./Grab";
import callback from "@root/lib/types/callback";

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
      />
    );
  }
}

export default TextArea;
