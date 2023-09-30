type type_config = {
  local: boolean;
  production: boolean;
  domain: string;
  backendPort: number;
  backendSecure: boolean;
  backendUrl: string;
};

const local: boolean = false;
const production: boolean = false;
const domain: string = "trelbot.xyz";
const backendPort: number = 1090;
const backendSecure: boolean = true;

const config: type_config = {
  local: local,
  production: production,
  domain: domain,
  backendPort: backendPort,
  backendSecure: true,
  backendUrl: `${backendSecure ? "https" : "http"}://${local ? "localhost" : domain}:${production ? "" : backendPort}/api`,
};

export default config;
