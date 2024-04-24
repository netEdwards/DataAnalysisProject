//import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Notes from './pages/notes';
import Login from './pages/login';
import Account from './pages/account';
import Register from './pages/register';
import PrivateRoute from './components/privateroute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/account' element={<PrivateRoute><Account/></PrivateRoute>}/>
        <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/' element={<Navigate replace to='/login'/>}/>
      </Routes>
    </Router>
  );
}

export default App;
