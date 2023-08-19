import user from "@lib/types/user";
import guild from "@lib/types/guild";

export type CommonMeErrors = "SessionInvalid" | "FatalBackendError";

type me = {
  attempted: boolean;
  error?: CommonMeErrors;
  user?: user;
  guilds?: Array<guild>;
};

export default me;
