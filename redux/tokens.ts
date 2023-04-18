import { mainnetTokens } from '@/services/tokens/tokens'
import { iToken } from '@/types/token'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface tokensState {
  tokens: iToken[]
}

const initialState: tokensState = {
  tokens: mainnetTokens,
}

export const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    updateBalance: (
      state,
      action: PayloadAction<{
        newBalance: iToken[]
      }>
    ) => {},
    updatePrice: (state) => {},
    resetBalance: (state) => {},
  },
})

// Action creators are generated for each case reducer function
export const { updateBalance, updatePrice, resetBalance } = tokensSlice.actions

export default tokensSlice.reducer
