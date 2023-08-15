/**
 * Path: www.local.xyz/discord-callback
 * Description: Discord callback handler, handles the code from the discord fallback link
 */
import React, { useEffect } from "react";
import { JsonForm } from "@components/Global";
import config from "@assets/config";

const DiscordCallback: React.FC = () => {

    useEffect(() => {
        fetch(config.backendUrl, JsonForm("post", {})).then(data => data.json()).then(
            _d => {console.log(_d)}
        )
        localStorage.setItem("login_refresh?", "true");
        window.close();        
        
    }, [])

    return (
        <></>
    )
}

export default DiscordCallback