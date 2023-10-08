import animate_xd from "@lib/types/animate_xd";

const animate_color = ({ ref, new_color, whileAnimate }: animate_xd) => {
  if (!ref.current) {
    return null;
  }
  whileAnimate ? whileAnimate() : {};
  return ref.current.animate({ color: new_color }, { duration: 300, fill: "forwards", easing: "cubic-bezier(.11, .07, .04, .98)" });
};

export default animate_color;
