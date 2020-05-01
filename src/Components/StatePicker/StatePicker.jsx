import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Typography,
} from "@material-ui/core";
import styles from "./StatePicker.module.css";
import { fetchStateData } from "../../api";
import { getComparator, stableSort } from "../../utils/utils";

const StatePicker = () => {
	const [stateData, setStateData] = useState([]);
	const [orderBy, setOrderBy] = useState("confirmedPersons");
	const [order, setOrder] = useState("desc");

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

	const loadingCondition =
		stateData && !stateData.length ? (
			<TableRow>
				<TableCell align='center' colSpan={5}>
					<Typography variant='button' display='block' align='center'>
						Loading...
					</Typography>
				</TableCell>
			</TableRow>
		) : (
			stableSort(stateData, getComparator(order, orderBy)).map(
				(states, index) => {
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
				}
			)
		);

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
					<TableBody>{loadingCondition}</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};

export default StatePicker;
