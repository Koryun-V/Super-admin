import React from 'react';
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

// Регистрируем модули Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)


// Плагин для фона канвы
const backgroundColorPlugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#1a1c24'; // Цвет фона канвы
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    },
};

const Statistics = ({data}) => {
    console.log(data,"a")
    const lineChartData = {
        labels: data[0].statistics.map(item => item.interval),
        datasets: [
            {
                label: data[0].storeName,
                data:  data[0].statistics.map(item => item.totalRevenue),
                borderColor: "#00d143",
                backgroundColor: "#009a32",
                pointBackgroundColor:"#009a32",
                pointBorderColor:"#0a0a0d",
                pointBorderWidth:4,
                pointHoverBorderWidth:10,
                pointHoverBorderColor:"#009a32",
                pointHoverBackgroundColor:"#009a32",
                pointStyle: 'circle',
                pointRadius: 8,
                pointHoverRadius: 10,
                fill: {
                    target: "origin", // 3. Set the fill options
                    above: "rgba(0,255,5,0.3)"

                }
            },

        ]
    }
    const options = {
        // onHover: (event, chartElement) => {
        //     if (chartElement.length > 0) {
        //         event.native.target.style.cursor = 'pointer';
        //     } else {
        //         event.native.target.style.cursor = 'default';
        //     }
        // },
        maintainAspectRatio: false,
        // pointBorderWidth:10,
        responsive: true,
        layout: {
            padding: 50,
        },
        scales: {
            y: {
                grid: {
                    color: '#5d5f6b',
                },
                ticks: {
                    font:{
                        size: 16,
                    },
                    color: 'white',
                }
            },
            x: {

                grid: {
                    color: '#5d5f6b',
                },
                ticks: {
                    font:{
                        size: 16,
                    },
                    color: 'white',
                }
            },
        },
        plugins: {

            tooltip: {
                bodyFontSize: 14,
                padding:10,
                titleMarginLeft:4,
                boxPadding:10,
                titleFont:{
                    size:16,
                },
                bodyFont:{
                    size:14,
                }
            },
            custom_canvas_background_color: true, // включаем плагин
            legend: {

                labels: {
                    backdropPadding:10,
                    // This more specific font property overrides the global property
                    font: {
                        size: 20
                    }
                },
            }
        },
    };

    return (
        <div className="diagram">
            <Line options={options} data={lineChartData} plugins={[backgroundColorPlugin]} style={{
                borderRadius:5,

            }}/>
        </div>
    );
};

export default Statistics;
