import React, { Component } from "react";
import styles from "./App.module.css";
import Cards from "./Components/Cards/Cards";
import {
	fetchIndiaData,
	fetchStateData,
	fetchTimeSeries,
	fetchTNTotCnt,
	fetchDistrictData,
} from "./api";
import StatePicker from "./Components/StatePicker/StatePicker";
import TimeSeries from "./Components/TimeSeries/TimeSeries";
import Charts from "./Components/Charts/Charts";
import DistrictTable from "./Components/DistrictTable/DistrictTable";
import covid19 from "./Images/covid-19.jpg";

class App extends Component {
	state = {
		data: {},
		states: [],
		tamilNadu: [],
		deltaData: {},
		totalCount: [],
		districtData: [],
	};

	async componentDidMount() {
		const data = await fetchIndiaData();
		this.setState({ data });

		const fetchData = await fetchStateData();
		this.setState({ states: fetchData });

		const fetchTimeSeriesData = await fetchTimeSeries();
		this.setState({ deltaData: fetchTimeSeriesData });

		const totTNData = await fetchTNTotCnt();
		this.setState({ totalCount: totTNData });

		const fetchDistrictDdata = await fetchDistrictData();
		this.setState({ districtData: fetchDistrictDdata });
	}

	render() {
		const {
			data: { confirmed, recovered, deaths, date },
		} = this.state;

		return (
			<div className={styles.container}>
				<img src={covid19} alt='covid19' className={styles.image} />
				<Cards
					confirmed={confirmed}
					recovered={recovered}
					deaths={deaths}
					date={date}
					deltaData={this.state.deltaData}
				/>
				<Charts data={this.state.data} />
				<StatePicker onSort={this.onSort} />
				<DistrictTable />
				<TimeSeries />
			</div>
		);
	}
}

export default App;
