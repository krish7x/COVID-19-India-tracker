import React, { useState, useEffect } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	makeStyles,
	TableSortLabel
} from '@material-ui/core';
import styles from './DistrictTable.module.css';
import { withStyles } from '@material-ui/core/styles';
import { fetchDistrictData } from '../../api';
import { getComparator, stableSort } from '../../utils/utils';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';

const override = css`
	display: block;
	margin: 5px auto;
	border-color: red;
`;

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

const DistrictTable = () => {
	const classes = useStyles();
	const [ districtData, setDistrictData ] = useState([]);
	const [ orderBy, setOrderBy ] = useState('confirmed');
	const [ order, setOrder ] = useState('desc');
	const [ loading, setLoading ] = useState('true');

	const columns = [
		{ id: 'name', label: 'Tamil Nadu', minWidth: 180 },

		{
			id: 'confirmed',
			label: 'Confirmed Cases',
			minWidth: 170,
			align: 'center'
		},
		{
			id: 'active',
			label: 'Active Cases',
			minWidth: 170,
			align: 'center'
		},

		{
			id: 'recovered',
			label: 'Recovered Cases',
			minWidth: 170,
			align: 'center'
		},

		{
			id: 'deaths',
			label: 'Deaths',
			minWidth: 170,
			align: 'center'
		}
	];

	const fetchAPI = async () => {
		const fetchData = await fetchDistrictData();
		setDistrictData(fetchData);
	};

	useEffect(
		() => {
			fetchAPI();
			if (districtData) {
				setLoading(false);
			}
		},
		[ districtData ]
	);

	const loadingCondition =
		districtData && !districtData.length ? (
			<TableRow>
				<TableCell align="center" colSpan={5}>
					<BeatLoader css={override} size={10} color={'#123abc'} loading={loading} />
				</TableCell>
			</TableRow>
		) : (
			stableSort(districtData, getComparator(order, orderBy)).map((data, index) => {
				return (
					<StyledTableRow hover role="checkbox" tabIndex={-1} key={index}>
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
			})
		);

	const handleSort = (property) => (event) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

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
									style={{ minWidth: columns.minWidth }}>
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

export default DistrictTable;
