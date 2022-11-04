import { createSlice } from '@reduxjs/toolkit'

const WalletSlice = createSlice({
  name: 'wallet',
  initialState: {
    address: "",
    balance: 0,
  },
  reducers: {
    UPDATE_ADDRESS(state, action) {
      state.address = action.payload;
    },
    UPDATE_BALANCE(state, action){
        state.balance = action.payload;
    }
    
  }
})

export const { UPDATE_ADDRESS, UPDATE_BALANCE } = WalletSlice.actions

export default WalletSlice.reducer