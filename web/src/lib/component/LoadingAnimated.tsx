import React from "react";
import { uuidv7 } from "uuidv7";
import { strnum } from "@lib/types/sizes";
import FlexRow from "@lib/component/FlexRow";
import styling from "@assets/styling.module.css";
import { cubicBezier, motion } from "framer-motion";
import defaultValue from "@lib/method/defaultValue";

type type_LoadingAnimated = {
  size?: strnum;
  gap?: strnum;
  heightoffset?: strnum;
  amount?: number;
  duration?: any;
};

const LoadingAnimated: React.FC<type_LoadingAnimated> = ({ size, gap, heightoffset, amount, duration }) => {
  const _size = defaultValue(size, 16, undefined);
  const _gap = defaultValue(gap, "5px", undefined);
  const _heightoffset = defaultValue(heightoffset, 10, undefined);
  const _amount = defaultValue(amount, 3, undefined);
  const _duration = defaultValue(duration, 0.5, undefined);
  return (
    <FlexRow style={{ height: `${_heightoffset + _size}px`, gap: _gap }} className={`${styling.align_items_center} ${styling.justify_content_center}`}>
      {[...Array(_amount).keys()].map((i) => (
        <motion.div
          style={{ width: _size, height: _size, flexShrink: 0, borderRadius: "50%" }}
          initial={{ opacity: 1, transform: `translateY(${_size / 2}px)`, y: "0" }}
          animate={{ opacity: [1.0, 0.5], transform: [`translateY(${_size / 2}px`, `translateY(-${_size / 2}px`] }}
          transition={{ duration: _duration, repeat: Infinity, repeatType: "reverse", ease: cubicBezier(0.11, 0.07, 0.04, 0.98), delay: (_duration / _amount) * i }}
          className={styling.main}
          key={`${uuidv7()}`}
        />
      ))}
    </FlexRow>
  );
};

export default LoadingAnimated;
