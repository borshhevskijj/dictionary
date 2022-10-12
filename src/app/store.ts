import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import InputValueReducer from "../slice/inputValueSlice"
import resultReducer from "../slice/resultSlice"

export const store = configureStore({
  reducer: {
    inputValue: InputValueReducer,
    result: resultReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
