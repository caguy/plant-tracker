type Plant = {
  id: string;
  name: string;
  leaves: Leaf[];
};

type Leaf = {
  date: Date;
  type: "leaf" | "flower";
  index: number;
  measurements: Measurement[];
};

type Measurement = {
  date: Date;
  value: number;
};
