import React  from "react";
import { useState, useEffect } from "react";
import sy from "./Home.module.css";
import FeedObject from "../components/feedobject";


const Home = () => {
    const [data, setData] = useState([]);
    const icon = <i class="fa-regular fa-user"></i>
    const icon2 = <i class="fa-solid fa-video"></i>
    const icon3 = <i class="fa-solid fa-note-sticky"></i>
    
    useEffect(() => {
        fetch('/home')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.error(err));
    });

    return ( 
        <div id="page" className={sy.main}>
            {/* 
            we will have div inside the main div for dynamic purposes
            the div will display in flex, column direction.
            */}
            <div className={sy.container}>
                {/* Veritical Nav Bar, like tiktoks. Something to navigate; account, feed control, and notes. */}
                <div id="nav" className={sy.navbox}>
                    <h1>{icon2}  Feed</h1>
                    <h1>{icon}  Account</h1>
                    <h1>{icon3}  Notes</h1>
                    <div id="navfooter" className={sy.navfooter}>
                        <p>Note this app is in heavy development and is only a display of progress for a developer.</p>
                    </div>
                </div>
                {/* Feed is where the reports will be displayed in a socail media type way. With interactivity.  */}
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
            </div>
        </div>
    );
};

export default Home;