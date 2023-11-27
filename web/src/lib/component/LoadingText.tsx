import React from "react";
import Text from "@root/lib/component/Text";
import callifcallable from "@root/lib/method/callifcallable";

type run_types = "run_on_render" | "run_on_call" | "run_when_true" | "loop_until_called" | "loop_when_called";

type props = {
  achieve_text: string;
  duration?: number;
  type?: run_types;
  show_callback?: (...args: any[]) => void;
  hide_callback?: (...args: any[]) => void;
};

type state = {
  current_text?: string;
};

class LoadingText extends React.Component<props, state> {
  private goal_text: string;
  private duration: number = 1000.0;
  private show_callback?: (...args: any[]) => void;
  private hide_callback?: (...args: any[]) => void;
  private type: run_types = "run_on_render";
  public stop_signal: boolean = false;
  private initial_call: boolean = true;

  render() {
    return <Text preset='1em-normal'>{this.state.current_text}</Text>;
  }

  constructor(props: props) {
    super(props);

    // Set Goal Text
    this.goal_text = props.achieve_text;

    // Set Duration
    this.duration = this.props.duration || 1000.0;
    this.show_callback = this.props.show_callback;
    this.hide_callback = this.props.hide_callback;
    this.type = this.props.type || "run_on_render";

    this.state = {
      current_text: "",
    };
  }

  /**
   * Sends out a signal through this class that can do certain things
   * depending on `this.type`
   */
  call() {
    switch (this.type) {
      case "run_on_call":
        this.show();
        break;

      case "loop_until_called":
        this.stop_signal = true;
        break;

      case "loop_when_called":
        if (!this.initial_call) {
          return;
        }
        this.initial_call = false;
        this.start_loop();
        break;
    }
  }

  /**
   * Start loops or run animation when needed
   */
  componentDidMount(): void {
    switch (this.type) {
      case "run_on_render":
        this.show();
        break;

      case "loop_until_called":
        this.start_loop();
        break;
    }
  }

  /**
   * Starts the animation loop sequence, shouldn't be called outside of this class.
   */
  start_loop() {
    let iter = 0;
    const interval = setInterval(() => {
      if (this.stop_signal) {
        clearInterval(interval);
        return;
      }
      iter++;
      this.loop_cycle();
    }, this.duration * 2 + 500);
    this.loop_cycle();
  }

  /**
   * Modularized code which is placed within `start_loop()`
   */
  loop_cycle() {
    this.show();
    setTimeout(() => {
      this.hide();
    }, this.duration + 500);
  }

  /**
   * Shows the goal_text when called, takes in the duration prop
   * @param instant If true, instantly sets state, defaults to false
   * @returns Nothing
   */
  show(instant: boolean = false): void {
    if (instant) {
      this.commit_goal(this.goal_text);
      callifcallable(this.show_callback);
      return;
    }

    let iter = 0;

    const interval = setInterval(() => {
      // Check if clear needed
      if (iter > this.goal_text.length) {
        clearInterval(interval);
        if (this.type == "run_on_render" || this.type == "run_on_call") {
          callifcallable(this.show_callback);
        }
        return;
      }

      // Update Iteration
      iter++;

      // Set State
      this.commit_goal(this.goal_text.slice(0, iter));
    }, this.duration / this.goal_text.length);
  }

  /**
   * Hides the goal_text when called, setting the state to ""
   * @param instant If true, instantly sets state, defaults to false
   * @returns
   */
  hide(instant: boolean = false): void {
    if (instant) {
      this.commit_goal("");
      callifcallable(this.hide_callback);
      return;
    }

    let iter = this.goal_text.length;

    const interval = setInterval(() => {
      // Clear interval if needed
      if (iter <= 0) {
        clearInterval(interval);

        if (this.type == "run_on_call" || this.type == "run_on_render") {
          callifcallable(this.hide_callback);
        } else {
          if (this.stop_signal) {
            callifcallable(this.hide_callback);
          }
        }
        return;
      }

      // Update Iteration
      iter--;

      // Set State
      this.commit_goal(this.goal_text.slice(0, iter));
    }, this.duration / this.goal_text.length);
  }

  /**
   * Shorthand for this.setState({current_text});
   * @param input Text to update to
   */
  commit_goal(input?: string) {
    this.setState({ current_text: input });
  }
}

export default LoadingText;
