import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../app/store"

export interface InputValue {
  value: string
}

const initialState: InputValue = {
  value: "",
}

export const inputValueSlice = createSlice({
  name: "inputValue",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setInputValue } = inputValueSlice.actions

export const selectInputValue = (state: RootState) => state.inputValue.value

export default inputValueSlice.reducer
