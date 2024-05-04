import React from 'react';
import {useState} from 'react';
import styles from './Login.module.css';
import Lbox from '../components/loginbox';
import logo from '../media/logo.jpg';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [isDemo, setIsDemo] = useState(false);
    const nav = useNavigate();
    const handleClick = () => {
        localStorage.setItem('isDemo', 'true');
        nav('/home');
    }

    return (
        <div id="Container" className={styles.main}>            
            <div id='rightside' className={styles.lcontainer}>
                <div id='loginbox' className={styles.loginbox}>
                    <div id='logo' className={styles.logoc}>
                        <img className={styles.loginlogo} src={logo} alt="cfa logo" width="250" height="250"/>
                    </div>
                    <div id='textcontainer' className={styles.lbox1}>
                        <Lbox/>
                    </div>
                </div>
            </div>
            <div className={styles.demo}>
                <div className={styles.demobox}>
                    <div className={styles.demoheader}>
                        <h1>Demo Mode</h1>
                        <p>Click to enter in demo mode with mock data!</p>
                    </div>
                    <button onClick={handleClick}>Demo</button>
                </div>
            </div>
        </div>
    );
}

export default Login;