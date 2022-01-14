import CurrencyAmount from "../CurrencyAmount";

class Income {
  private currentAmount: CurrencyAmount;
  private prevAmount: CurrencyAmount;
  private locale: string;
  private currency: string;

  constructor({
    currentAmount,
    prevAmount,
    locale,
    currency,
  }: {
    currentAmount: number;
    prevAmount: number;
    locale: string;
    currency: string;
  }) {
    this.currentAmount = new CurrencyAmount({
      amount: currentAmount,
      currency,
      locale,
    });

    this.prevAmount = new CurrencyAmount({
      amount: prevAmount,
      currency,
      locale,
    });

    this.locale = locale;
    this.currency = currency;
  }

  getCurrentAmount = () => {
    return this.currentAmount;
  };

  getPrevAmount = () => {
    return this.prevAmount;
  };

  isIncrease = () => {
    return this.currentAmount.toNumber() > this.prevAmount.toNumber();
  };

  getChangeStatus = () => {
    return this.isIncrease() ? "positive" : "negative";
  };

  getChange = () => {
    const diff = this.currentAmount.minus(this.prevAmount);
    return diff.divide(this.currentAmount).multiply(
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
}

export default Income;
