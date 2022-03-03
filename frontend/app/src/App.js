import Welcome from "./components/Onboarding/Welcome/Welcome"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainBoard from "./components/Main/MainBoard";


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>} exact></Route>
        <Route path='/main/*' element={<MainBoard/>} exact></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
