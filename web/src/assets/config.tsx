/**
 * Config
 * Stores global variables such as backend urls and ports
 */


interface configInterface {
    local: boolean;
    production: boolean;    
    domain: string;
    backendPort: number,
    backendSecure: boolean,
    backendUrl: string,
}





const local: boolean         = false
const production: boolean    = false
const domain: string         = "trelbot.xyz"
const backendPort: number    = 1090
const backendSecure: boolean = true

const config: configInterface = {
    local: local,
    production: production,
    domain: domain,
    backendPort: backendPort,
    backendSecure: true,
    backendUrl: `${backendSecure ? "https" : "http"}://${local ? "localhost" : domain}:${backendPort}/api`,
}

export default config