import React from "react";

/**
 * A text area as shown in project source files.
 * Contains a text area which is modifieable byu the user and
 * the contents of this text area can be accessed through a class method called
 * `unamed`
 * @props props_TextArea
 * @state state_TextArea
 */
class TextArea extends React.Component<props_TextArea, state_TextArea> {
  constructor(props: props_TextArea) {
    super(props);
    this.state = {
      content: ``,
    };
  }

  /**
   * Handles the input onChange event of the text area and saves the value to state
   * @param event React.ChangeEvent<HTMLTextAreaElement>
   */
  private handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ content: event.currentTarget.value });
  };

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
      <>
        <textarea
          onChange={(event) => {
            this.handleInput(event);
          }}
          value={this.state.content}></textarea>
      </>
    );
  }
}

/**
 * Props of the text area, the user input.
 * @param name The name of the text area
 * @param backing The component/image at the start of the text area
 */
export type props_TextArea = {
  name?: string;
  backing?: React.ReactNode;
};

/**
 * The state of Text Area,
 * Includes the current content of the text area
 */
export type state_TextArea = {
  content: string;
};

export default TextArea;
