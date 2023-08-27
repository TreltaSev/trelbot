import React from "react";

type type_AlternativeIfUndefined = {
  value?: any;
  alternative?: React.ReactNode;
  children?: React.ReactNode;
}


/**
 * returns the specified alternative component if the input value is undefined
 * returns the children if value is not undefined,
 * value can be any value inluding a list. its an array
 * it will check all the values inside the array and if the array
 * has a child which is undefined it will return the alternative.
 * @param param0 
 * @returns 
 */
const AlternativeIfUndefined: React.FC<type_AlternativeIfUndefined> = ({ value, alternative, children }) => {
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
    return <>{alternative}</>;
  }

  return <>{children}</>
}

export default AlternativeIfUndefined