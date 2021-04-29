import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchTimeSeries } from "../../api";

import styles from "./Charts.module.css";

const Charts = () => {
  const [indiaData, setIndiaData] = useState({});

  const fetchAPI = async () => {
    const fetchData = await fetchTimeSeries();

    let indexLength = fetchData.length - 90;
    let newData = fetchData.slice(Math.max(indexLength, 1));

    setIndiaData(newData);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const lineChart = indiaData[0] ? (
    <Line
      data={{
        labels: indiaData.map(({ date }) => date),
        pointHoverRadius: 5,
        color: "#ffff",

        datasets: [
          {
            data: indiaData.map((data) => data.confirmedDaily),
            label: "Infected",
            borderColor: "#3333ff",
            backgroundColor: "rgba(0, 0, 255, 0.6)",
            fill: true,
          },
          {
            data: indiaData.map(
              (data) =>
                data.confirmedDaily - (data.recoveredDaily + data.deathsDaily)
            ),
            label: "Active",
            borderColor: "#7FECFF",
            backgroundColor: "#7FECFF",
            fill: true,
          },
          {
            data: indiaData.map((data) => data.recoveredDaily),
            label: "Recovered",
            borderColor: "rgba(0,255,0,0.8)",
            backgroundColor: "rgba(0,255, 0, 0.6)",
            fill: true,
          },
          {
            data: indiaData.map((data) => data.deathsDaily),
            label: "Deaths",
            borderColor: "rgba(255,0,0,0.8)",
            backgroundColor: "rgba(255,0, 0, 0.6)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Charts;
