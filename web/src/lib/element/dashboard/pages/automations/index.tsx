import React from "react";
import OnBan from "@lib/element/dashboard/pages/automations/OnBan";
import OnJoin from "@lib/element/dashboard/pages/automations/OnJoin";
import OnLeave from "@lib/element/dashboard/pages/automations/OnLeave";
import { loader, register_parent } from "@lib/element/dashboard/loader";

register_parent("Automations", undefined);
loader("On Join", <OnJoin />, "Automations", 1);
loader("On Leave", <OnLeave />, "Automations", 2);
loader("On Ban", <OnBan />, "Automations", 3);
