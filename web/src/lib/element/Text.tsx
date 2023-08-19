import React, { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
  size?: number | string;
  color?: string;
  weight?: number | string;
  opacity?: string;
  classNames?: string;
}

const Text: React.FC<TextProps> = ({ children, size, color, weight, opacity, classNames }) => {
  size = size === undefined ? 16 : size;
  color = color === undefined ? "#fff" : color;
  weight = weight === undefined ? "400" : weight;
  opacity = opacity === undefined ? "1" : opacity;
  return (
    <span
      style={{
        fontFamily: "Lato",
        color: color,
        fontSize: size,
        fontWeight: weight,
        opacity: opacity,
      }}
      className={classNames}>
      {children}
    </span>
  );
};

export default Text;
