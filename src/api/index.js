import axios from "axios";

const url = "https://api.rootnet.in/covid19-in/stats/latest/";

export const fetchIndiaData = async () => {
  try {
    const {
      data: { data },
    } = await axios.get(url);

    const modifiedData = {
      confirmed: parseInt(data.summary.total),
      recovered: parseInt(data.summary.discharged),
      deaths: parseInt(data.summary.deaths),
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
        activeCases: data.totalConfirmed - (data.discharged + data.deaths),
        deathPatients: data.deaths,
      };
    });

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

const districtURL = "https://api.covid19india.org/v2/state_district_wise.json";

export const fetchDistrictData = async () => {
  try {
    const { data } = await axios.get(districtURL);

    const state = data[32];
    const modifiedData = state.districtData.map((data) => {
      return {
        name: data.district,
        confirmed: data.confirmed,
        active: data.active,
        recovered: data.recovered,
        deaths: data.deceased,
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
