import mutgl from "@root/lib/vars/mutgl";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Editor: React.FC = () => {
  let { guildId } = useParams();

  /**
   * @useEffect Fetches the guild data from the guild id by sending
   * a get request to the backend api, that response gets saved into a
   * guild object inside const guild.
   */
  useEffect(() => {
    /* Fetch and Save Guild Data like channels and settings */
    mutgl.rc_guild(guildId as string).then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <>-[</>
    </>
  );
};

export default Editor;
