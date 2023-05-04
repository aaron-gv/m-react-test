import { createSlice } from '@reduxjs/toolkit'

export const moviesStore = createSlice({
  name: 'movies',
  initialState: {
    value: [],
    loaded: false,
    loading: false
  },
  reducers: {
    load: (state, data) => {
      
      state.value = data.payload
      
      state.loaded = true
    },
    getMovies: (state) => {
      return state.value
    }
  },
})

export const { load, getMovies } = moviesStore.actions

export default moviesStore.reducer
