import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	makeStyles,
	TableSortLabel,
	Typography,
} from "@material-ui/core";
import styles from "./DistrictTable.module.css";
import { fetchDistrictData } from "../../api";
import { getComparator, stableSort } from "../../utils/utils";

const useStyles = makeStyles((theme) => ({
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1,
	},
}));

const DistrictTable = () => {
	const classes = useStyles();
	const [districtData, setDistrictData] = useState([]);
	const [orderBy, setOrderBy] = useState("confirmed");
	const [order, setOrder] = useState("desc");

	const columns = [
		{ id: "name", label: "Tamil Nadu", minWidth: 200 },

		{
			id: "confirmed",
			label: "Confirmed Cases",
			minWidth: 170,
			align: "center",
		},
		{
			id: "active",
			label: "Active Cases",
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
			stableSort(districtData, getComparator(order, orderBy)).map(
				(data, index) => {
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
				}
			)
		);

	const handleSort = (property) => (event) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	return (
		<Paper className={styles.root}>
			<TableContainer className={styles.container}>
				<Table stickyHeader aria-label='sticky table'>
					<TableHead>
						<TableRow>
							{columns.map((columns) => (
								<TableCell
									key={columns.id}
									align={columns.align}
									style={{ minWidth: columns.minWidth }}>
									<TableSortLabel
										active={orderBy === columns.id}
										direction={orderBy === columns.id ? order : "asc"}
										onClick={handleSort(columns.id)}>
										{columns.label}
										{orderBy === columns.id ? (
											<span className={classes.visuallyHidden}>
												{order === "desc"
													? "sorted descending"
													: "sorted ascending"}
											</span>
										) : null}
									</TableSortLabel>
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
