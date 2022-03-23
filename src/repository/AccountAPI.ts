import Rxios from "./Rxios";

class AccountAPI {
  http: Rxios;

  constructor() {
    this.http = new Rxios({
      // process.env["NX_API_URL"]
      baseURL: "https://encn5jjn27gslz5.m.pipedream.net",
    });
  }

  getBalance = () => {
    return this.http.get<{
      name: string;
      lastname: string;
      expense: number;
      income: number;
      prevExpense: number;
      prevIncome: number;
      locale: string;
      currency: string;
    }>("/");
  };
}

export default AccountAPI;
