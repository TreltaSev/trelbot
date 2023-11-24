import React from "react";
import styling from "@assets/styling.module.css";
import FlexRow from "@lib/component/FlexRow";
import Stylist from "@lib/component/stylist/stylist";
import WavingHand from "@root/lib/svg/WavingHand";
import SwitchboardButton from "./switchboardbutton";

/**
 * When rendered, displays a switch board which contains buttons that can open different windows.
 * @extends Stylist
 */
class Switchboard extends Stylist {
  private is_visible: boolean = false;

  render(): React.ReactNode {
    this.set_decor("swb_parent", { width: 800, height: 50, gap: 40, borderRadius: 10, position: "absolute", bottom: 50 }, `${styling.justify_content_center} ${styling.align_items_center} ${styling.main}`);

    return (
      <>
        {/* Bar Parent */}
        <FlexRow {...this.get_decor("swb_parent")}>
          <SwitchboardButton icon={<WavingHand color='#8C52FF' style={{ width: 24, height: 24, flex: "0 0 auto" }} />} />
        </FlexRow>
      </>
    );
  }
}

export default Switchboard;
