import React from 'react';
import {useState} from 'react';
import axios from 'axios';

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.post('/api/register', {
                username: username,
                key: password,
                role: role
            });
            console.log('User created!');
        }catch (error) {console.error('Failed to create user', error);}
     }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Register Account</h1>
                    <input 
                    type="text" 
                    placeholder="Username" 
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    ></input>
                    <input 
                    type="password" 
                    placeholder="Password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <input 
                    type='text' 
                    placeholder='Role'
                    required
                    onChange={(e) => setRole(e.target.value)}
                    ></input>
                    <div>
                        <button type="submit">Create user</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;    