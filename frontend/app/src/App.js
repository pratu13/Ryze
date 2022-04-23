import Welcome from "./components/Onboarding/Welcome/Welcome"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainBoard from "./components/Main/MainBoard";
import Announcement from "./components/Announcement/Announcement";
import SetNewPassword from "./components/Onboarding/Login/ForgotPassword/SetNewPassword";
import { useState } from "react";
import DuoAuth from "./components/Onboarding/DuoAuth";


function App() {
  const [dark, setdark] = useState(false)

  const toggleMode = () => {
    document.body.style.backgroundColor = !dark ? "black" : "white";
    setdark(!dark)
  } 

  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Welcome dark={dark}/>} exact></Route>
          <Route path='/main/*' element={<MainBoard dark ={dark} toggle={toggleMode} />} exact></Route>
          <Route path='/announcement/' element={<Announcement />} exact></Route>
          <Route path='/passwordReset/*' element={<SetNewPassword />} exact></Route>
          <Route path='/duoAuth/*' element ={<DuoAuth/>} exact></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
