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
import styles from "./StatePicker.module.css";
import { fetchStateData } from "../../api";

const StatePicker = () => {
	const [stateData, setStateData] = useState([]);

	const columns = [
		{ id: "stateName", label: "States", minWidth: 200 },

		{
			id: "confirmedPersons",
			label: "Confirmed Cases",
			minWidth: 170,
			align: "center",
		},

		{
			id: "recoveredPersons",
			label: "Recovered Cases",
			minWidth: 170,
			align: "center",
		},

		{
			id: "deathPatients",
			label: "Deaths",
			minWidth: 170,
			align: "center",
		},
	];

	const fetchAPI = async () => {
		const fetchedData = await fetchStateData();
		setStateData(fetchedData);
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<Paper className={styles.root}>
			<TableContainer className={styles.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
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
						{stateData.map((states, index) => {
							return (
								<TableRow hover role='checkbox' tabIndex={-1} key={index}>
									{columns.map((column) => {
										const value = states[column.id];
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

export default StatePicker;
