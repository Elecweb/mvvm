import { map } from "rxjs";
import AccountAPI from "./AccountAPI";
import Income from "../account/example3/Income";
import Expense from "../account/example3/Expense";
import Balance from "../account/example3/Balance";

class AccountRepository {
  private accountAPI: AccountAPI;
  constructor(accountAPI: AccountAPI) {
    this.accountAPI = accountAPI;
  }

  getBalance = () => {
    return this.accountAPI.getBalance().pipe(
      map((data) => {
        const income = new Income({
          currentAmount: data.income,
          currency: data.currency,
          locale: data.locale,
          prevAmount: data.prevIncome,
        });

        const expense = new Expense({
          currentAmount: data.expense,
          currency: data.currency,
          locale: data.locale,
          prevAmount: data.prevExpense,
        });

        const balance = new Balance({
          expense,
          income,
          locale: data.locale,
          currency: data.currency,
        });

        return {
          accountName: `${data.name} ${data.lastname}`,
          income,
          expense,
          balance,
        };
      })
    );
  };
}

export default AccountRepository;
