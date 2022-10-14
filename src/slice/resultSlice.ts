import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../app/store"
import axios from "axios"

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
  error: null | string[]
}

const url = (word: string) =>
  `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

export const fetchWord: any = createAsyncThunk(
  "result/fetchWord",
  async (word: string, { rejectWithValue }) => {
    try {
      const resp = await axios.get(url(word))
      if (!(resp.status >= 200 && resp.status < 300)) {
        throw new Error()
      }
      const data = resp.data
      return data
    } catch (error: any) {
      return rejectWithValue([error.message, error.response.data.message])
    }
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
    [fetchWord.rejected]: (state, action) => {
      state.status = "rejected"
      state.error = action.payload
    },
  },
})

// export const { setResult } = resultSlice.actions

export const selectResult = (state: RootState) => state.result.value
export const selectResultStatus = (state: RootState) => state.result.status
export const selectResultError = (state: RootState) => state.result.error

export default resultSlice.reducer
