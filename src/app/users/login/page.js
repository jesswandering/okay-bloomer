"use client";
import 'bulma/css/bulma.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import setAuthToken from '@/app/utils/setAuthToken';
import jwtDecode from 'jwt-decode';
import { Header } from '../../components/Header';
import './login.css';

export default function Login() {
    const router = useRouter();
    const [redirect, setRedirect] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleEmail = (e) => {
        // fill in code
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        // fill in code
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // at the beginning of a submit function

        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`, { email, password })
            .then(response => {

                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('userId', response.data.userData.id);
                localStorage.setItem('email', response.data.userData.email);
                localStorage.setItem('expiration', response.data.userData.exp);
                setAuthToken(response.data.token);
                let decoded = jwtDecode(response.data.token);
                setRedirect(true);
            })
            .catch(error => {
                if (error.response.data.message === 'Email already exists') {
                    console.log('===> Error in Signup', error.response.data.message);
                    setError(true);
                }
            });

    };

    if (redirect) { router.push('/'); }
    if (error) {
        return (
            <div>
                <Header pageTitle="Login" profileImg="path/to/profile/image.jpg" />

                <div>
                    <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                        <div className="card-body text-center">
                            <div>
                                <p>Email already exists</p>
                                <br />
                                <h2>Login</h2>
                                <p>Sign In to your account</p>
                                <a href="/users/login" type="button" className="btn btn-primary active mt-3" style={{ color: '#98e298' }}>Login</a>
                                <span>  </span>
                                <a href="/users/signup" type="button" className="btn btn-secondary active mt-3" style={{ color: '#98e298' }}>Signup</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="hero is-fullheight">
            <div className="hero-body is-justify-content-center is-align-items-center">
                <div className="columns is-flex is-flex-direction-column box">
                    <div className="column">
                        <label for="email">Email</label>
                        <input className="input is-primary" type="text" placeholder="Email address" onChange={handleEmail} />
                    </div>
                    <div className="column">
                        <label for="Name">Password</label>
                        <input className="input is-primary" type="password" placeholder="Password" onChange={handlePassword} />
                        <a href="forget.html" className="is-size-7 has-text-primary">Forget password?</a>
                    </div>
                    <div className="column">
                        <button className="button is-primary is-fullwidth" type="submit" onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="has-text-centered">
                        <p className="is-size-7"> Do not have an account? <a href="/users/signup" className="has-text-primary">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

        // <div className="container">
        //     <br />
        //     <br />
        //     <br />
        //     <br />
        //     <div className="row justify-content-center">
        //         <div className="col-md-8">
        //             <div className="card-group mb-0">
        //                 <div className="card p-4">
        //                     <form className="card-body" onSubmit={handleSubmit}>
        //                         <h1>Login</h1>
        //                         <p className="text-muted">Sign In to your account</p>
        //                         <div className="input-group mb-3">
        //                             <span className="input-group-addon"><i className="fa fa-user"></i></span>
        //                             <input type="text" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required />
        //                         </div>
        //                         <div className="input-group mb-4">
        //                             <span className="input-group-addon"><i className="fa fa-lock"></i></span>
        //                             <input type="password" className="form-control" placeholder="Password" alue={password} onChange={handlePassword} required />
        //                         </div>
        //                         <div className="row">
        //                             <div className="col-6">
        //                                 <button type="submit" className="btn btn-primary px-4">Login</button>
        //                             </div>
        //                             <div className="col-6 text-right">
        //                                 <button type="button" className="btn btn-link px-0">Forgot password?</button>
        //                             </div>
        //                         </div>
        //                     </form>
        //                 </div>
        //                 <div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
        //                     <div className="card-body text-center">
        //                         <div>
        //                             <h2>Sign up</h2>
        //                             <p>Get started now by creating an account.</p>
        //                             <a href="/users/signup" type="button" className="btn btn-primary active mt-3">Register Now!</a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
