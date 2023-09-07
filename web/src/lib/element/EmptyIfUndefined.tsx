import React from "react";

type type_EmptyIfUndefined = {
  value?: any;
  children?: React.ReactNode;
};

/**
 * Returns <></> if input value is undefined
 * returns the children if it isn't undefined
 * @param value
 * @returns
 */
const EmptyIfUndefined: React.FC<type_EmptyIfUndefined> = ({ value, children }) => {
  let isUndefined: boolean = false;

  if (Array.isArray(value)) {
    value.forEach((child_value) => {
      if (child_value === undefined) {
        isUndefined = true;
      }
    });
  } else {
    if (value === undefined) {
      isUndefined = true;
    }
  }

  if (isUndefined) {
    return <></>;
  }

  return <>{children}</>;
};

export default EmptyIfUndefined;
