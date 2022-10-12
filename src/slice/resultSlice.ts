import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../app/store"
import axios, { AxiosError } from "axios"

export interface ResultValue {
  word: string
  phonetic: string
  phonetics: (
    | {
        text: string
        audio: string
      }
    | {
        text?: string
        audio?: undefined
      }
  )[]
  origin: string
  meanings: {
    partOfSpeech: string
    definitions: {
      definition: string
      example: string
      synonyms?: string[] | undefined
      antonyms?: string[] | undefined
    }[]
  }[]
}

export interface Result {
  value: ResultValue[]
  status: null | "pending" | "fulfilled" | "rejected"
  error: null | string
}

const url = (word: string) =>
  `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

export const fetchWord: any = createAsyncThunk(
  "result/fetchWord",
  async (word: string) => {
    const resp = await axios.get(url(word))

    if (!(resp.status.toString().at(0) === "2")) {
      throw new Error("something went wrong...")
    }
    const data = resp.data

    return data
  }
)

const initialState: Result = {
  value: [],
  status: null,
  error: null,
}

export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchWord.pending]: (state) => {
      state.status = "pending"
      state.error = null
    },
    [fetchWord.fulfilled]: (state, action) => {
      state.status = "fulfilled"
      state.value = action.payload
      state.error = null
    },
    [fetchWord.rejected]: (state) => {
      state.status = "rejected"
      state.error = "somthing wend wrong.."
    },
  },
})

// export const { setResult } = resultSlice.actions

export const selectResult = (state: RootState) => state.result.value
export const selectResultStatus = (state: RootState) => state.result.status
export const selectResultError = (state: RootState) => state.result.error

export default resultSlice.reducer
