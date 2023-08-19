import React, { ReactNode } from "react";
import styling from "@assets/styling.module.css";

interface DefaultTemplateProps {
  children: ReactNode;
  classNames: string;
}

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ children, classNames }) => {
  return <div className={`${styling.fill_height} ${classNames}`}>{children}</div>;
};

export default DefaultTemplate;
