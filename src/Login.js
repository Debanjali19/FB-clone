import App from './App'
import { useState, React } from 'react'
import { useNavigate } from "react-router-dom";
import { Redirect } from 'react-router';

  function Login() {
      let navigate=useNavigate();
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");

      const handleOnSubmit = async (e) => {
          e.preventDefault();
          const result = await fetch(
          'http://localhost:4000/login', {
              method: "post",
              body: JSON.stringify({ email , password }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          const data = await result.json();
        

        // if(data){
        //    navigate("/Home");
        //     alert("done");
        // }
        // else{
        //     alert("hi");
        // }
        
       alert(data.error);
       if(data.error==="Login successfull")
       {
        navigate("/Home");
       }

          
      }

      
      return (
          <>
              <h1>This is login page </h1>
              <form method="POST">
                  <input type="email" placeholder="email" 
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input type="password" placeholder="password" 
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" 
                  onClick={handleOnSubmit}>submit</button>
              </form>
              
          </>
      );
  }
  
  export default Login;
  