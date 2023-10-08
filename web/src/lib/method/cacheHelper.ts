/**
 * Saves
 */
class cacheHelper {
  /**
   * Caches the `value` to the `key` this method can be used
   * for easy manipulation of a class, all you need to do is inherit
   * from this class.
   * @param key The name of the key
   * @param value The value
   */

  [key: string]: any;

  public cache = (key?: string, value?: any) => {
    if (key === undefined || value === undefined) {
      console.error(`Failed in caching ${key} to ${value} in ${this}... (One or more values undefined)`);
      return;
    }
    this[key] = value;
  };
}

export default cacheHelper;
