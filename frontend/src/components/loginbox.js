import React, { useEffect } from "react";
import { useState } from "react";
import styles from './compstyles.module.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Lbox = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                username: username,
                password: password
            });
            if (response.data.token) {
                console.log('Login successful:', response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/home');
            } else {
                alert('Login failed: ' + response.data.message);
            }
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || 'Network error'));
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, []);

    return(
        <form onSubmit={handleLogin} className={styles.lbox}>
            <div className={styles.icontainer}>
                <p>Username</p>
                <input
                className={styles.inp}
                placeholder="Username..."
                type="text"
                id="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className={styles.space}></div>
            <div className={styles.icontainer}>
                <p>Key</p>
                <input
                className={styles.inp}
                placeholder="Key..."
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                />
                <p>This is provided by <br/> an Admin/Adrian!</p>
            </div>
            <button className={styles.BUTT} type="submit">Enter</button>
        </form>
    )
}

export default Lbox;