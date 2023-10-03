import NavigationLayout from "@root/lib/layouts/Navigation";
import React from "react";
import { useParams } from "react-router-dom";
import Selector from "./selector";

/**
 *
 * @path : www.domain.tld/dashboard
 * @description : The main dashboard the user sees that has a connection with the backend api
 */
const Dashboard: React.FC = () => {
  /**
   * Since you have to determine if a user is selecting a guild or already editing one
   * I will use the value DashType to determine this.
   * If a guild_id is present in the params then
   * Its editing, else its selecting.
   */

  let { guildId } = useParams();
  const DashType: "selector" | "editor" = guildId === undefined ? "selector" : "editor";

  switch (DashType) {
    case "selector":
      return (
        <NavigationLayout className={``}>
          <Selector />
        </NavigationLayout>
      );

    case "editor":
      return (
        <>
          <></>
        </>
      );
  }
};

export default Dashboard;
