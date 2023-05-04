import { useSelector, useDispatch } from 'react-redux'
import { load } from 'store/seriesStore'
import React, { useState, useEffect } from 'react';
import Loading from 'components/Loading'
import SeriesList from './SeriesList'
import {compareByTitle} from 'common/utils'

export default function Series() {
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const series = useSelector(state => state.series.value);
    const [fetchError, setFetchError] = useState(false);
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
    const fetchSeries = async () => {
        
        setLoadingData(true);
        let data = await fetchJson();

        let serieArray = data.entries.filter(x => x.programType === 'movie' && x.releaseYear >= 2010)
        if (serieArray.length > 20) serieArray = serieArray.slice(0, 19)
        serieArray = serieArray.sort(compareByTitle);
        let years = [...new Set(serieArray.map(item => item.releaseYear))]; 
        setYearList(years)
        dispatch(load(serieArray));
        setLoadingInitial(false)
        setLoadingData(false);
        
    }
    useEffect(() => {
        if (loadingInitial && !loadingData)
            fetchSeries()
    })    

    useEffect(() => {
        let data = series
        if (selectedYear !== "0")
            data = data.filter(x => x.releaseYear == selectedYear)
        
        setFilteredData(data)
    },[series, selectedYear])

    if (fetchError) 
        return (
            <div>
                <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                    <span className="ml-10">Series</span>
                </div>
                Oops, something went wrong.
            </div>
        )
    return (
        <div>
            <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                <span className="ml-10">Series</span>
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
                {(loadingData || loadingInitial) ? <Loading /> : <SeriesList series={filteredData} />}
            </div>
        </div>
    )

}