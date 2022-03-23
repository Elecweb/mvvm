import Stat from "../../baseUI/Stat";
import useViewModel from "./viewModel";

const Account = () => {
  const { accountBalance } = useViewModel();

  if (!accountBalance) {
    return null;
  }

  const { expenseStat, incomeStat, totalStat, fullName } = accountBalance;

  return (
    <div className="px-11 pt-20 min-h-screen bg-gray-100">
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {fullName}
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <Stat
          title="Expense"
          changeType={expenseStat.changeType}
          currentValue={expenseStat.currentValue}
          prevValue={expenseStat.prevValue}
          change={expenseStat.change}
          changeStatus={expenseStat.changeStatus}
        />
        <Stat
          title="Income"
          changeType={incomeStat.changeType}
          currentValue={incomeStat.currentValue}
          prevValue={incomeStat.prevValue}
          change={incomeStat.change}
          changeStatus={incomeStat.changeStatus}
        />
        <Stat
          title="Total"
          changeType={totalStat.changeType}
          currentValue={totalStat.currentValue}
          prevValue={totalStat.prevValue}
          change={totalStat.change}
          changeStatus={totalStat.changeStatus}
        />
      </dl>
    </div>
  );
};

export default Account;
