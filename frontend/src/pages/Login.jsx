import React, { useState, useContext } from 'react'; // 6.9k (gzipped: 2.7k)

import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import loginImg from '../assets/images/login.png'; // 3.5k (gzipped: 1.4k)
import userIcon from '../assets/images/user.png'; // 1.8k (gzipped: 0.7k)
import {AuthContext} from './../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    });

    const{dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChange = e => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleClick = async e => {
        e.preventDefault();

        dispatch({type:'LOGIN_START'})

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            credentials : 'include',
            body: JSON.stringify(credentials)
            })

            const result = await res.json();
            if(!res.ok) {
                alert(result.message);
                dispatch({type:'LOGIN_FAILURE', payload: result.message})
                return;
            }
            console.log(result.data);

            dispatch({type:'LOGIN_SUCCESS',payload: result.data})
            navigate('/')
        } catch(err){
            dispatch({type:'LOGIN_FAILURE', payload: err.message})
        }
    };

    return <section>
        <Container>
            <Row>
                <Col lg='8' className='m-auto '>
                    <div className='login__container d-flex justify-content-between'>
                        <div className='login__img'>
                            <img src={loginImg} alt="" />
                        </div>
                        <div className='login__form '>
                            <div className='user'>
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Login</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="email" placeholder='Email' required id="email" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder='Password' required id="password" onChange={handleChange} />
                                </FormGroup>
                                <Button className='btn secondary__btn auth__btn' type="submit" onClick={handleClick}>Login</Button>
                            </Form>
                            <p>Don't have an account? <Link to='/register'>Create an account</Link></p>
                            <p>Forgot your password? <Link to='/forgot-password'>Reset Password</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Login;
