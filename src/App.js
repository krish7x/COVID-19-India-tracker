import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import Cards from './Components/Cards/Cards';
import { fetchIndiaData, fetchStateData, fetchTimeSeries } from './api';
import Charts from './Components/Charts/Charts';
import covid19 from './Images/covid19.png';
import StatePicker from './Components/StatePicker/StatePicker';
import DistrictTable from './Components/DistrictTable/DistrictTable';
import TimeSeries from './Components/TimeSeries/TimeSeries';

const App = () => {
	const [ indiaData, setIndiaData ] = useState({});
	const [ stateData, setStateData ] = useState([]);
	const [ deltaData, setDeltaData ] = useState({});

	const getIndiaData = async () => {
		const fetchData = await fetchIndiaData();
		setIndiaData(fetchData);
	};

	const getStateData = async () => {
		const fetchData = await fetchStateData();
		setStateData(fetchData);
	};

	const getTimeSeriesData = async () => {
		const fetchData = await fetchTimeSeries();
		setDeltaData(fetchData);
	};

	useEffect(() => {
		getIndiaData();
		getStateData();
		getTimeSeriesData();
	}, []);

	const { confirmed, recovered, deaths, date } = indiaData;

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>
				COVID-19 INDIA
				<img className={styles.covid} src={covid19} alt="covid" />
			</h1>
			<Cards confirmed={confirmed} recovered={recovered} deaths={deaths} date={date} deltaData={deltaData} />
			<Charts data={stateData} />
			<div className={styles.tables}>
				<StatePicker />
				<DistrictTable />
				<TimeSeries />
			</div>
		</div>
	);
};

export default App;
