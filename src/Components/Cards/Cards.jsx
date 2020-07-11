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

	const mapRecoveredDaily = timeSeriesData.map((data) => {
		return data.recoveredDaily;
	});

	let latestRecoveredDaily = mapRecoveredDaily[mapRecoveredDaily.length - 1];

	const mapDeathsDaily = timeSeriesData.map((data) => {
		return data.deathsDaily;
	});

	let latestDeathsDaily = mapDeathsDaily[mapDeathsDaily.length - 1];

	let latestActiveDaily = latestConfirmedDaily - latestRecoveredDaily;

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
			<Grid container spacing={4} justify='center'>
				<Grid
					item
					xs={10}
					md={4}
					component={Card}
					className={cx(styles.card, styles.infected)}>
					<CardContent>
						<Typography className={styles.iheading}>Total Cases</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp start={0} end={confirmed} duration={2} separator={","} />
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />

						<Delta inpCnt={latestConfirmedDaily} color='grey' size='med' />
					</CardContent>
				</Grid>
				<Grid
					item
					xs={10}
					md={4}
					component={Card}
					className={cx(styles.card, styles.active)}>
					<CardContent>
						<Typography className={styles.aheading}>Active Cases</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp
								start={0}
								end={confirmed - (recovered + deaths)}
								duration={2}
								separator={","}
							/>
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />

						<Delta inpCnt={latestActiveDaily} color='grey' size='med' />
					</CardContent>
				</Grid>

				<Grid
					item
					xs={10}
					md={4}
					component={Card}
					className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography className={styles.rheading}>Recovered Cases</Typography>
						<Typography color='textPrimary' variant='h4'>
							<CountUp start={0} end={recovered} duration={2} separator={","} />
						</Typography>
						<Typography color='textSecondary'>
							Last updated at {(date = new Date().toLocaleTimeString())}
						</Typography>

						<br />

						<Delta inpCnt={latestRecoveredDaily} color='green' size='med' />
					</CardContent>
				</Grid>
				<Grid
					item
					xs={10}
					md={4}
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

						<Delta inpCnt={latestDeathsDaily} color='red' size='med' />
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cards;
