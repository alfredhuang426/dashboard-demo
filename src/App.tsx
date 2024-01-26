import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login/Login";
import { Dashboard } from "./pages/admin/Dashboard";
import { AdminProducts } from "./pages/admin/adminPages/AdminProducts/AdminProducts";
import { AdminCoupons } from "./pages/admin/adminPages/AdminCoupons/AdminCoupons";
import { AdminOrders } from "./pages/admin/adminPages/AdminOrders/AdminOrders";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />}></Route>
          <Route path="coupons" element={<AdminCoupons />}></Route>
          <Route path="orders" element={<AdminOrders />}></Route>
        </Route>
        <Route path="*" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
