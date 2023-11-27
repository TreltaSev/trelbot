import React from "react";
import component from "@lib/types/component";

const Arrow: React.FC<component> = ({ style }) => {
  return (
    <div style={style}>
      <svg width='100%' height='100%' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path d='M6.99995 9.07082L3.5437 5.62915H10.4562L6.99995 9.07082Z' fill='white' />
      </svg>
    </div>
  );
};

export default Arrow;
