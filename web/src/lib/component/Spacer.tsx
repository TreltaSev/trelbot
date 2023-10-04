import React from "react";
import styling from "@assets/styling.module.css";

/**
 * Just a component with fill_width and fill_height
 */
const Spacer: React.FC = () => {
  return <div className={`${styling.fill_width} ${styling.fill_height}`} />;
};

export default Spacer;
