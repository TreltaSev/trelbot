class loginAction {
  /**
   * Sets the error by using sessionStorage
   * @param action
   * @param message
   * @param code
   * @param fallback
   */
  setError(action: string, message: string, code: string, fallback?: string): void {
    if (fallback === undefined) {
      fallback = "/login";
    }
    sessionStorage.setItem("login_action?", action);
    sessionStorage.setItem("login_error_message?", message);
    sessionStorage.setItem("login_error_code?", code);
    window.location.href = fallback;
  }

  /**
   * Removes sessionStorage key login_action?;login_error_message?; and login_error_code;
   */
  removeError() {
    sessionStorage.removeItem("login_action?");
    sessionStorage.removeItem("login_error_message?");
    sessionStorage.removeItem("login_error_code?");
  }
  
  /**
   * 
   * @returns Error data as object
   */
  getError(): object {
    return {
      login_action: sessionStorage.getItem("login_action?"),
      login_error_message: sessionStorage.getItem("login_error_message?"),
      login_error_code: sessionStorage.getItem("login_error_code?")
    }
  }
}

export default loginAction;