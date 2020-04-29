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
import styles from "./DistrictTable.module.css";
import { fetchDistrictData } from "../../api";

const DistrictTable = () => {
	const [districtData, setDistrictData] = useState([]);

	const columns = [
		{ id: "name", label: "Tamil Nadu", minWidth: 200 },

		{
			id: "confirmed",
			label: "Confirmed Cases",
			minWidth: 170,
			align: "center",
		},

		{
			id: "recovered",
			label: "Recovered Cases",
			minWidth: 170,
			align: "center",
		},

		{
			id: "deaths",
			label: "Deaths",
			minWidth: 170,
			align: "center",
		},
	];

	const loadingCondition =
		districtData && !districtData.length ? (
			<TableRow>
				<TableCell align='center' colSpan={5}>
					<Typography variant='button' display='block' align='center'>
						Loading...
					</Typography>
				</TableCell>
			</TableRow>
		) : (
			districtData.map((data, index) => {
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
			})
		);
	const fetchAPI = async () => {
		const fetchData = await fetchDistrictData();
		setDistrictData(fetchData);
	};

	useEffect(() => {
		fetchAPI();
	}, []);
	if (!districtData) {
		return <h1 className={styles.loading}>Loading..</h1>;
	}
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

export default DistrictTable;
