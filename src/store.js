import { configureStore } from '@reduxjs/toolkit'
import seriesStore from 'store/seriesStore'
import moviesStore from 'store/moviesStore'

export default configureStore({
  reducer: {
    series: seriesStore,
    movies: moviesStore
  },
})
