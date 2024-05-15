import '../Styles/signin.css'
import {useState} from 'react'
import Navbar from '../Components/Navbar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/FirebaseConfig';
import { useNavigate } from 'react-router-dom';

function Signin(){
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
    

    return(
        <div>
            <Navbar />
            <div className='signbar'>
                <div id="signin">
                    <div className="login">
                        <h1>Login</h1>
                        <p>or <span><a href='/signup'>create an account</a></span></p>
                        <hr/>
                        <form onSubmit={handleLogin} className='signinform'>
                            <div>
                                <label>Email</label><br/>
                                <input type="email" required id='email' name="email" value={email} placeholder="Enter Your Email Id" onChange={(e)=>setEmail(e.target.value)}/><br/>
                            </div>
                            <div>
                                <label>Password</label><br/>
                                <input type="password" required id='password' name="password" value={password} placeholder="Enter Your Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                            </div>    
                            <button type='submit'>LOGIN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
            
                
    );
}
export default Signin;