import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../../../lib/store/store'
import { initialState } from './initialState'
import { reducers } from './sliceReducers'

const sliceName = 'auth'
export const slice = createSlice({
  name: sliceName,
  initialState,
  reducers,
})
export const authActions = slice.actions

export const authSelector = (state: RootState) => state[sliceName]

export default slice.reducer
