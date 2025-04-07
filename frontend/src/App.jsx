import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./components/Pages/MainPage/MainPage";
import AdminRoutes from './admin/AdminRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
);
}

export default App;
