import React, { useEffect, useState } from 'react';
import Filters from '../../components/Filters';
import "./styles.css"
import Chart from 'react-apexcharts';
import { barOptions, pieOptions } from './chart-options';
import axios from 'axios';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers';

type PieChartData = {
    labels: string[];
    series: number[];

}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = 'https://sds1-leo-leao.herokuapp.com'

const Charts = () => {

    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genderData, setGenderData] = useState<PieChartData>(initialPieData);

    useEffect(() => {

      async function getData(){
        const recordsResponse = await axios.get(`${BASE_URL}/records`);
        const gamesResponse = await axios.get(`${BASE_URL}/games`);

        const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
        setBarChartData(barData);

        const platformChartData = getPlatformChartData(recordsResponse.data.content);
        setPlatformData(platformChartData)

        const genderChartData = getGenderChartData(recordsResponse.data.content);
        console.log(genderChartData);
        setGenderData(genderChartData);

      }

      getData();

    }, [])



    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA"/>
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        JOGOS MAIS VOTADOS
                    </h1>
                    <div className="games-container">
                        <Chart 
                        options={barOptions}
                        type="bar"
                        width="900"
                        height="650"
                        series={[{ data: barChartData }]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">
                            Plataformas
                            <Chart 
                                options={{...pieOptions, labels:platformData?.labels }}
                                type="donut"
                                series={platformData?.series}
                                width="350"
                            />
                        </h2>
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">
                            Gêneros
                            <Chart 
                                options={{...pieOptions, labels:genderData?.labels }}
                                type="donut"
                                series={genderData?.series}
                                width="350"
                            />
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Charts;