type type_loginAction = {
  login_action?: string | null;
  login_error_message?: string | null;
  login_error_code?: string | null;
};

class loginAction {
  /**
   * gets the action of login from localStorage
   * @returns login_action
   */
  getAction(): string | null {
    return localStorage.getItem("login_action?");
  }

  /**
   * Sets the action of ling from localstorage
   */
  setAction(value: string): void {
    localStorage.setItem("login_action?", value);
  }

  /**
   * removes action of login from localstorage
   */
  removeAction() {
    localStorage.removeItem("login_action?");
  }

  /**
   * Sets the error by using localStorage
   * @param action
   * @param message
   * @param code
   * @param fallback
   */
  setError(action: string, message: string, code: string, fallback?: string): void {
    if (fallback === undefined) {
      fallback = "/login";
    }
    localStorage.setItem("login_action?", action);
    localStorage.setItem("login_error_message?", message);
    localStorage.setItem("login_error_code?", code);
    window.location.href = fallback;
  }

  /**
   * Removes localStorage key login_action?;login_error_message?; and login_error_code;
   */
  removeError() {
    localStorage.removeItem("login_action?");
    localStorage.removeItem("login_error_message?");
    localStorage.removeItem("login_error_code?");
  }

  /**
   *
   * @returns Error data as object
   */
  getError(): type_loginAction {
    return {
      login_action: localStorage.getItem("login_action?"),
      login_error_message: localStorage.getItem("login_error_message?"),
      login_error_code: localStorage.getItem("login_error_code?"),
    } as type_loginAction;
  }
}

export default loginAction;
