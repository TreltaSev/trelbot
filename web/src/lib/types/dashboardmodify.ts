import cacheHelper from "@lib/method/cacheHelper";

class dashboardModify extends cacheHelper {
  // Class Only Use Identifiers
  private identifiers: string[];

  constructor() {
    super(["setPossibleInitial", "checkWithInitial", "delete_methods", "identifiers"]);
    this.identifiers = [];
  }

  /**
   * For one, it caches the value directly into the this.identifiers object where all
   * initial counterparts are saved. these can be accessed with the checkWithInitial method.
   * @param key The key of the identifier
   * @param value the `initial value` of the identifier
   * @param force if this is set to `true`, no matter if the value exists or not it will be force cached.
   * @param withCache if this is set to true, this also caches the key value pair.
   */
  public setPossibleInitial = (key?: string, value?: any, force?: boolean, withCache?: boolean) => {
    if (key && !this.identifiers.includes(key)) {
      this.identifiers.push(key);
    }

    const possibleIdentifier: string = `initial:${key}`;

    if (!(possibleIdentifier in this.obtain()) || force) {
      this.cache(`initial:${key}`, value);
    }

    if (withCache) {
      this.cache(key, value);
    }
  };

  /**
   * Cross checks every saved identifier with their initial counterparts to check and see if the user has updated some information.
   * @returns if `1`, some value doesn't equal its initial value, meaning the user
   * has changed some value somewhere; however, if `2`, every value matches their initial
   * values meaning that they weren't changed at all or were changed back. if the return value is `3` there has been an error.
   */
  public checkWithInitial = (): 1 | 2 | 3 => {
    for (const identifier of this.identifiers) {
      try {
        const initialValue: any = this.obtain()[`initial:${identifier}`];
        const currentValue: any = this.obtain()[identifier];
        console.log(initialValue, currentValue);
        if (!(initialValue == currentValue)) {
          return 1;
        }
      } catch (e) {
        console.error(`[ dashboardmodify.ts ] Failed with checks: ${e}`);
        return 3;
      }
    }
    return 2;
  };
}

export { dashboardModify };
