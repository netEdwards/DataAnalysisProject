import axios from 'axios';
import sy from './navcomp.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavComp = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const icon = <i class="fa-solid fa-server"></i>
    const icon2 = <i class="fa-solid fa-video"></i>
    const icon3 = <i class="fa-solid fa-info"></i>

    const logoutButton = () => {
        console.log("Logout Button Clicked");
        axios.get('/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('isDemo');
        nav('/login');
    }

    const buttonClick = (e, l) => {
        e.preventDefault();
        console.log("Button Clicked");
        if (l === 'datapage'){
            nav('/data');
        }else if (l === 'home'){
            nav('/home');
        }else if (l === 'collection'){
            nav('/collection');
        }
    }  

    return (
        <div id="nav" className={sy.navbox}>
            <button onClick={(e)=>{buttonClick(e, 'home')}}><h1>{icon2}  Feed</h1></button>
            <button onClick={(e)=>{buttonClick(e, 'datapage')}}><h1>{icon}  Data</h1></button>
            <button onClick={(e)=>{buttonClick(e, 'collection')}}><h1>{icon3}  Info</h1></button>
            <div id="navfooter" className={sy.navfooter}>
                <h1 className={sy.title}>Food Safety Hub</h1>
                <p>Note this app is in heavy development and is only a display of progress for a developer.</p>
                <button onClick={logoutButton}> Logout </button>
            </div>
        </div>
    )
}

export default NavComp;