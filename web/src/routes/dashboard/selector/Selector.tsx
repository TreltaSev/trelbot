import mutgl from "@root/lib/vars/mutgl";
import React, { useEffect } from "react";

const Selector: React.FC = () => {
  {
    /**
     * This useEffect should loop every 500ms to check if guilds have or have
     * not been loaded.
     */
  }
  useEffect(() => {
    mutgl.rc_guild(true);
  }, []);
  return (
    <>
      <></>
    </>
  );
};

export default Selector;
