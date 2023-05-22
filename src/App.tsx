import React, { useEffect, useState } from 'react';

import './App.css';
import AddUser from './component/AddUser/AddUser';



function App() {
  let userData: any = [];
  const [loading,setLoading] = useState(false);
  const [httpError,setHttpError] = useState(
    {
     status:false,
     msg:'',
    }
);
  const [users, setUsers] = useState([])

  
  const getAllUserAxios = async() => {
    try{
      const response: any = await fetch("http://localhost:3001/users"); //GET Method

    
      if(response.status === 200){

        console.log('response',response);
        setLoading(false);
        const jsonData = await response.json();
        console.log('jsonData',jsonData);
        setUsers(jsonData.allUsers)
  
      }else{
        setLoading(false);
        const jsonData = await response.json();
        setHttpError({status:true, msg:jsonData.msg})
      }
    }
    catch (error) {
      console.log('error catch', error)
      setLoading(false);
      setHttpError({status:true, msg:'something went wrong'})
     }
   
   
    }

  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => {

      getAllUserAxios();

 }, 2000);

  },[])

  console.log('userData', userData)
  console.log('users', users)
const allUsersHTML = users.map((user: any, index) => {
  return (
    <p key={user.id}>
     
      User-{index} := {user.email}
    </p>
  )
} )

  return (
    <div>
      <p>HTTP</p>
      {loading && <p> ...Loading </p>}
      {httpError.status && <p> {httpError.msg} </p>}
      {allUsersHTML}
      <br></br>
      <AddUser getAllUserAxios= {getAllUserAxios}/>
    </div>
  );
}

export default App;
