import sty from './datapage.module.css';
import NavComp from '../../components/navcomp';
import axios from 'axios';
import {ResponsiveCalendar} from '@nivo/calendar';
import { ResponsivePie } from '@nivo/pie';
import { useEffect, useState } from 'react';
import ReportBoard from '../../components/reportboard';
import AssessmentRow from '../../components/aData/adata';


const DataPage = () => {

    const currentYear = localStorage.getItem('isDemo') === 'true' ? 2023 : new Date().getFullYear();
    const isDemo = localStorage.getItem('isDemo') === 'true';
    const [cdata, setcData] = useState(null);
    const [pdata, setpData] = useState(null);
    const [aData, setaData] = useState(null);
    const index1 = 1;
    const index2 = 2;

    const urlGPD = localStorage.getItem('isDemo') === 'true' ? `/demoYear?index=${index1}` : `/gpd`;
    const urlGCD = localStorage.getItem('isDemo') === 'true' ? `/demoYear?index=${index2}` : `/gcd`;

    useEffect(() => {
        axios.get('/aData').then(res => {setaData(res.data); console.log(aData)}).catch(err => {console.error(err)});
        axios.get(urlGCD)
            .then(res => {
                const data = res.data;
                // Do something with data
                setcData(data);
            })
            .catch(err => {
                console.error(err);
            })
        axios.get(urlGPD).then(res => {
            const data = [
                {
                id: 'SAFE',
                label: 'SAFE',
                value: res.data.safeCount, 
                color: "hsl(63, 70%, 50%)"
                },
                {
                id: 'eRQA',
                label: 'eRQA',
                value: res.data.eRQACount, 
                color: "hsl(207, 50%, 48%)"
                }
            ]
            console.log(res.data);
            setpData(data);
        })
    }, []);

    return (
        <div className={sty.main}>
            <div>
                <NavComp />
            </div>
            {/* Update Database button */}
            
            <div className={sty.page}>
                <div className={sty.datainfo}>
                    <div className={sty.textcon}>
                        <h1>Data Page</h1>
                        <p>
                            Here you will see the data that is of importance displayed, 
                            with high end functionality. Scrolling down you will see an infinite amount 
                        </p>
                        <p>
                            Here you are able to request data downloads for sharing. 
                            Visualize the amount of SAFE findings vs the amount of eRQA findings. 
                            As well as see what days of the week we have the most findings!
                        </p>
                    </div>
                </div>
                <div className={sty.calendar}>
                    <div className={sty.calinfo}>
                        <div>
                            <h1>Compliant Report Calendar</h1>
                            <p>
                                Below is a calender that displays all the days of the year, each column is a week
                                and each square is a day. The color of the squares represents the amount of reports that were non-compliant.
                                Meaning that there was something found wrong during that report.
                            </p>
                        </div>
                    </div>
                    <div className={sty.iCal}>
                        {cdata && (
                            <ResponsiveCalendar
                                width={700}
                                height={200}
                                data={cdata}
                                from={`${currentYear}-01-02`}
                                to={`${currentYear}-12-31`}
                                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                emptyColor='#9798a3'
                                colors={['white', 'grey', 'red', 'yellow', 'green']}
                                yearSpacing={40}
                                monthBorderColor="#1e2c38"
                                dayBorderWidth={4}
                                dayBorderColor="#1e2c38"
                                legends={[
                                    {

                                        anchor: 'bottom',
                                        direction: 'row',
                                        itemCount: 4,
                                        itemWidth: 42,
                                        itemHeight: 36,
                                        itemsSpacing: 14,
                                        itemDirection: 'right-to-left'
                                    }
                                ]}
                                theme={{
                                    text: {
                                        fontSize: 14,
                                        fontFamily: "Karla",
                                        fill: 'white'
                                    },
                                    tooltip: {
                                        container: {
                                            color: 'black',
                                        }
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={sty.thearc}>
                    <div className={sty.arcinfo}>
                        <h1>THE ARC</h1>
                        <p>This is the ARC. The ARC currently displays the amount of eRQA reports vs the amount of SAFE reports over the span of the websites existence. </p>
                    </div>
                    <div className={sty.pie}>
                    {pdata && (<ResponsivePie
                    className={sty.piee}
                    data={pdata}
                    margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
                    innerRadius={0.69}
                    padAngle={2}
                    cornerRadius={3}
                    activeOuterRadiusOffset={15}
                    borderWidth={3}
                    borderColor={{
                        from: 'color',
                        modifiers: [
                            [
                                'darker',
                                2
                            ]
                        ]
                    }}
                    colors={d => d.data.color}
                    fill={[
                        {
                            match: {
                                id: 'SAFE'
                            },
                            id: 'dots',
                            color: d => d.data.color // Use the color property from the data
                        },
                        {
                            match: {
                                id: 'eRQA'
                            },
                            id: 'lines',
                            color: d => d.data.color // Use the color property from the data
                        }
                    ]}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="white"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={'Black'}
                    arcLabelsTextStyle={{ fontSize: 10, fontFamily: 'Karla' }}
                    theme={{
                        tooltip:{
                            container:{
                                backgroundColor: '#1e2c38',
                                color: 'white',
                                fontFamily: 'Karla',
                                borderRadius: '5px'
                            }
                        }
                    }}            
                    legends={[
                        {
                            anchor: 'top-right',
                            direction: 'row',
                            justify: false,
                            translateX: -35,
                            translateY: 200,
                            itemsSpacing: 0,
                            itemWidth: 100,
                            itemTextColor: 'white',
                            itemDirection: 'left-to-right',
                            itemOpacity: 1,
                            symbolSize: 11,
                            symbolShape: 'circle',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000'
                                    }
                                }
                            ]
                        }
                        ]}
                    />)}
                    </div>
                </div>
                <div className={sty.infoboard}>
                        {/* The info component. */}
                        <ReportBoard className={sty.rboard} /> 
                </div>
                <div className={sty.asscontainer}>
                    {!isDemo && <div className={sty.cont2}>
                        {aData && aData.map((data, index) => {
                            return <AssessmentRow className={sty.aRow} key={index} assessment={data.assessment} value={data.value} />
                        })}
                    </div>}
                </div>
            </div>
        </div>
    )
};

export default DataPage;