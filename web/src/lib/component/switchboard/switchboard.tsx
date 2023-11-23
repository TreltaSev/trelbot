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
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);

    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>Testing</FlexRow>
      </>
    );
  }
}

export default SwitchBoard;
