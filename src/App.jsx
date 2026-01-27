import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { getTheme } from "./variable";

import { useDispatch } from "react-redux";
import PrivateRoute from "./routes/PrivateRouter/PrivateRouter";

import Home from "./pages/Home/Home";
import Commercial from "./pages/Commercial/Commercial";
import MoreSell from "./pages/MoreSells/MoreSell";
import Welcome from "./pages/Welcome/Welcome";
import ResumeFinancial from "./pages/ResumeFinancial/ResumeFinancial";
import FinancialEntryOrders from "./pages/FinancialEntryOrders/FinancialEntryOrders";
import Cashier from "./pages/Cashier/Cashier";
import Stock from "./pages/Stock/Stock";

import ProviderRegister from "./pages/ProviderRegister/ProviderRegister";
import ClienteRegister from "./pages/ClientRegister/ClientRegister";
import ProductRegister from "./pages/ProductRegister/ProductRegister";
import UserRegister from "./pages/UserRegister/UserRegister";
import BrandRegister from "./pages/BrandRegister/BrandRegister";
import ExpenseRegister from "./pages/Expense/ExpenseRegister";
import EmployeeRegister from "./pages/EmployeeRegister/EmployeeRegister";
import PrintProducts from "./pages/PrintPages/PrintProducts/PrintProducts";
import PrintClients from "./pages/PrintPages/PrintClients/PrintClients";
import PrintProviders from "./pages/PrintPages/PrintProviders/PrintProviders";
import PrintOrdersByClient from "./pages/PrintPages/PrintOrdersByClients/PrintOrdersByClients";
import ProductSubItems from "./pages/ProductSubItems/ProductSubItems";
import PrintOrdersByProvider from "./pages/PrintPages/PrintOrdersByProvider/PrintOrdersByProvider";

import FinishOrder from "./pages/FinishOrder/FinishOrder";
import StockItem from "./pages/StockItem/StockItem";
import NoPermission from "./pages/NoPermission/NoPermission";
import UserAccount from "./pages/UserAccount/UserAccount";
// import { AuthProvider } from "./services/routes/authenticate/auth";

import StockOut from "./pages/StockOut/StockOut";
// import StockDevolution from "./pages/StockDevolution/StockDevolution"
import ResumeProvider from "./pages/ResumeProvider/ResumeProvider";
import ResumeClients from "./pages/ResumeClients/ResumeClients";
import HistoricStock from "./pages/HistoricStock/HistoricStock";

import { checkUserStatus } from "./store/auth/auth.actions";
import { useEffect } from "react";
import DeliveryRegister from "./pages/DeliveryRegister/DeliveryRegister";
import CategoryRegister from "./pages/CategoryRegister/CategoryRegister";
import { persistor } from "./store/config/persistor";

import ResumeInvoice from "./pages/ResumeInvoice/ResumeInvoice";
import ResumeExpense from "./pages/ResumeExpense/ResumeExpense";
import ResumeProfits from "./pages/ResumeProfits/ResumeProfits";
import ResumeStock from "./pages/ResumeStock/ResumeStock";
import PriceTag from "./pages/PriceTag/PriceTag";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Comissions from "./pages/Comissions/Comissions";
import PositionRegister from "./pages/WorkPositionRegister/WorkPositionRegister";
import ResumeComission from "./pages/ResumeComission/ResumeComission";
import ResumeSells from "./pages/ResumeSells/ResumeSell";
import WhatsappConfig from "./pages/WhatsappConfig/WhatsappConfig";
import ResumeBudgets from "./pages/Budgets/Budgets";
import DolarInfo from "./pages/DolarInfo/DolarInfo";
import PrintStock from "./pages/PrintPages/PrintStock/PrintStock";

