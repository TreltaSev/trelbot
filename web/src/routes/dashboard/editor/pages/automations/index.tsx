import React from "react";
import loader from "@root/routes/dashboard/editor/loader";
const AutomationsChild: React.FC = () => {
  return (
    <>
      <>A?</>
    </>
  );
};

new loader().register_parent("Automations", undefined);
new loader().register("automationschild", <AutomationsChild />, "Automations", 1);
