import React from "react";
import Text from "@lib/element/Text";

interface GuildChipProperties {
    name: string;
    image: string;
    display: string;
    present: boolean;
}

const GuildChip: React.FC<GuildChipProperties> = ({ name, image, display, present}) => {
    return (
        <div></div>
    )
}

export default GuildChip