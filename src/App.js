import { useState } from 'react'
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/Home';
import Appointments from './components/Apointment';
import Login from './components/Login'
import Doctor from './components/Doctor';
import Patient from './components/Patient';
import Treatment from './components/Treatment';


function App() {
  return (
    <>  
      <BrowserRouter>
        <Navbar/>
        { <Routes>
          <Route path="/login" element={<Login />}></Route>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/appointment' element={<Appointments/>}/>
            <Route exact path='/doctors' element={<Doctor/>}/>
            <Route exact path='/patients' element={<Patient/>}/>
            <Route exact path='/treatment' element={<Treatment/>}/>

          
        </Routes> }
      
      </BrowserRouter>
    </>
  )
}

export default App;



















// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
