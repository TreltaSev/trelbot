import cacheHelper from "@lib/method/cacheHelper";

type guild = {
  features?: unknown[];
  icon?: string;
  icon_url?: string;
  id?: string;
  name?: string;
  owner?: boolean;
  permissions?: number;
  permissions_new?: number;
  settings?: any;
};

/**
 * @usage Current Guild, used whenever attempting to save, view, or modify
 * specific guild data. Data can range from temporary shards to avatar urls, to guild settings
 * Data must be cached in order to be used.
 */
class currentGuild extends cacheHelper {
  // Meta data inherited from guild type
  public meta: guild = {};
}

export default guild;
export { currentGuild };
