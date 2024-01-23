import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db} from "../firebase"
import {set, ref} from "firebase/database"

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, username, password}= e.target.elements;
        console.log(email.value, username.value, password.value);

        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                set(ref(db, 'users/' + user.uid), {
                    username: username.value,
                    email: email.value,
                    id : user.uid
                  });
                window.alert("Successfully created user");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                window.alert(errorMessage);
            });
    }

    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "80vh" }}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername1" name="username" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div className="my-3">
                    <a href="/">Exisiting User? Login</a>
                </div>
            </form>
        </div>
    )
}

export default Register
