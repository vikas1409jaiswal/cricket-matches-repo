import { QueryClient, QueryClientProvider } from "react-query";
import { CricketMatchHomePage } from "./components/CricketMatchHomePage";
import { CricketFormat } from "./models/enums/CricketFormat";
import "./i18n";

import "./App.scss";

const client = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <CricketMatchHomePage format={CricketFormat.T20I} />
    </QueryClientProvider>
  );
};

export default App;
