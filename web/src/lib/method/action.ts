class action {
  /**
   * Gets the action of a specific scope,
   * Actions are set and accessed using `localStorage`
   * you can use this method by running
   * ```
   * action.get("/login")
   * ```
   * @param scope The scope of the localstorage key, this can be some sort of identifier. will be formated to `${scope}!action?`
   * @returns The action that sits in `${scope}!action?` in localstorage
   */
  get(scope: string): string | null {
    return localStorage.getItem(`${scope}!action?`);
  }

  bulk_get(scopes: string[]): any[] {
    const _vals: any[] = [];
    scopes.forEach((scope) => {
      _vals.push(this.get(scope));
    });
    return _vals;
  }

  /**
   * Sets an action with a scope,
   * Saves the action in `${scope}!action?` scope being the inputed
   * value
   * @param scope the scope of the localstorage key, will be formated to `${scope}!action?`
   * @param value the value of the scope.
   * @returns Nothing,
   */
  set(scope: string, value: string): void {
    localStorage.setItem(`${scope}!action?`, value);
  }

  /**
   * Removes the scope from localstorage.
   * @param scope: the name of the scope in local storage.
   * @returns
   */
  remove(scope: string): void {
    localStorage.removeItem(`${scope}!action?`);
  }

  /**
   * Removes the inputed scopes from localstorage
   * @param scopes The array of scopes
   */
  bulk_remove(scopes: string[]): void {
    scopes.forEach((scope) => {
      this.remove(scope);
    });
  }
}

export default action;
