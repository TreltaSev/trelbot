import identifier from "./identifier";

type shard = Omit<identifier, "description"> & {
  element?: React.ReactNode;
  position?: number;
};

export default shard;
