import CurrencyAmount from "../CurrencyAmount";
import ChangeAmount from "./ChangeAmount";
import Expense from "./Expense";
import Income from "./Income";

class Balance implements ChangeAmount {
  private income: Income;
  private expense: Expense;
  private locale: string;
  private currency: string;

  constructor({
    income,
    expense,
    locale,
    currency,
  }: {
    income: Income;
    expense: Expense;
    locale: string;
    currency: string;
  }) {
    this.income = income;
    this.expense = expense;
    this.locale = locale;
    this.currency = currency;
  }

  getCurrentAmount = () => {
    return this.income
      .getCurrentAmount()
      .minus(this.expense.getCurrentAmount());
  };

  getPrevAmount = () => {
    return this.income.getPrevAmount().minus(this.expense.getPrevAmount());
  };

  isIncrease = () => {
    return this.getCurrentAmount().toNumber() > this.getPrevAmount().toNumber();
  };

  getChange = () => {
    const diff = this.getCurrentAmount().minus(this.getPrevAmount());
    return diff.divide(this.getCurrentAmount()).multiply(
      new CurrencyAmount({
        amount: 100,
        currency: this.currency,
        locale: this.locale,
      })
    );
  };

  getFormattedChange = () => {
    return `${this.getChange().toNumber()} %`;
  };

  getChangeStatus = () => {
    return this.isIncrease() ? "positive" : "negative";
  };
}

export default Balance;
