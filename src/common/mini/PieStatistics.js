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

        ctx.font = 'bold 26px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(totalText, width / 2, height / 2 - 10);
        ctx.font = 'bold 25px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(labelText, width / 2, height / 2 + 20);
        ctx.restore();
    },
};


const PieStatistics = ({data}) => {
    const pieChartData = {
        labels: data.statistics.map(store => store.storeName.charAt(0).toUpperCase() + store.storeName.slice(1)),
        datasets: [
            {
                label: "Sales",
                data: data.statistics.map(store =>
                    store.statistics.reduce((sum, stat) => sum + stat.totalOrders, 0)
                ),
                backgroundColor: [
                    '#ff0000',
                    '#0000ff',
                    '#ffffff',
                    '#00FF13FF',
                    '#FFD500FF',
                ],
                borderColor: [
                    '#ff0000',
                    '#0000ff',
                    '#ffffff',
                    '#00FF13FF',
                    '#FFD500FF',
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
