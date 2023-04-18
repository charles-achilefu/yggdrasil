import { configureStore } from '@reduxjs/toolkit'
import { walletSlice } from './wallet'
import { tokensSlice } from './tokens'

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    tokens: tokensSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
