import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./Directory/Home";
import LogIn from "./Directory/Login";
import Registration from "./Directory/Registration";

export default function App() {
  

  return (
    <>

  <Router>
    
    <Routes>

<Route  path="/"  element={<Home/>}      />
<Route  path="/Login" element={<LogIn/>}      />
<Route  path="/SignUp" element={<Registration/>}      />
      
    </Routes>
    
    </Router> 
  
  
   
    </>
  );
}
