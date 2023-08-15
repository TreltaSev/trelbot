/**
 * Path: www.local.xyz/login
 * Description: Its a login page that always displays if the user isn't logged in.
 */
import React from "react";
import { PartialLogo } from "@components/Global";

const DiscordLoginButton = () => {
    return (
        <div>Discord Login Button</div>
    )
}

const Login: React.FC = () => {
    return (
        <div>
        {/* Container */}

        <PartialLogo/>

        <span>Welcome to trelbot.xyz</span>
        <span>Login with Discord to continue</span>
        <DiscordLoginButton/>

        </div>
    )
}

export default Login;