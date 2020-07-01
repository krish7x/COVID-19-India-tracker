import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Typography,
	TableSortLabel,
	makeStyles,
	TableRow,
	withStyles,
	Paper,
} from "@material-ui/core";
import styles from "./TimeSeries.module.css";
import { fetchTimeSeries } from "../../api";
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

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.grey,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const TimeSeries = () => {
	const classes = useStyles();
	const [timeSeriesData, setTimeSeriesData] = useState([]);
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("confirmed");

	const columns = [
		{ id: "date", label: "Dates", minWidth: 170 },

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

	const loadingCondition =
		timeSeriesData && !timeSeriesData.length ? (
			<TableRow>
				<TableCell align='center' colSpan={5}>
					<Typography variant='button' display='block' align='center'>
						Loading...
					</Typography>
				</TableCell>
			</TableRow>
		) : (
			stableSort(timeSeriesData, getComparator(order, orderBy)).map(
				(data, index) => {
					return (
						<StyledTableRow hover role='checkbox' tabIndex={-1} key={index}>
							{columns.map((column) => {
								const value = data[column.id];
								return (
									<StyledTableCell key={column.id} align={column.align}>
										{value}
									</StyledTableCell>
								);
							})}
						</StyledTableRow>
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
					<TableHead className={styles.header}>
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
												{order === "asc"
													? "sorted ascending"
													: "sorted descending"}
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

export default TimeSeries;
