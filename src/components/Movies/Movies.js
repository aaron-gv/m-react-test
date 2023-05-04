import { useSelector, useDispatch } from 'react-redux'
import { load } from 'store/moviesStore'
import React, { useState, useEffect } from 'react';
import Loading from 'components/Loading'
import MoviesList from './MoviesList'
import {compareByTitle} from 'common/utils'

export default function Movies() {
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const [fetchError, setFetchError] = useState(false);
    const movies = useSelector(state => state.movies.value);
    const dispatch = useDispatch()
    const [yearList, setYearList] = useState([]);
    const [selectedYear, setSelectedYear] = useState("0");
    const [filteredData, setFilteredData] = useState([]);
    const onChangeYearFilter = event => {
        setSelectedYear(event.target.value)
    }
    const fetchJson = async () => {
        let data = null
        try {
            const response = await fetch('data/sample.json');
            data = await response.json();
        } catch (error) {
            setFetchError(true)
        }
        return data;
    }
    const fetchMovies = async () => {
        
        setLoadingData(true);
        let data = await fetchJson();
        
        let movieArray = data.entries.filter(x => x.programType === 'movie' && x.releaseYear >= 2010)
        if (movieArray.length > 20) movieArray = movieArray.slice(0, 19)
        movieArray = movieArray.sort(compareByTitle);
        let years = [...new Set(movieArray.map(item => item.releaseYear))]; 
        setYearList(years)
        dispatch(load(movieArray));
        setLoadingInitial(false)
        setLoadingData(false);
    }
    
    useEffect(() => {
        if (loadingInitial && !loadingData)
        fetchMovies()
    })
    useEffect(() => {
        let data = movies
        if (selectedYear !== "0")
            data = data.filter(x => x.releaseYear == selectedYear)
        
        setFilteredData(data)
    },[movies, selectedYear])
    if (fetchError) 
        return (
            <div>
                <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                    <span className="ml-10">Movies</span>
                </div>
                Oops, something went wrong.
            </div>
        )
    
    return (
        <div>
            <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                <span className="ml-10">Movies</span>
            </div>
            <div className="flex items-center justify-center p-2">
                <div>Filter by release year: </div>
                <div className='float-left ml-2'>
                    <select value={selectedYear} onChange={onChangeYearFilter} >
                        <option value="0">Any</option>
                        {
                            yearList.map(year => {
                                return <option value={year}>{year}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='mt-2'>
                {(loadingData || loadingInitial) ? <Loading /> : <MoviesList movies={filteredData} />}
            </div>
        </div>
    )

}