import React from "react";
import { dotPulse } from "ldrs";
import NavigationLayout from "@root/lib/layouts/Navigation";
import FlexColumn from "@root/lib/component/FlexColumn";
import styling from "@assets/styling.module.css";
import Text from "@root/lib/component/Text";
dotPulse.register();

type props = {
  achieve_text: string;
  duration?: number;
  show_callback?: (...args: any[]) => void;
  hide_callback?: (...args: any[]) => void;
};

type state = {
  current_text?: string;
};

class TextTesting extends React.Component<props, state> {
  private goal_text: string;
  private duration: number = 1000.0;
  private show_callback?: (...args: any[]) => void;
  private hide_callback?: (...args: any[]) => void;

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

    this.state = {
      current_text: "",
    };
  }

  componentDidMount(): void {
    this.show();
    setTimeout(() => {
      this.hide();
    }, 1500);
  }

  /**
   * Shows the goal_text when called, takes in the duration prop
   * @param instant If true, instantly sets state, defaults to false
   * @returns Nothing
   */
  show(instant: boolean = false): void {
    if (instant) {
      this.commit_goal(this.goal_text);
      if (this.show_callback) {
        this.show_callback();
      }

      
      return;
    }

    let iter = 0;

    const interval = setInterval(() => {
      // Check if clear needed
      if (iter > this.goal_text.length) {
        clearInterval(interval);
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
      return;
    }

    let iter = this.goal_text.length;

    const interval = setInterval(() => {
      // Clear interval if needed
      if (iter <= 0) {
        clearInterval(interval);
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

const Dev: React.FC = () => {
  return (
    <NavigationLayout>
      <FlexColumn style={{ gap: 20 }} className={`${styling.fill_all} ${styling.align_items_center} ${styling.justify_content_center}`}>
        <Text preset='1em-normal'>Gathering Permissions...</Text>
        <TextTesting achieve_text='poggers.....' />
        <l-dot-pulse size={50} speed={1.3} color='white' />
      </FlexColumn>
    </NavigationLayout>
  );
};

export default Dev;
