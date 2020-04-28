import axios from "axios";

const url = "https://api.rootnet.in/covid19-in/stats/latest/";

export const fetchIndiaData = async () => {
	try {
		const {
			data: { data },
		} = await axios.get(url);

		const modifiedData = {
			confirmed: data.summary.total,
			recovered: data.summary.discharged,
			deaths: data.summary.deaths,
			date: data.lastRefreshed,
		};
		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};

const stateURL = "https://api.rootnet.in/covid19-in/stats/latest";

export const fetchStateData = async () => {
	try {
		const {
			data: {
				data: { regional },
			},
		} = await axios.get(stateURL);

		const modifiedData = regional.map((data) => {
			return {
				stateName: data.loc,
				confirmedPersons: data.totalConfirmed,
				recoveredPersons: data.discharged,
				deathPatients: data.deaths,
			};
		});

		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};

const districtURL =
	"https://services9.arcgis.com/HwXIp55hAoiv6DE9/ArcGIS/rest/services/District_Wise_Covid_19_Status_view/FeatureServer/0/query";

export const fetchDistrictData = async () => {
	try {
		const {
			data: { features },
		} = await axios.get(
			`${districtURL}?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=standard&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=Name%2C+Positive_Cases%2C+Active_Cases%2C+Recovered%2C+Death%2C+Last_Updated_Date&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=json&token=`
		);

		const modifiedData = features.map((data) => {
			return {
				name: data.attributes.Name,
				confirmed: parseInt(data.attributes.Positive_Cases),
				recovered: parseInt(data.attributes.Recovered),
				deaths: parseInt(data.attributes.Death),
				lastUpdated: new Date(
					data.attributes.Last_Updated_Date
				).toLocaleString(),
			};
		});

		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};

const timeSeriesURL = "https://api.covid19india.org/data.json";

export const fetchTimeSeries = async () => {
	try {
		const {
			data: { cases_time_series },
		} = await axios.get(timeSeriesURL);

		const modifiedData = cases_time_series.map((data) => {
			return {
				date: data.date,
				confirmedDaily: parseInt(data.dailyconfirmed),
				recoveredDaily: parseInt(data.dailyrecovered),
				deathsDaily: parseInt(data.dailydeceased),
				confirmedTotal: parseInt(data.totalconfirmed),
				recoveredTotal: parseInt(data.totalrecovered),
				deathsTotal: parseInt(data.totaldeceased),
			};
		});

		return modifiedData;
	} catch (error) {
		console.log(error);
	}
};

export const fetchTNTotCnt = async () => {
	try {
		const {
			data: { statewise },
		} = await axios.get(timeSeriesURL);
		const {
			confirmed,
			recovered,
			deaths,
			deltaconfirmed,
			deltadeaths,
			deltarecovered,
		} = statewise.find((a, b) => a.state === "Tamil Nadu");
		return {
			confirmed: { value: parseInt(confirmed) },
			recovered: { value: parseInt(recovered) },
			deaths: { value: parseInt(deaths) },
			deltaconfirmed: parseInt(deltaconfirmed),
			deltarecovered: parseInt(deltarecovered),
			deltadeaths: parseInt(deltadeaths),
		};
	} catch (error) {
		console.log("fetchTNTotCnt -> error", error);
	}
};
