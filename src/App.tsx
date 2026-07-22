import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      {import.meta.env.DEV && (
        <Route path="/dashboard/*" element={<DashboardPage />} />
      )}
    </Routes>
  );
}

export default App;
