import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';
import Profile from './Component/Profile';
import Protect from './Component/Protect';
import Bookbus from './Component/Bookbus';
import Busdetails from './Component/Busdetails';
import BookFlight from './Component/BookFlight';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path='/' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/home' element={ <Protect Child={Home}/>  }/>
            <Route path='/profile' element={ <Protect Child={Profile}/>  }/>
            <Route path='/bus' element={<Protect Child={Bookbus}/>}/>
            <Route path='/busdetail/:busid' element={<Protect Child={Busdetails}/>}/>
            <Route path='flight' element={<BookFlight/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;