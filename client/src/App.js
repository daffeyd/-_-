import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Account from "./components/Account/account";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import BorrowLocker from "./components/BorrowLocker/BorrowLocker";
import LockerSelection from "./components/lockerSelection/lockerSelection";
import LockerDetail from "./components/lockerDetail/lockerDetail";
import ProtectedRoutes from "./Services/ProtectedRoutes";
import Home from "./components/Home/Home";


function App() {

  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path="borrow" element={<ProtectedRoutes><BorrowLocker /></ProtectedRoutes>} />
          <Route path="locker" element={<ProtectedRoutes><LockerDetail /></ProtectedRoutes>} />

          <Route path="register" element={<Register />} />
          <Route path="login" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
