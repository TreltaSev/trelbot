import user from "@lib/types/user";

class userSession {
  /**
   * Sets re-used user data inside `LocalStorage`, key of data is `"user.persistant"`
   * the data inside user.persistant is either a json serializable string containing the `avatar url`, `name`,
   * and `discriminator` of the user or a null | undefined object.
   */
  set(name: string, id: number, discriminator: string | number, avatar: string): void {
    const userobj = {
      name: name,
      id: id,
      discriminator: discriminator,
      avatar: avatar,
    };
    localStorage.setItem("user.persistant", JSON.stringify(userobj));
  }

  /**
   * uses localStorage remove to remove the user data stored in user.persistant of localStorage
   */
  remove(): void {
    localStorage.removeItem("user.persistant");
  }

  /**
   * Returns the json object of `user.persistant`, its either a `object` or `null` | `undefined`
   */
  get(): user | null {
    const userstr: string | null = localStorage.getItem("user.persistant");
    if (!userstr) {
      return null;
    }
    return JSON.parse(userstr);
  }

  /**
   * @returns a boolean representing if user.persistant from localstorage is set or not.
   */
  isEmpty(): boolean {
    return localStorage.getItem("user.persistant") === null;
  }
}

export default userSession;
