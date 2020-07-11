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
import Charts from "./Components/Charts/Charts";
import covid19 from "./Images/covid19.png";
import StatePicker from "./Components/StatePicker/StatePicker";
import DistrictTable from "./Components/DistrictTable/DistrictTable";
import TimeSeries from "./Components/TimeSeries/TimeSeries";

class App extends Component {
	state = {
		data: {},
		states: [],
		tamilNadu: [],
		deltaData: {},
		totalCount: [],
		districtData: [],
		stateName: [],
		newData: [],
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

	onChangeHandler = async (state) => {
		this.setState({ stateName: state });
	};

	render() {
		const {
			data: { confirmed, recovered, deaths, date },
		} = this.state;

		return (
			<div className={styles.container}>
				<h1 className={styles.heading}>
					COVID-19 INDIA
					<img className={styles.covid} src={covid19} alt='covid' />
				</h1>
				<Cards
					confirmed={confirmed}
					recovered={recovered}
					deaths={deaths}
					date={date}
					deltaData={this.state.deltaData}
				/>
				<Charts data={this.state.data} />
				<StatePicker />
				<DistrictTable />
				<TimeSeries />
			</div>
		);
	}
}

export default App;
