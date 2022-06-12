export interface IPlant {
  _id: string;
  name: string;
  leaves: ILeaf[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILeaf {
  date: Date;
  type: "leaf" | "flower";
  index: number;
  measurements: IMeasurement[];
}

export interface IMeasurement {
  date: Date;
  value: number;
}
