import { Observable } from "rxjs";

type Reponse = {
  name: string;
  lastname: string;
  expense: number;
  income: number;
  prevExpense: number;
  prevIncome: number;
  locale: string;
  currency: string;
};

export interface AccountDataSource {
  getBalance: () => Observable<Reponse>;
}
