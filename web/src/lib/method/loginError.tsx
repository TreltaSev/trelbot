const loginError = (action: string, message: string, code: string, fallback?: string) => {
  if (fallback === undefined) {
    fallback = "/login";
  }
  localStorage.setItem("login_action?", action);
  localStorage.setItem("login_error_message?", message);
  localStorage.setItem("login_error_code?", code);
  window.location.href = fallback;
};

export default loginError;
