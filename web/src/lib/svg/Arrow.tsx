import React from "react";
import defaultValue from "@lib/method/defaultValue";

type TypeArrow = {
  width?: number;
  height?: number;
};

const Arrow: React.FC<TypeArrow> = ({ width, height }) => {
  width = defaultValue(width, 14, undefined);
  height = defaultValue(height, 14, undefined);
  return (
    <div style={{ width: width, height: height }}>
      <svg width='100%' height='100%' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M6.99995 9.07082L3.5437 5.62915H10.4562L6.99995 9.07082Z' fill='white' />
      </svg>
    </div>
  );
};

export default Arrow;
