import React from 'react';
import styles from './Login.module.css';
import Lbox from '../components/loginbox';
import logo from '../media/logo.jpg';

const Login = () => {
    return (
        <div id="Container" className={styles.main}>
            <div id='leftSide' className={styles.leftSide}>
                <div id='imageContainer' className={styles.imagebox}>
                    <div id='box' className={styles.textbox}>
                        <h1>Food Safety <br/> Visualizer</h1>
                        <p>By: Adrian Edwards</p>
                    </div>
                </div>
            </div>
            <div className={styles.lineholder}>
                <div className={styles.line}>
                </div>
            </div>
            <div id='rightside' className={styles.rcontainer}>
                <div id='loginbox'>
                    <div id='logo' className={styles.logoc}>
                        <img className={styles.loginlogo} src={logo} alt="cfa logo" width="250" height="250"/>
                    </div>
                    <div id='textcontainer' className={styles.lbox1}>
                        <Lbox/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;