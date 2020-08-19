import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Paper,
	makeStyles,
	withStyles
} from '@material-ui/core';
import styles from './StatePicker.module.css';
import { fetchStateData } from '../../api';
import { getComparator, stableSort } from '../../utils/utils';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';

const override = css`
	display: block;
	margin: 5px auto;
	border-color: red;
`;

const useStyles = makeStyles((theme) => ({
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}));

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.grey,
		color: theme.palette.common.white
	},
	body: {
		fontSize: 14
	}
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover
		}
	}
}))(TableRow);

const StatePicker = () => {
	const classes = useStyles();
	const [ stateData, setStateData ] = useState([]);
	const [ orderBy, setOrderBy ] = useState('confirmedPersons');
	const [ order, setOrder ] = useState('desc');
	const [ loading, setLoading ] = useState('true');

	const columns = [
		{
			id: 'stateName',
			label: 'States',
			minWidth: 170,
			numeric: false,
			disablePadding: false
		},

		{
			id: 'confirmedPersons',
			label: 'Confirmed Cases',
			minWidth: 170,
			align: 'center',
			numeric: false,
			disablePadding: false
		},
		{
			id: 'activeCases',
			label: 'Active Cases',
			minWidth: 170,
			align: 'center',
			numeric: false,
			disablePadding: false
		},

		{
			id: 'recoveredPersons',
			label: 'Recovered Cases',
			minWidth: 170,
			align: 'center',
			numeric: false,
			disablePadding: false
		},

		{
			id: 'deathPatients',
			label: 'Deaths',
			minWidth: 170,
			align: 'center',
			numeric: false,
			disablePadding: false
		}
	];

	const fetchAPI = async () => {
		const fetchedData = await fetchStateData();
		setStateData(fetchedData);
	};

	useEffect(
		() => {
			fetchAPI();
			if (stateData) {
				setLoading(false);
			}
		},
		[ stateData ]
	);

	const handleSort = (property) => (event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const loadingCondition =
		stateData && !stateData.length ? (
			<TableRow>
				<TableCell align="center" colSpan={5}>
					<BeatLoader css={override} size={10} color={'#123abc'} loading={loading} />
				</TableCell>
			</TableRow>
		) : (
			stableSort(stateData, getComparator(order, orderBy)).map((states, index) => {
				return (
					<StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
						{columns.map((column) => {
							const value = states[column.id];
							return (
								<StyledTableCell key={column.id} align={column.align}>
									{value}
								</StyledTableCell>
							);
						})}
					</StyledTableRow>
				);
			})
		);

	return (
		<Paper className={styles.root}>
			<TableContainer className={styles.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((columns) => (
								<TableCell
									key={columns.id}
									align={columns.align}
									style={{ minWidth: columns.minWidth }}
									padding={columns.disablePadding ? 'none' : 'default'}
									sortDirection={orderBy === columns.id ? order : false}>
									<TableSortLabel
										active={orderBy === columns.id}
										direction={orderBy === columns.id ? order : 'asc'}
										onClick={handleSort(columns.id)}>
										{columns.label}
										{orderBy === columns.id ? (
											<span className={classes.visuallyHidden}>
												{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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

export default StatePicker;
