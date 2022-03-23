import { of } from "rxjs";
import { AccountDataSource } from "./AccountDataSource";

class MockAccountApi implements AccountDataSource {
  getBalance = () => {
    return of({
      name: "John",
      lastname: "Doe",
      expense: 1000000,
      income: 20000,
      prevExpense: 8000,
      prevIncome: 15000,
      locale: "en-US",
      currency: "USD",
    });
  };
}

export default MockAccountApi;
