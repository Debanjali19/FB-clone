import App from './App'
 import { useState } from 'react'
 import { useNavigate } from "react-router-dom";
 function Signup() {

   
    let navigate=useNavigate();
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
        const [cpassword, setCpassword] = useState("");
        const [phone, setPhone] = useState("");
        let isemployee=false;
     const handleOnSubmit = async (e) => {
         e.preventDefault();
         const result = await fetch(
         'http://localhost:4000/register', {
             method: "POST",
             body: JSON.stringify({ name, email ,password, cpassword, phone, isemployee}),
             headers: {
                 'Content-Type': 'application/json'
             }
         });
 
        const data = await result.json();
       
        alert(data.error);
        if(data.error==="user registered")
        {
            navigate("/Home");
        }
     }
     const checkhandle = () => {
         if(isemployee===false)
         {
             isemployee=true;

         }
         else if(isemployee===true)
         {
             isemployee=false;
            
         }
        //  if(checked===true)
        //  {
        //      alert("checked");
        //  }
        //  else{
        //      alert("not checked");
        //  }
     }
    
     return (
         <>
             <h1>This is React WebApp </h1>
             <form method="POST">
                 <input type="text" placeholder="name" 
                 value={name} onChange={(e) => setName(e.target.value)} />
                 <input type="email" placeholder="email" 
                 value={email} onChange={(e) => setEmail(e.target.value)} />
                 <input type="password" placeholder="password" 
                   value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="cpassword" 
                    value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                     <input type="text" placeholder="phone" 
                 value={phone} onChange={(e) => setPhone(e.target.value)} />
                 <br />
                 <input type="checkbox" name="employee"
                    value="are you an employee" onChange={checkhandle} />
                    are you an employee check if yes <br /> 
                    
                    
                 <br/>
                 <button type="submit" 
                 onClick={handleOnSubmit}>submit</button>
             </form>
             <a href="Login" >Already an user? login here</a>
 
         </>
     );
 }
 
 export default Signup;