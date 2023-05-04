import { createSlice } from '@reduxjs/toolkit'

export const seriesStore = createSlice({
  name: 'series',
  initialState: {
    value: [],
    loaded: false,
    loading: false
  },
  reducers: {
    load: (state, data) => {
      
      state.value = data.payload;

      state.loaded = true
    },
    getSeries: (state) => {
      return state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { load, getSeries } = seriesStore.actions

export default seriesStore.reducer
