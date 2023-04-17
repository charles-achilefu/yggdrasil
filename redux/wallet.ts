import { ConnectionWallets, walletAddresses } from '@/types/wallet'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface walletState {
  type?: ConnectionWallets
  address?: walletAddresses
}

const initialState: walletState = {}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    addWallet(
      state,
      action: PayloadAction<{
        address: walletAddresses
        type: ConnectionWallets
      }>
    ) {
      state.type = action.payload.type
      state.address = action.payload.address
    },
    removeWallet(state) {
      state = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { addWallet, removeWallet } = walletSlice.actions

export default walletSlice.reducer
