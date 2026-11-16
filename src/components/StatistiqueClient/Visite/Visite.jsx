import React, { useEffect, useState } from "react";
import "./Visite.css";
// import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import imgSite from "../../../assets/imgSites/imgSite.svg";
// import { setcurrentSite, removecurrentSite } from "../../../redux/features/site";
// import { setStyleElement } from "../../../redux/features/editor";
// import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';
import { Doughnut,Line } from 'react-chartjs-2';
import "chartjs-plugin-doughnut-innertext";
import { faker } from '@faker-js/faker';
ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);


  
export default function Visite() {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom' ,
          },
          title: {
            //display: true,
           // text: 'Chart.js Line Chart',
          },
        },
      };
      
      const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'May', 'Jun', 'Jui','Aou','Sep','Oct','Nov','Dec'];
      
       const dataline = {
        labels,
        datasets: [
          {
            label: 'Nombre des visites',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
            borderColor:  'rgb(246 195 68)',
            backgroundColor:  'rgb(246 195 68)',
          },
          
        ],
      };
      const chartData = [20, 80];
     const showData = chartData[0] + "%";
    const data = {
        labels: ['Mobile', 'Desktop'],
        datasets: [
          {
            label: '',
            
            data: chartData,
            backgroundColor: [
              'rgb(246 195 68)',
              'rgb(53 53 53)',
            
            ],
            borderColor: [
                'rgb(246 195 68)',
              'rgb(53 53 53)',
             
            ],
            borderWidth: 1,
          },
        ],
        text:showData,
      };
      
  return (
  <div className="row" id="visite">
  <div className="col-8">
<Line options={options} data={dataline} />;
</div>
<div className="col-4">
<div className="pr-chart">
<div className='chart-number'>55%</div>
        <Doughnut
          data={data}
          
          options={{
            
            responsive: true,
            maintainAspectRatio: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
             // cornerRadius:6,
              labels: {
                usePointStyle: true,
                //boxWidth: 10,
                fontColor: '#474747',
               
                padding: 20
              },
            },
          },
         
            animation: {
              duration: 4000,
            },
            
          }}
        />
      </div>
</div>

</div> 
  
  );
}
