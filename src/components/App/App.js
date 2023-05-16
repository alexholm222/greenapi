import './App.css';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from '../Login/Login';
import Main from '../Main/Main';
import ProtectedRoute from "../../utils/ProtectedRoute";

function App() {
  const isLogin = JSON.parse(localStorage.getItem('isLogin')) || false;
  const nav = useNavigate();

  function handleLogOut() {
    localStorage.clear();
    nav('/login');
  }
  return (
    <div className="app">
      <Routes>
        <Route  path="/login" element={!isLogin ? <Login/> : <Navigate to="/" replace/>}/>
        <Route  path="/" element={<ProtectedRoute loggedIn={isLogin} component={Main} logOut={handleLogOut}/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