function App() {
  const dispatch = useDispatch();

  const fontSize = localStorage.getItem("fontSize");

  useEffect(() => {
    async function isLoggedIn() {
      const test = await dispatch(checkUserStatus());
      console.log(test)
    }
    isLoggedIn();
  }, [dispatch]);

  useEffect(() => {
    // Define o título da página dinamicamente
    document.title = import.meta.env.VITE_PAGE_TITLE || "Título Padrão";
  }, []);

  return (
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={getTheme(fontSize + "px")}>
          <Routes>
            {/* Rotas Publicas*/}
            <Route path="/" element={<Welcome />} />
            <Route path="/not-permission" element={<NoPermission />} />

            {/* Rotas Privadas */}
            <Route
              path="/home"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/comercial"
              element={
                <PrivateRoute requiredPermissions={[1, 5]}>
                  <Commercial />
                </PrivateRoute>
              }
            />
            <Route
              path="/comercial/more-sell"
              element={
                <PrivateRoute requiredPermissions={[1, 5]}>
                  <MoreSell />
                </PrivateRoute>
              }
            />
            <Route
              path="/comercial/end-ord"
              element={
                <PrivateRoute requiredPermissions={[1, 5]}>
                  <FinishOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/comercial/budget"
              element={
                <PrivateRoute requiredPermissions={[1, 5]}>
                  <ResumeBudgets />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <ResumeFinancial />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/resume-sell"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <ResumeSells />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/resume-sell/print-orders"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <PrintOrdersByClient />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/financial-entry-order"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <FinancialEntryOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/resume-clients"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <ResumeClients />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/financial-entry-order/resume-provider"
              element={
                <PrivateRoute requiredPermissions={[2, 5]}>
                  <ResumeProvider />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/comission"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <Comissions />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/comission/resume-comission"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <ResumeComission />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/cashier"
              element={
                <PrivateRoute requiredPermissions={[2, 5, 6, 7]}>
                  <Cashier />
                </PrivateRoute>
              }
            />
            <Route
              path="/financial/debits"
              element={
                <PrivateRoute requiredPermissions={[2, 5, 7]}>
                  <ExpenseRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <PrivateRoute requiredPermissions={[3, 5]}>
                  <Stock />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/historic-stock"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <HistoricStock />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/stock-item"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <StockItem />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/stock-out"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <StockOut />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/etiquetas"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <PriceTag />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/details"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <DetailProduct />
                </PrivateRoute>
              }
            />
            <Route
              path="/stock/print-stock"
              element={
                <PrivateRoute requiredPermissions={[8, 5]}>
                  <PrintStock />
                </PrivateRoute>
              }
            />

            {/* <Route 
          path="/stock/stock-devolution"
          element={
            <PrivateRoute>
              <StockDevolution />
            </PrivateRoute>
          }
        /> */}
            <Route
              path="/new-client"
              element={
                <PrivateRoute requiredPermissions={[4, 5]}>
                  <ClienteRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-client/print-clients"
              element={
                <PrivateRoute requiredPermissions={[9, 5]}>
                  <PrintClients />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-product"
              element={
                <PrivateRoute requiredPermissions={[9, 5]}>
                  <ProductRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-product/sub-items"
              element={
                <PrivateRoute requiredPermissions={[9, 5]}>
                  <ProductSubItems />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-product/print-products"
              element={
                <PrivateRoute requiredPermissions={[9, 5]}>
                  <PrintProducts />
                </PrivateRoute>
              }
            />

            <Route
              path="/new-user"
              element={
                <PrivateRoute requiredPermissions={[5, 9]}>
                  <UserRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-employee"
              element={
                <PrivateRoute requiredPermissions={[5, 9]}>
                  <EmployeeRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-position"
              element={
                <PrivateRoute requiredPermissions={[5, 9]}>
                  <PositionRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-brand"
              element={
                <PrivateRoute requiredPermissions={[11, 5]}>
                  <BrandRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-delivery"
              element={
                <PrivateRoute requiredPermissions={[12, 5]}>
                  <DeliveryRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-category"
              element={
                <PrivateRoute requiredPermissions={[13, 5]}>
                  <CategoryRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-provider"
              element={
                <PrivateRoute requiredPermissions={[10, 5]}>
                  <ProviderRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/new-provider/print-providers"
              element={
                <PrivateRoute requiredPermissions={[10, 5]}>
                  <PrintProviders />
                </PrivateRoute>
              }
            />
            <Route
              path="/resume/invoice"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <ResumeInvoice />
                </PrivateRoute>
              }
            />
            <Route
              path="/resume/expense"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <ResumeExpense />
                </PrivateRoute>
              }
            />
            <Route
              path="/resume/profits"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <ResumeProfits />
                </PrivateRoute>
              }
            />
            <Route
              path="/resume/stock"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <ResumeStock />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute requiredPermissions={[5]}>
                  <UserRegister />
                </PrivateRoute>
              }
            />
            <Route
              path="/config-whatsapp"
              element={
                <PrivateRoute
                  requiredPermissions={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                  ]}
                >
                  <WhatsappConfig />
                </PrivateRoute>
              }
            />
            <Route
              path="/user-account"
              element={
                <PrivateRoute
                  requiredPermissions={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                  ]}
                >
                  <UserAccount />
                </PrivateRoute>
              }
            />
            <Route
              path="/config-dolar"
              element={
                <PrivateRoute
                  requiredPermissions={[
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                  ]}
                >
                  <DolarInfo />
                </PrivateRoute>
              }
            />
          </Routes>
        </ThemeProvider>
      </PersistGate>
    </Router>
  );
}

export default App;
