import { useEffect, useState } from "react";
import Income from "../../account/example3/Income";
import Expense from "../../account/example3/Expense";
import Balance from "../../account/example3/Balance";
import ChangeAmount from "../../account/example3/ChangeAmount";
// import AccountRepository from "../../repository/AccountRepository";
import AccountRepository from "../../repository/example2/AccountRepository";
// import AccountAPI from "../../repository/AccountAPI";
import MockAccountApi from "../../repository/example2/MockAccountApi";
import LocalAccountApi from "../../repository/example2/LocalAccountApi";

const useViewModel = () => {
  const [income, setIncome] = useState<Income | null>(null);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const accountAPI = new LocalAccountApi();
    const accountRepository = new AccountRepository(accountAPI);

    const subscription = accountRepository.getBalance().subscribe((data) => {
      setIncome(data.income);
      setExpense(data.expense);
      setBalance(data.balance);
      setAccountName(data.accountName);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!balance || !expense || !income) {
    return {
      accountBalance: null,
    };
  }

  const mapChangeAmountToStat = (changeAmount: ChangeAmount) => {
    return {
      changeType: changeAmount.isIncrease() ? "positive" : "negative",
      currentValue: changeAmount.getCurrentAmount().getFormattedAmount(),
      prevValue: changeAmount.getPrevAmount().getFormattedAmount(),
      changeStatus: changeAmount.getChangeStatus(),
      change: changeAmount.getFormattedChange(),
    };
  };

  const expenseStat = mapChangeAmountToStat(expense);

  const incomeStat = mapChangeAmountToStat(income);

  const totalStat = mapChangeAmountToStat(balance);

  return {
    accountBalance: {
      fullName: accountName,
      incomeStat,
      expenseStat,
      totalStat,
    },
  };
};

export default useViewModel;
