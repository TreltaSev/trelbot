import React from "react";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";

/**
 * Empty Class which can be rendered as a component
 */
class SwitchBoard extends Stylist {
  private is_visible: boolean = false;

  render() {
    this.set_decor("parent", { width: 800, height: 50, gap: 40, borderRadius: 10 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);

    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("parent")}>Testing</FlexRow>
      </>
    );
  }
}

export default SwitchBoard;
