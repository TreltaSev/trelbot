import React from "react";
import Text from "@lib/element/Text";
import styling from "@assets/styling.module.css";

interface GuildChipProperties {
    name: string;
    image: string;
    display: string;
    present: boolean;
}

const GuildChip: React.FC<GuildChipProperties> = ({ name, image, display, present}) => {
    return (
        <div style={{minWidth: 800, minHeight: 80, padding: 20, gap: 10}} className={`${styling.flex_row} ${styling.align_items_center} ${styling.borderbox}`}>
            <img alt="" src={image} width={40} height={40} style={{borderRadius: "50%"}} className={`${styling.no_shrink}`}/>
        </div>
    )
}

export default GuildChip