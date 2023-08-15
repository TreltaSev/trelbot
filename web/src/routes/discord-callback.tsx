/**
 * Path: www.local.xyz/discord-callback
 * Description: Discord callback handler, handles the code from the discord fallback link
 */
import React, { useEffect } from "react";
const DiscordCallback: React.FC = () => {

    useEffect(() => {
        localStorage.setItem("login_refresh?", "true");
        window.close();
        
    }, [])

    return (
        <></>
    )
}

export default DiscordCallback