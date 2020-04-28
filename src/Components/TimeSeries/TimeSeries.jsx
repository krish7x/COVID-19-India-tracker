import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@material-ui/core";
import styles from "./TimeSeries.module.css";
import { fetchTimeSeries } from "../../api";

const TimeSeries = () => {
	const [timeSeriesData, setTimeSeriesData] = useState([]);

	const columns = [
		{ id: "date", label: "Dates", minWidth: 200 },

		{
			id: "confirmedDaily",
			label: "Confirmed",
			minWidth: 140,
			align: "center",
		},

		{
			id: "confirmedTotal",
			label: "Total Confirmed",
			minWidth: 140,
			align: "center",
		},

		{
			id: "recoveredDaily",
			label: "Recovered",
			minWidth: 140,
			align: "center",
		},

		{
			id: "recoveredTotal",
			label: "Total Recovered",
			minWidth: 140,
			align: "center",
		},

		{
			id: "deathsDaily",
			label: "Deaths",
			minWidth: 140,
			align: "center",
		},

		{
			id: "deathsTotal",
			label: "Total Deaths",
			minWidth: 140,
			align: "center",
		},
	];

	const fetchAPI = async () => {
		const fetchData = await fetchTimeSeries();
		setTimeSeriesData(fetchData);
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<Paper className={styles.root}>
			<TableContainer className={styles.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead className={styles.header}>
						<TableRow>
							{columns.map((states) => (
								<TableCell
									key={states.id}
									align={states.align}
									style={{ minWidth: states.minWidth }}>
									{states.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{timeSeriesData.map((data, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map((column) => {
										const value = data[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default TimeSeries;
