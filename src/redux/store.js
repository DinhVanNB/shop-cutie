import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import categoriesSlice from "./categoriesSlice";
import subCategoriesSlice from "./subCategoriesSlice";
import {persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version:1,
    storage
}
const rootReducers = combineReducers({
        cart: cartSlice,
        category: categoriesSlice,
        subCategory: subCategoriesSlice,
})

const persistedReducer = persistReducer(persistConfig,rootReducers )

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE,REGISTER]
            }
        })
    
})
export const persistor = persistStore(store);