import "./App.css";

import { BrowserRouter, Routes, Route , Link} from "react-router-dom";
import LoginPage from "./components/loginPage/loginPage";
import Navbar from "./components/Navbar/Navbar";
import BorrowLocker from "./components/scanQRPage/scanQRPage";
import LockerSelection from "./components/lockerSelection/lockerSelection";
import LockerDetail from "./components/lockerDetail/lockerDetail";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import Home from "./components/homePage/Home";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="borrow" element={<ProtectedRoutes><BorrowLocker /></ProtectedRoutes>} />
          <Route path="selection/:id" element={<ProtectedRoutes><LockerSelection /></ProtectedRoutes>} />
          <Route path="locker" element={<LockerDetail />} />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
