import cacheHelper from "@lib/method/cacheHelper";

type channel = {
  flags?: number;
  guild_id?: number | string;
  id?: number | string;
  last_message_id?: string;
  name?: string;
  nsfw?: boolean;
  parent_id?: string | number;
  permission_overwrites?: any[];
  position?: number;
  rate_limit_per_user?: number;
  topic?: any;
  type?: number;
};

/**
 * @usage Current Channels, used whenever attempting to save, view, or modify
 * specific channel data. Data can range from temporary shards to avatar urls
 * Data must be cached in order to be used.
 */
class currentChannels extends cacheHelper {
  // Meta data inherited from guild type
  public meta: channel[] | undefined = undefined;
}

export default channel;
export { currentChannels };
