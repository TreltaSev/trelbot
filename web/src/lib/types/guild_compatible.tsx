import guild from "@lib/types/guild";
import component from "@lib/types/component";

type guild_compatible = component & {
  guild?: guild
}

export default guild_compatible;