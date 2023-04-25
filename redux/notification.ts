import { iNotification } from '@/types/notification'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface notificationState {
  notification: iNotification | undefined
}

const initialState: notificationState = {
  notification: undefined,
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<iNotification | undefined>
    ) => {
      state.notification = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions

export default notificationSlice.reducer
