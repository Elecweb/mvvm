import { of } from "rxjs";
import { AccountDataSource } from "./AccountDataSource";

class LocalAccountApi implements AccountDataSource {
  getBalance = () => {
    const localData = localStorage.getItem("accountBalance");
    return of(localData ? JSON.parse(localData) : {});
  };
}

export default LocalAccountApi;
