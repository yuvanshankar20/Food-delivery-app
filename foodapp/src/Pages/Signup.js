import '../Styles/signin.css'
import {useState} from 'react'
import Navbar from '../Components/Navbar';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth,fireDB} from '../Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

function Signup(){
    const [signupusername,setSignupsername] = useState("");
    const [signuppassword,setSignupPassword] = useState("");
    const [signupemail,setSignupemail] = useState("");
    const handleSignup=async(e)=>{
        e.preventDefault();
        try{
            const users=await createUserWithEmailAndPassword(auth,signupemail,signuppassword);

            const user={
                name:signupusername,
                uid:users.user.uid,
                email:users.user.email
            }

            const userRef=collection(fireDB,"users")
            await addDoc(userRef,user);
            setSignupsername("");
            setSignupemail("");
            setSignupPassword("");

        }
        catch{
            console.log('error')
        }
    }
    return(
        <div>
            <Navbar />
            <div className='signupbar'>
                <div id="signup">
                    <div className="signincontainer">
                        <div className="login">
                            <h1>Sign Up</h1>
                            <p>or <span><a href='/signin'>login to your account</a></span></p>
                            <hr/>
                            <form onSubmit={handleSignup} className='signupform'>
                                <div>
                                    <label>Username</label><br/>
                                    <input type="text" name="signupusername" value={signupusername} placeholder="Enter Your Username" required onChange={(e)=>setSignupsername(e.target.value)}/><br/>
                                </div>
                                <div>
                                    <label>Email</label><br/>
                                    <input type="email" name="signupemail" value={signupemail} placeholder="Enter Your Email" required onChange={(e)=>setSignupemail(e.target.value)}/><br/>
                                </div>
                                <div>
                                    <label>Password</label><br/>
                                    <input type="password" name="signuppassword" value={signuppassword} placeholder="Enter Your Password" required onChange={(e)=>setSignupPassword(e.target.value)}/><br/>
                                </div>
                                <button type='submit'>SIGN UP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
                
    );
}
export default Signup;