class NominalModel {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

export const nominalList = [
  new NominalModel("1", 2000),
  new NominalModel("2", 5000),
  new NominalModel("3", 10000),
  new NominalModel("4", 20000),
  new NominalModel("5", 50000),
];
