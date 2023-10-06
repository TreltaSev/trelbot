import React from "react";
import loader from "@root/routes/dashboard/editor/loader";
const Automations: React.FC = () => {
  return (
    <>
      <>Page: Automations</>
    </>
  );
};

new loader().register("Automations", <Automations />, 1);
