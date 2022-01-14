import Asset from "./Asset";

class Income extends Asset {
  getChangeStatus = () => {
    return this.isIncrease() ? "positive" : "negative";
  };
}

export default Income;
