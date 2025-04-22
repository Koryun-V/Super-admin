const  data =[
        {
            "interval": "2025-04-01",
            "totalRevenue": 200,
            "totalSales": 1
        },
        {
            "interval": "2025-04-02",
            "totalRevenue": 1.8,
            "totalSales": 1
        },
        {
            "interval": "2025-04-03",
            "totalRevenue": 1269.8,
            "totalSales": 8
        },
        {
            "interval": "2025-04-12",
            "totalRevenue": 730.2,
            "totalSales": 6
        },
        {
            "interval": "2025-04-13",
            "totalRevenue": 284.2,
            "totalSales": 2
        },
        {
            "interval": "2025-04-15",
            "totalRevenue": 44.1,
            "totalSales": 1
        }
    ]


const lineChartData = {
    labels: data.map(item => item.interval),


    datasets: [
        {
            label: "Steps",
            data:  data.map(item => item.totalRevenue),
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
