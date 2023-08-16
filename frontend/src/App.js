import React, { useEffect,useState } from 'react';
import Dashboard from './Components/Dashboard';
import Homepage from './Components/Homepage';
import axios from 'axios';

const UserContext = React.createContext();

function App() {
  const [user , setUser ] = useState(null);


  useEffect(()=>{
  axios.defaults.baseURL = 'http://localhost:5000/api';
  axios.defaults.withCredentials = true;
  axios.get('/user').then((res)=>{
    console.log(res.data);
    setUser(res.data);
  }).catch((err)=>{
    console.log(err.response.data);
  }) ;
  },[]);

  return (
<>
    <UserContext.Provider value={{user , setUser}}>
    <div className="App bg-[#9197B3]">
    {user &&  <Dashboard />}
    {!user &&  <Homepage />}
    </div>
    </UserContext.Provider>
</>
  );
}
export const GetUserContext = () => React.useContext(UserContext);
export default App;
