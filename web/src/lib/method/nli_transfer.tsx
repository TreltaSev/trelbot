/**
 * Not Logged In Transfer
 * Transfers the client back to /login if use isn't logged in
 */

import loginError from "@lib/method/loginError";

/**
 * Sends a user back to login if input value is undefined
 * @param value pref cookies.session
 * @returns 
 */
const nli_transfer = (value: any): void => {
  if (value === undefined) {
    loginError("error", "You dont seem to be logged in, or maybe you cleared your cookies.", "1020", "/login");
  }
  return;
};

export default nli_transfer;
