import { combineReducers } from "redux";
import allProviderSlice from "./registers/provider/provider.reducers";
import authSlice from "./auth/auth.reducers";
import brandSlice from "./registers/brand/brand.reducers";
import budgetSlice from "./budget/budget.reducers";
import cashierSlice from "./financial/cashier/cashier.reducers";
import clientSlice from "./registers/clients/clients.reducers";
import comissionSlice from "./financial/comission/comission.reducers";
import employeeSlice from "./registers/employee/employee.reducers";
import expenseSlice from "./financial/expense/expense.reducers";
import finishOrderSlice from "./commercial/finishOrder.reducers";
import homeSlice from "./home/home.reducers";
import infoExpenseSlice from "./infoCompany/expense/expense.reducers";
import infoInvoiceSlice from "./infoCompany/invoice/invoice.reducers";
import infoProfitSlice from "./infoCompany/profit/profit.reducers";
import infoStockSlice from "./infoCompany/stock/infoStock.reducers";
import itemEntryStockSlice from "./stock/itemEntryStock/newItemStock.reducer";
import itemOutStockSlice from "./stock/ItemOutStock/itemOut.reducer";
import productSlice from "./registers/products/products.reducers";
import resumeClientSlice from "./financial/resumeClient/resumeClient.reducers";
import resumeEntryOrders from "./financial/resumeEntryOrders/resumeEntryOrders.reducer";
import resumeFinancialSlice from "./financial/resumeFinancial/resumeFinancial.reducer";
import resumeProvidersSlice from "./financial/resumeProviders/resumeProviders.reducer";
import stockNowSlice from "./stock/stockNow/stockNow.reducers";
import usersSlice from "./registers/users/user.reducers";
import whatsappSlice from "./whatsapp/whatsapp.reducers";
import { receiveApi } from "./financial/receive/receive.api";

export default combineReducers({
  auth: authSlice,
  brand: brandSlice,
  budget: budgetSlice,
  cashier: cashierSlice,
  clients: clientSlice,
  commercial: finishOrderSlice,
  comission: comissionSlice,
  entryOrders: resumeEntryOrders,
  employee: employeeSlice,
  expense: expenseSlice,
  home: homeSlice,
  itemEntryStock: itemEntryStockSlice,
  itemOutStock: itemOutStockSlice,
  infoExpense: infoExpenseSlice,
  infoInvoice: infoInvoiceSlice,
  infoProfit: infoProfitSlice,
  infoStock: infoStockSlice,
  products: productSlice,
  providers: allProviderSlice,
  receicer: receiveApi,
  resumeClient: resumeClientSlice,
  resumeFinancial: resumeFinancialSlice,
  resumeProviders: resumeProvidersSlice,
  stockNow: stockNowSlice,
  users: usersSlice,
  whatsapp: whatsappSlice,
});
