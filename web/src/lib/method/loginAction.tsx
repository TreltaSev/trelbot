export const set = (action: string, message: string, code: string, fallback?: string) => {
  if (fallback === undefined) {
    fallback = "/login";
  }
  localStorage.setItem("login_action?", action);
  localStorage.setItem("login_error_message?", message);
  localStorage.setItem("login_error_code?", code);
  window.location.href = fallback;
};

export const clear = () => {
  localStorage.removeItem("login_action?");
  localStorage.removeItem("login_error_message?");
  localStorage.removeItem("login_error_code?");
};
