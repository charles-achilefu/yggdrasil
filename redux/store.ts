import { configureStore } from '@reduxjs/toolkit'
import { walletSlice } from './wallet'
import { tokensSlice } from './tokens'
import { notificationSlice } from './notification'

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    tokens: tokensSlice.reducer,
    notifcation: notificationSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
