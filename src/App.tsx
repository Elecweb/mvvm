import { BrowserRouter, Route } from "react-router-dom";
import MerchantPage1 from "./example/example1";
import MerchantPage2 from "./example/example2";
import MerchantPage3 from "./example/example3";
import MerchantPage4 from "./example/example4";
import MerchantPage5 from "./example/example5";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path="/" exact render={() => <p>Exanple</p>} />
        <Route path="/example1" component={MerchantPage1} />
        <Route path="/example2" component={MerchantPage2} />
        <Route path="/example3" component={MerchantPage3} />
        <Route path="/example4" component={MerchantPage4} />
        <Route path="/example5" component={MerchantPage5} />
      </BrowserRouter>
    </div>
  );
}

export default App;
