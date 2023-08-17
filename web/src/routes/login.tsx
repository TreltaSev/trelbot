/**
 * Path: www.local.xyz/login
 * Description: Its a login page that always displays if the user isn't logged in.
 */
import React, { useEffect, useState } from "react";
import { DefaultTemplate, PartialLogo, DiscordLogo, Text } from "@components/Global";
import styling from "@assets/styling.module.css"
import custom from "@assets/custom.module.css"


const DiscordLoginButton = () => {
    const redirectLogin = () => {
        const width: number = 500;
        const height: number = 700;
        const authorize_url = "https://discord.com/api/oauth2/authorize?client_id=932999965498834954&redirect_uri=https%3A%2F%2Ftrelbot.xyz%2Fdiscord-callback&response_type=code&scope=identify%20guilds"        
        window.open(authorize_url, "_blank", `width=${width}, height=${height}`);       
        
    }
    return (
        <div onClick={() => redirectLogin()} style={{padding: "10px 20px", borderRadius: 10, gap: 10}} className={`${custom.discordlogin} ${styling.flex_row} ${styling.justify_content_center} ${styling.align_items_center} ${styling.border_box}`}>
            <DiscordLogo/>
            <Text>Login with Discord</Text>            
        </div>
    )
}

type errorTypes = {
    active: boolean;
    message?: string | null;
    code?: string | null;
}

const Error: React.FC<errorTypes> = ({active, message, code}) => {
    return (
        <div style={{maxWidth: 200, minWidth: 100, padding: 10, position: "absolute", bottom: 50, right: 50}} className={`${styling.flex_col} ${styling.border_box} ${styling.justify_content_center} ${styling.align_items_center}`}>
            <div style={{borderBottom: "1px solid rgba(255,255,255,0.5)", padding: "2px 0px"}} className={`${styling.flex_row} ${styling.align_items_start} ${styling.fill_width}`}>
                <Text size={10}>Notice</Text>
            </div>
            <Text size={10} opacity="0.5">{message} #{code}</Text>
        </div>
    )
}

const Login: React.FC = () => {
    const [error, setError] = useState<errorTypes>({active: false})

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            const login_action: string | null = localStorage.getItem("login_action?")
            if ( login_action === "refresh" ) {
                localStorage.removeItem("login_action?")
                clearInterval(refreshInterval);
                location.href = "/dashboard"                
            }

            if ( login_action === "error") {
                // Display an error
                const _errormessage = localStorage.getItem("login_error_message?")
                const _errorcode = localStorage.getItem("login_error_code?")
                
                setError({active: true, message: _errormessage, code: _errorcode})
                const _timeout = setTimeout(() => {
                    setError({active: false})
                    clearTimeout(_timeout)
                }, 50*1000)

                // Clear localstore of errors
                localStorage.removeItem("login_action?")
                localStorage.removeItem("login_error_message?")
                localStorage.removeItem("login_error_code?")
            }

        }, 500)
    }, [])

    return (
        <DefaultTemplate classNames={`${styling.dark} ${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>            
            {/* Container */}

            <div style={{gap: 15}} className={`${styling.flex_col} ${styling.justify_content_center} ${styling.align_items_center}`}>
                {/* Logo from global.tsx */}
                <PartialLogo/>

                {/* Text under logo */}
                <Text>Welcome to trelbot.xyz</Text>
                <Text>Login with Discord to continue</Text>

                {/* Login Button */}
                <DiscordLoginButton/> 
            </div>           

            {
                error.active === false ? <></> 
                : <Error active={true} message={error.message} code={error.code}/>
            }
        </DefaultTemplate>
    )
}

export default Login;