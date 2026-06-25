import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutWithoutSubscribe from "./layout/LayoutWithoutSubscribe";
import LayoutWithSubscribe from "./layout/LayoutWithSubscribe";
import Herosection from "./pages/web-main/Herosection";
import Deals from "./pages/web-main/Deals";
import ProductSections from "./pages/web-main/ProductSections";
import SendQuery from "./pages/web-main/SendQuery";
import Recommended from "./pages/web-main/Recommended";
import ServicesAndRegion from "./pages/web-main/ServicesAndRegion";
import ProductBackendDetail from "./pages/web-detail/ProductBackendDetail";
import Products from "./pages/Products";
import "./App.css";
import MyCart from "./pages/web-cart/MyCart";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import MyProfile from "./pages/web-profile/MyProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutWithSubscribe />}>
          <Route
            path="/"
            element={
              <>
                <Herosection />
                <Deals />
                <ProductSections />
                <SendQuery />
                <Recommended />
                <ServicesAndRegion />
              </>
            }
          />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route element={<LayoutWithoutSubscribe />}>
          <Route path="/product/:id" element={<ProductBackendDetail />} />
          <Route path="/cart"
            element={
              <ProtectedRoute>
                <MyCart />
              </ProtectedRoute>
            }></Route>
          <Route path="/profile"
            element={<ProfilePage />}
          />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
        <Route path="/admin/add-product" element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        } />
        <Route path="/admin/edit-product/:id" element={
          <AdminRoute>
            <EditProduct />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;