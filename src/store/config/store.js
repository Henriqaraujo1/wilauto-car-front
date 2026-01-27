import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";
import rootReducer from "../rootReducer";

// ** Importação das APIs do RTK Query** //
import { brandApi } from "../registers/brand/brand.api";
import { categoryApi } from "../registers/category/category.api";
import { dolarApi } from "../infoCompany/currencyCoin/currencyCoin.api";
import { deliveryApi } from "../registers/delivery/delivery.api";
import { clientApi } from "../registers/clients/clients.api";
import { employeeApi } from "../registers/employee/employee.api";
import { ibgeApi } from "../utils/ibge/ibge.api";
import { productApi } from "../registers/products/product.api";
import { providerApi } from "../registers/provider/provider.api";
import { receiveApi } from "../financial/receive/receive.api";
import { subCategoryApi } from "../registers/subCategory/subCategory.api";
import { subProductApi } from "../registers/subItems/subItems.api";
import { usersApi } from "../registers/users/users.api";
import { positionApi } from "../registers/workPosition/position.api";
import { moreSellApi } from "../financial/resumeMoreSells/resumeMoreSells.api";
import { stockNowApi } from "../stock/stockNow/stockNow.api";

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persisted: persistedReducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [dolarApi.reducerPath]: dolarApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [ibgeApi.reducerPath]: ibgeApi.reducer,
    [moreSellApi.reducerPath]: moreSellApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    [receiveApi.reducerPath]: receiveApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [subProductApi.reducerPath]: subProductApi.reducer,
    [stockNowApi.reducerPath]: stockNowApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      // desativa o middleware que está dando o warning
      brandApi.middleware,
      categoryApi.middleware,
      dolarApi.middleware,
      clientApi.middleware,
      deliveryApi.middleware,
      employeeApi.middleware,
      ibgeApi.middleware,
      moreSellApi.middleware,
      productApi.middleware,
      providerApi.middleware,
      receiveApi.middleware,
      subCategoryApi.middleware,
      subProductApi.middleware,
      stockNowApi.middleware,
      usersApi.middleware,
      positionApi.middleware
    ),
});

export default store;
