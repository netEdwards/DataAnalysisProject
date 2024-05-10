import React  from "react";
import { useState, useEffect } from "react";
import sy from "./Home.module.css";
import FeedObject from "../components/feedobject";
import { useNavigate } from "react-router-dom";
import NavComp from "../components/navcomp";
import Select from "react-dropdown-select";
import axios from "axios";

const demoAxios = axios.create();

const Home = () => {
    
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [sel, setSelected] = useState(1);
    const options = [
        { value: 1, label: 'Last Week'},
        { value: 2, label: 'Last Month'},
        { value: 3, label: 'This Year'}
    ]

    // Fetching the data for the blah

    useEffect(() => {
        const url = localStorage.getItem('isDemo') === 'true' ? `/api/demo?selection=${sel}` : `/api/home?selection=${sel}`;
        const instance = localStorage.getItem('isDemo') === 'true' ? demoAxios : axios;
    
        instance.get(url)
          .then(res => {
            setData(res.data);
            console.log('Fetched');
          })
          .catch(err => console.error(err));
      }, [sel]);

    const handleSelect = (selected) => {
        setSelected(selected[0].value);
        console.log(sel);
    }
    const FeedContainer = () => {
        if (data.length !== 0) {
            return (
                <div id="feed" className={sy.feedbox}>
                            <div id='feedcon' className={sy.feed}>
                                {data.map((item, index) => <FeedObject 
                                key={index}
                                aT={item.aType}
                                a={item.assessment}
                                q={item.question}
                                f={item.finding}
                                o={item.observer}
                                date={item.date}
                                />)}
                            </div>
                        </div>
            )
        }else{
            return (
                <div id="feed" className={sy.feedbox}>
                    <div id='feedcon' className={sy.feed}>
                        <div className={sy.nothing}>
                            <h1>No current reports???</h1>
                            <iframe src="https://giphy.com/embed/YdhvjTeL83pNS" width="480" height="422" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/video-halloween-pizza-YdhvjTeL83pNS"></a></p>
                        </div>
                    </div>
                </div>
            )
        }
    }

//  !!!!!!!!!!! Main Component Return !!!!!!!!!
    return ( 
        <div id="page" className={sy.main}>
            {/* 
            we will have div inside the main div for dynamic purposes
            the div will display in flex, column direction.
            */}
            <div className={sy.container}>
                {/* Veritical Nav Bar, like tiktoks. Something to navigate; account, feed control, and notes. */}
                <div className={sy.navcomp}><NavComp/></div>
                <div className={sy.rtwil}>
                    <div className={sy.btcon}>
                        <div className={sy.selectbox}>
                            <Select 
                            style={{
                                width: "15em",
                                textAlign: "center",
                                
                                borderRadius: "0.5em",
                                borderColor: "white",                            
                                colors: {
                                    background: "black",
                                    placeholder: "white",
                                    search: "red",
                                    arrow: "blue",
                                    arrowOpen: "green",
                                    text: "White",
                                    itemAndGroupHeader: "yellow"
                                }
                            }}
                            className={sy.sel} 
                            options={options} 
                            onChange={handleSelect}
                            ></Select>
                        </div>
                    </div>
                    {/* Feed is where the reports will be displayed in a socail media type way. With interactivity.  */}
                    <FeedContainer/>
                </div>
            </div>
        </div>
    );
};

export default Home;