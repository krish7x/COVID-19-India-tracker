import React, { useState, useEffect } from "react";
import styles from "./Cards.module.css";
import { Card, Grid, Typography, CardContent } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";
import Delta from "../Delta/Delta";
import { fetchTimeSeries } from "../../api";

const Cards = ({ confirmed, date, recovered, deaths }) => {
	const [timeSeriesData, setTimeSeriesData] = useState([]);

	const mapConfirmedDaily = timeSeriesData.map((data) => {
		return data.confirmedDaily;
	});

	let latestConfirmedDaily = mapConfirmedDaily[mapConfirmedDaily.length - 1];

	// const mapConfirmedTotal = timeSeriesData.map((data) => {
	// 	return data.confirmedTotal;
	// });

	// let latestConfirmedTotal = mapConfirmedTotal[mapConfirmedTotal.length - 1];

	const mapRecoveredDaily = timeSeriesData.map((data) => {
		return data.recoveredDaily;
	});

	let latestRecoveredDaily = mapRecoveredDaily[mapRecoveredDaily.length - 1];

	// const mapRecoveredTotal = timeSeriesData.map((data) => {
	// 	return data.recoveredTotal;
	// });

	// let latestRecoveredTotal = mapRecoveredTotal[mapRecoveredTotal.length - 1];

	const mapDeathsDaily = timeSeriesData.map((data) => {
		return data.deathsDaily;
	});

	let latestDeathsDaily = mapDeathsDaily[mapDeathsDaily.length - 1];

	// const mapDeathsTotal = timeSeriesData.map((data) => {
	// 	return data.deathsTotal;
	// });

	// let latestDeathsTotal = mapDeathsTotal[mapDeathsTotal.length - 1];

	const fetchAPI = async () => {
		const fetchData = await fetchTimeSeries();
		setTimeSeriesData(fetchData);
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	if (!confirmed) {
		return <h1 className={styles.loading}>Loadingg...</h1>;
	}

	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify='center'>
				<Grid
					item
					xs={12}
					md={3}
					component={Card}
					className={cx(styles.card, styles.infected)}>
					<CardContent>
						<Typography className={styles.iheading}>Infected People</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp start={0} end={confirmed} duration={2} separator={","} />
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />
						<Typography variant='body2'>
							No.of people infected by COVID-19
						</Typography>
						<br />
						<Delta inpCnt={latestConfirmedDaily} color='grey' size='med' />
					</CardContent>
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
					component={Card}
					className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography className={styles.rheading}>
							Recovered People
						</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp start={0} end={recovered} duration={2} separator={","} />
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />
						<Typography variant='body2'>
							No.of people recovered from COVID-19
						</Typography>
						<br />
						<Delta inpCnt={latestRecoveredDaily} color='green' size='med' />
					</CardContent>
				</Grid>
				<Grid
					item
					xs={12}
					md={3}
					component={Card}
					className={cx(styles.card, styles.deaths)}>
					<CardContent>
						<Typography color='error'>Deaths</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp start={0} end={deaths} duration={2} separator={","} />
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />

						<Typography variant='body2'>
							No.of people died by COVID-19
						</Typography>
						<br />
						<Delta inpCnt={latestDeathsDaily} color='red' size='med' />
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cards;
