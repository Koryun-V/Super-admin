import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement, Title, Filler
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const {width, height, ctx} = chart;
        ctx.save();

        const total = chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
        const totalText = total;
        const labelText = "Total";

        // Настрой стиль для числа
        ctx.font = 'bold 26px Arial';
        ctx.fillStyle = '#ffffff'; // Цвет текста
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Рисуем число в центре
        ctx.fillText(totalText, width / 2, height / 2 - 10);  // Смещение вверх для числа
        // Настрой стиль для текста "Total"
        ctx.font = 'bold 25px Arial';  // Меньший размер для текста "Total"
        ctx.fillStyle = '#ffffff';  // Цвет текста
        ctx.fillText(labelText, width / 2, height / 2 + 20);  // Смещение вниз для текста "Total"
        ctx.restore();
    },
};


// const colors = [
//     { border: 'red', fill: 'rgba(255,255,255,0.63)' },
//     { border: 'blue', fill: 'rgba(255,233,0,0.65)' },
//     { border: 'green', fill: 'rgba(246,173,85,0.3)' },
//     { border: '#ed64a6', fill: 'rgba(237,100,166,0.3)' },
//     { border: '#38b2ac', fill: 'rgba(56,178,172,0.3)' },
// ];
const PieStatistics = ({data}) => {
    const pieChartData = {
        labels: data.map(store => store.storeName.charAt(0).toUpperCase() + store.storeName.slice(1)),
        datasets: [
            {
                label: "Sales",
                data: data.map(store =>
                    store.statistics.reduce((sum, stat) => sum + stat.totalSales, 0)
                ),
                backgroundColor: [
                    'rgba(255,0,0,0.6)',
                    'rgba(0,61,255,0.9)',
                ],
                borderColor: [
                    'rgb(255,0,0)',
                    'rgba(0,44,255,0.9)',

                ],
                borderWidth: 0
            }
        ]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: 20,
        },
        // scales: {
        //     y: {
        //         grid: {
        //             // color: '#5d5f6b',
        //         },
        //         ticks: {
        //             font:{
        //                 size: 16,
        //             },
        //             color: 'white',
        //         }
        //     },
        //     x: {
        //         grid: {
        //             // color: '#5d5f6b',
        //         },
        //         ticks: {
        //             font:{
        //                 size: 16,
        //             },
        //             color: 'white',
        //         }
        //     },
        // },
        plugins: {
            tooltip: {
                bodyFontSize: 14,
                padding: 10,
                titleMarginLeft: 4,
                boxPadding: 10,
                titleFont: {
                    size: 16,
                },
                bodyFont: {
                    size: 14,
                }
            },
            custom_canvas_background_color: true, // включаем плагин
            legend: {
                display: false,

                labels: {
                    backdropPadding: 10,
                    font: {
                        size: 20
                    }
                },
            }
        },
    };

    return (
        <div className="diagram-pie">
            <Doughnut data={pieChartData} options={options} style={{borderRadius: 5}} plugins={[centerTextPlugin]}/>
        </div>
    );
};

export default PieStatistics;
