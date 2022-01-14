import Asset from "./Asset";

class Expense extends Asset {
  getChangeStatus = () => {
    return this.isIncrease() ? "negative" : "positive";
  };
}

export default Expense;
