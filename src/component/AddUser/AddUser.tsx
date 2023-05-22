import React,{useState} from 'react'
import './AddUser.css'


const AddUser: React.FC<{ getAllUserAxios:()=> void; }> = ({getAllUserAxios}) => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const adduserBTN =async ()=>{
    const newUser : any ={
        email,
        password,
        id: Math.random(),
        date : new Date,
    }
    console.table(
        newUser
        )
        
        //fetch call

        const response = await fetch("http://localhost:3001/add", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
             body: newUser,
          });
          const jsonData = response.json();
          console.log('jsonData',jsonData)

        //fetch call

        setEmail('');
        setPassword('');
}

  return (
     <div className="form-group">

         <h3> ADD NEW USER </h3>

         <div className="form-control">
            <label htmlFor="email">Email</label>
             <input type = 'text' id = "email" value = {email} onChange = {e=>setEmail(e.target.value)} />
         </div>

         <div className="form-control">   
             <label htmlFor="password">Password</label>
             <input type = 'password' id= "password" value = {password} onChange = {e=>setPassword(e.target.value)} />
         </div>
         <br></br>
         <button onClick={adduserBTN}> Add User </button>
     </div>
  )
}

export default AddUser;
