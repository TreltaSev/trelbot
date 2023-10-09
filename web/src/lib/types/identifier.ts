import component from "./component";

type identifier = component & {
  name?: any;
  description?: any;
  icon?: React.ReactNode;
};

export default identifier;
