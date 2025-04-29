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
import {lineChartData} from "./Data";

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

const colors = [
    { border: 'red', fill: 'rgba(255,255,255,0.63)' },
    { border: 'blue', fill: 'rgba(255,233,0,0.65)' },
    { border: 'green', fill: 'rgba(246,173,85,0.3)' },
    { border: '#ed64a6', fill: 'rgba(237,100,166,0.3)' },
    { border: '#38b2ac', fill: 'rgba(56,178,172,0.3)' },
];
const StatisticsAll = ({data}) => {
    const allDates = Array.from(new Set(
        data.flatMap(store => store.statistics.map(stat => stat.interval))
    )).sort();



    const lineChartData = {
        labels: allDates,
        datasets: data.map((store, index) => {
            const color = colors[index % colors.length];
            const revenueByDate = allDates.map(date => {
                const stat = store.statistics.find(s => s.interval === date);
                return stat ? stat.totalRevenue : 0;
            });

            return {
                label:store.storeName.charAt(0).toUpperCase() + store.storeName.slice(1),
                data: revenueByDate,
                borderColor: color.border,
                backgroundColor: color.border,
                // pointBackgroundColor: color.border,
                pointBorderColor: color.border,
                pointBorderWidth: 2,
                pointHoverBorderWidth: 10,
                pointHoverBorderColor: color.border,
                pointHoverBackgroundColor: color.border,
                pointStyle: 'circle',
                pointRadius: 4,
                pointHoverRadius: 7,
                // fill: {
                //     target: "origin", // 3. Set the fill options
                //     above: color.fill
                //
                // }

            };
        })
    };
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
            padding: 20
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

                callbacks: {
                    label: function(context) {
                        const label = context.dataset.label || '';
                        const value = context.raw;
                        return `${label}: ${value} $`;
                    }
                },
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
                    color:'#5d5f6b',
                    // This more specific font property overrides the global property
                    font: {
                        size: 20
                    }
                },
            }
        },
    };

    return (
        <div className="diagram-line">
            <Line options={options} data={lineChartData} plugins={[backgroundColorPlugin]} style={{
                borderRadius:5,
            }}/>
        </div>
    );
};

export default StatisticsAll;
