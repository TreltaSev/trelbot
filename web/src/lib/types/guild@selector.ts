import guild from "./guild";

type guild_selector = guild & {
  display?: string;
  present?: boolean;
};

export default guild_selector;
