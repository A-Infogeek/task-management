import React from 'react'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const history = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                window.alert("Successfully logged in");
                history("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert("Error while logging in"+ errorMessage);
            });
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "80vh" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="my-3">
                    <a href="/register">Don't have an account? Register</a>
                </div>
            </form>
        </div>
    )
}

export default Login
