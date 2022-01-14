import CurrencyAmount from "../CurrencyAmount";

interface ChangeAmount {
  getCurrentAmount: () => CurrencyAmount;

  getPrevAmount: () => CurrencyAmount;

  getChangeStatus: () => string;

  getChange: () => CurrencyAmount;

  isIncrease: () => boolean;

  getFormattedChange: () => string;
}

export default ChangeAmount;
