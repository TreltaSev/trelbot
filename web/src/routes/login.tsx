import React, { useEffect } from "react";
import action from "@lib/method/action";
import defaultValue from "@lib/method/defaultValue";

/**
 * @path : www.domain.tld/login
 * @description : Login page that allows entry to the backend api with a discord oauth integration.
 *
 */
const Login: React.FC = () => {
  /**
   * Loops every so often to check for "actions"
   * Actions allow a different route or site to communicate with this component via
   * the local storage api.
   */
  useEffect(() => {
    const action_check_interval = setInterval(() => {
      switch (defaultValue(new action().get("/login"), null, null)) {
        // If the action is "refresh", go back to previous page or /dashboard
        case "refresh":
          clearInterval(action_check_interval);
          const _href = new action().get("/login-path");
          new action().remove("/login");
          new action().remove("/login-path");
          location.href = _href === null ? "/dashboard" : _href;
          break;
        case "error":
          console.error("Error has been had");
          break;
        case null:
          break;
      }
    }, 500);
  }, []);

  return <>Poggers</>;
};

export default Login;
