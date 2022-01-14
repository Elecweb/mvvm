import Stat from "../../baseUI/Stat";

const Account = () => {
  return (
    <div className="px-11 pt-20 min-h-screen bg-gray-100">
      <h3 className="text-lg leading-6 font-medium text-gray-900">John Doe</h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <Stat
          title="Expense"
          changeType="increase"
          currentValue={"300"}
          prevValue="200"
          change="30%"
          changeStatus="positive"
        />
        <Stat
          title="Income"
          changeType="decrease"
          currentValue="300"
          prevValue="200"
          change="30%"
          changeStatus="nagative"
        />
        <Stat
          title="Total"
          changeType="increase"
          currentValue="300"
          prevValue="200"
          change="30%"
          changeStatus="nagative"
        />
      </dl>
    </div>
  );
};

export default Account;
