import React from "react";
import { uuidv4 } from "uuidv7";
import shard from "@root/lib/types/shard";
import callback from "@root/lib/types/callback";
import FlexRow from "@root/lib/component/FlexRow";
import FlexColumn from "@root/lib/component/FlexColumn";
import defaultValue from "@root/lib/method/defaultValue";

import styling from "@assets/styling.module.css";

type props = callback & {
  identifier?: string;
  items?: shard[];
};

type state = {};

/**
 * A animated dropdown that can display and hold information, animated in every
 * way that countes
 * @usedin `Editor.tsx/**`
 * + display items
 * + search interface
 * + select items
 * + search filters
 * @param identifier The name of the dropdown, like channel or role, make it singular since plural checks are in place.
 */
class Dropdown extends React.Component<props, state> {
  private identifier: string;
  private items: shard[] = [];

  constructor(props: props) {
    super(props);
    this.identifier = defaultValue(props.identifier, "", undefined);
    this.items = defaultValue(props.items, [], undefined);
  }

  render(): React.ReactNode {
    return (
      <FlexColumn style={{ width: 500, height: 50, borderRadius: 5, gap: 0, position: "relative" }} className={styling.align_items_flex_Start}>
        <FlexRow></FlexRow>
      </FlexColumn>
    );
  }
}

export default React.forwardRef((props: props, ref: React.Ref<Dropdown>) => <Dropdown {...props} ref={ref} />);
