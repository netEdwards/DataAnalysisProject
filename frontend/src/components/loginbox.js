import React from "react";
import { useState } from "react";
import styles from './compstyles.module.css';

const Lbox = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        setUsername("");
        setPassword("");
    }
    return(
        <form>
            <div className={styles.icontainer}>
                <p>Username</p>
                <input
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
                placeholder="Key..."
                type="password"
                id="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                />
                <p>This is provided by <br/> an Admin/Adrian!</p>
            </div>
            <button type="submit" onClick={handleSubmit}>Enter</button>
        </form>
    )
}

export default Lbox;