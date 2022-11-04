import { combineReducers } from '@reduxjs/toolkit';
import ProductReducer from './product_reducer';
import CategoryReducer from './category_reducer';
import CartReducer from './cart_reducer';
import WalletReducer from './wallet_information';

export const rootReducer = combineReducers({
  product: ProductReducer,
  category: CategoryReducer,
  cart: CartReducer,
  wallet: WalletReducer
});

export type AppState = ReturnType<typeof rootReducer>;
