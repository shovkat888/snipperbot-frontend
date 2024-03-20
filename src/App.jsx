import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { config } from "./config";
import { ConnectPage, DashboardPage } from "./pages";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route exact path="/connect" element={<ConnectPage />} />
            <Route path="/" element={<DashboardPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
