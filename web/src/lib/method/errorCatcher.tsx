import { set } from "@lib/method/loginAction";

const errorCatcher = (data: any): boolean => {
  if (data.hasOwnProperty("code")) {
    const _code: number = data.code;
    const _message: string = data.message;

    switch (_code) {
      case 1020:
      case 1028:
        // Error 1020 || 1028
        set("error", _message, _code.toString(), "/login");
        break;
      default:
        console.error(`Error, Stack: ${data}`);
        break;
    }

    return true;
  }
  return false;
};

export default errorCatcher;
