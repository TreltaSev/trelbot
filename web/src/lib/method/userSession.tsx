/**
 * Sets re-used user data inside `SessionStorage`, key of data is `"user.volatile"`
 * the data inside user.volatile is either a json serializable string containing the `avatar url`, `name`,
 * and `discriminator` of the user or a null | undefined object.
 */
const set = (name: string, discriminator: string | number, avatar: string): void => {
  const userobj = {
    name: name,
    discriminator: discriminator,
    avatar: avatar,
  };
  sessionStorage.setItem("user.volatile", JSON.stringify(userobj));
};

/**
 * uses sessionStorage remove to remove the user data stored in user.volatile of sessionStorage
 */
const remove = (): void => {
  sessionStorage.removeItem("user.volatile");
};

/**
 * Returns the json object of `user.volatile`, its either a `object` or `null` | `undefined`
 */
const get = (): object | null => {
  const userstr: string | null = sessionStorage.getItem("user.volatile")
  if (!userstr) {
    return null;
  }
  return JSON.parse(userstr);
};
