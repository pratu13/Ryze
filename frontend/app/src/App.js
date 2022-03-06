import Welcome from "./components/Onboarding/Welcome/Welcome"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainBoard from "./components/Main/MainBoard";
import Announcement from "./components/Announcement/Announcement";
import SetNewPassword from "./components/Onboarding/Login/ForgotPassword/SetNewPassword";


function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path='/' element={<Welcome />} exact></Route>
          <Route path='/main/*' element={<MainBoard />} exact></Route>
          <Route path='/announcement/' element={<Announcement />} exact></Route>
          <Route path='/passwordReset/*' element={<SetNewPassword/>} exact></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
