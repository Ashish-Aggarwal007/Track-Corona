import React, { useState, useEffect} from 'react';
import { Line,Polar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  // const barChart = (
  //   confirmed ? (
  //     <Bar
  //       data={{
  //         labels: ['Infected', 'Recovered', 'Deaths'],
  //         datasets: [
  //           {
  //             label: 'People',
  //             backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
  //             data: [confirmed.value, recovered.value, deaths.value],
  //           },
  //         ],
  //       }}
  //       options={{
  //         legend: { display: false },
  //         title: { display: true, text: `Current state in ${country}` },
  //       }}
  //     />
  //   ) : null
  // );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels:  dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            lineTension: 0.1,
		      	borderDashOffset: 0.0,
			      backgroundColor: '#3333ff',
			      borderColor: 'rgba(75,192,192,1)',
            borderJoinStyle : 'miter',
            borderCapStyle: 'butt',
            pointBorderColor: '3333ff',
            pointBackgroundColor: '#3333ff',
            pointHoverBackgroundColor: '#3333ff',
            pointHoverBorderColor: '#3333ff',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
			      pointHitRadius: 10,
            fill: false,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            lineTension: 0.1,
		      	borderDashOffset: 0.0,
			      backgroundColor: '#FD9B9C',
			      borderColor: 'red',
            borderJoinStyle : 'miter',
            borderCapStyle: 'butt',
            pointBorderColor: '#FD9B9C',
            pointBackgroundColor: 'rgb(159, 75, 111)',
            pointHoverBackgroundColor: 'rgb(159, 75, 111)',
            pointHoverBorderColor: 'rgb(159, 75, 111)',
            pointHoverBorderWidth: 2,
            pointRadius: 3,
			      pointHitRadius: 10,
          
            //backgroundColor: 'rgba(255, 0, 0, 0.5)',          // change 
            fill: false,
          },
          ],
        }}
      />
    ) : null
  );
// Polar Area Chart or Pie chart   
const PolarChart = (
  confirmed ? (
    <Pie
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            label: 'People',
            data: [confirmed.value, recovered.value, deaths.value],
            //backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
            backgroundColor: ['#36A2EB', '#02AC30', '#9F3636'],
            //backgroundColor : ['#36A2EB', '#03D23B', '#000000'], #028526
			      hoverBackgroundColor: ['#A2C8EB', '#03D23B', 'rgba(255, 0, 0, 0.5)']
            
          },
        ],
      }}
      // options={{
      //   legend: { display: false },
      //   title: { display: true, text: `Current state in ${country}` },
      // }}
    />
  ) : null
);




  return (
    <div className={styles.container}>
      {country ? PolarChart : lineChart}
    </div>
  );
};

export default Chart;
