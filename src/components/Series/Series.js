import { useSelector, useDispatch } from 'react-redux'
import { load } from 'store/seriesStore'
import React, { useState, useEffect } from 'react';
import Loading from 'components/Loading'
import SeriesList from './SeriesList'
import {compareByTitle} from 'common/utils'
import Pagination from 'components/Pagination/Pagination'
export default function Series() {
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loadingData, setLoadingData] = useState(false);
    const series = useSelector(state => state.series.value);
    const [fetchError, setFetchError] = useState(false);
    const dispatch = useDispatch()
    const [yearList, setYearList] = useState([]);
    const [selectedYear, setSelectedYear] = useState("0");
    const [filteredData, setFilteredData] = useState([]);
    const [pages, setPages] = useState(0);
    const itemsPerPage = 20;
    const [dataOffset, setDataOffset] = useState(0);
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

        //let serieArray = data.entries.filter(x => x.programType === 'series' && x.releaseYear >=2010)
        let serieArray = data.entries.filter(x => x.programType === 'series')
        //if (serieArray.length > 20) serieArray = serieArray.slice(0, 19)
        
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
        setPages(Math.ceil(data.length/20))
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
        <div className='overflow-hidden'>
            <div className=" bg-gradient-to-b from-slate-500 to-slate-700 text-white h-12 flex items-center drop-shadow-lg">
                <span className="ml-10">Series</span>
            </div>
            <div className="flex items-center justify-center p-2">
                <div>Filter by release year: </div>
                <div className='float-left ml-2'>
                    <select value={selectedYear} onChange={onChangeYearFilter} >
                        <option key={0} value="0">Any</option>
                        {
                            yearList.map(year => {
                                return <option key={year} value={year}>{year}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className='mt-2 w-full overflow-hidden'>
                {(loadingData || loadingInitial) ? <Loading /> : 
                    <div className='overflow-hidden'>
                        <div className="overflow-hidden">
                            <SeriesList series={filteredData.slice((dataOffset*20), (dataOffset*20)+itemsPerPage)} />
                        </div>
                        <Pagination pages={pages} itemsPerPage={itemsPerPage} current={dataOffset} action={(x) => setDataOffset(x)} />
                        
                    </div>
                }
            </div>
        </div>
    )

}