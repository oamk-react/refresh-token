import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProvider from './context/UserProvider';
import PrivateRoute from './components/PrivateRoute' 
import Header from './components/Header';

function App() {
  return (
   <UserProvider>
    <Header />
    <div className='content'>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />}/>
        </Route>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </div>
   </UserProvider>
  );
}

export default App;
