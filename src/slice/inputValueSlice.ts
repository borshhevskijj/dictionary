import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../app/store"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export interface InputValue {
  value: string
  status: null | "pending" | "fulfilled" | "rejected"
  error: null | string
}

const initialState: InputValue = {
  value: "",
  status: null,
  error: null,
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
