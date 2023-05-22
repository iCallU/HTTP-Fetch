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

  
  // const getAllUserAxios = async() => {
  //   try{
  //     const response: any = await fetch("http://localhost:3001/users"); //GET Method

    
  //     if(response.status === 200){

  //       console.log('response',response);
  //       setLoading(false);
  //       const jsonData = await response.json();
  //       console.log('jsonData',jsonData);
  //       setUsers(jsonData.allUsers)
  
  //     }else{
  //       setLoading(false);
  //       const jsonData = await response.json();
  //       setHttpError({status:true, msg:jsonData.msg})
  //     }
  //   }
  //   catch (error) {
  //     console.log('error catch', error)
  //     setLoading(false);
  //     setHttpError({status:true, msg:'something went wrong'})
  //    }
   
   
  //   }

  const getAllUserAxios = async() => {

  const userResponse: any = await fetch('http://localhost:3001/users').catch((error)=>{ console.log('error', error) })

  if(userResponse.status === 200){
    const userData = await userResponse.json();
    console.log(' user userData', userData)
    setUsers(userData.allUsers)
    setLoading(false)

  }else {

    const userError = await userResponse.json();
    console.log(' user else part/error json', userError)
    setLoading(false)
    setHttpError({status:true, msg: userError.msg})
  }
  
  };

  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => {

      getAllUserAxios();

 }, 1000);

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
