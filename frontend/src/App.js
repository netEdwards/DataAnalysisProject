//import Login from './pages/login'
import Home from './pages/home'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import PrivateRoute from './components/privateroute';
import DataPage from './pages/datapage/datapage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/data' element={<PrivateRoute><DataPage/></PrivateRoute>}/>
        <Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/' element={<Navigate replace to='/login'/>}/>
      </Routes>
    </Router>
  );
}

export default App;
