import React, { useState, useContext } from 'react'; // 6.9k (gzipped: 2.7k)

import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import registerImg from '../assets/images/register.png'; // 3.5k (gzipped: 1.4k)
import userIcon from '../assets/images/user.png'; // 1.8k (gzipped: 0.7k)
import {AuthContext} from './../context/AuthContext';
import { BASE_URL } from '../utils/config';


const Register = () => {

    const [credentials, setCredentials] = useState({
        username: undefined,
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

    try {
        const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    const result = await res.json();

    if (!res.ok) alert(result.message)
    
    dispatch({type: 'REGISTER_SUCCESS'})
    navigate('/login')
    }
    catch (err) {
        alert(err.message)
    }
};

    return <section>
        <Container>
            <Row>
                <Col lg='8' className='m-auto '>
                    <div className='login__container d-flex justify-content-between'>
                        <div className='login__img'>
                            <img src={registerImg} alt="" />
                        </div>
                        <div className='login__form '>
                            <div className='user'>
                                <img src={userIcon} alt="" />
                            </div>
                            <h2>Register</h2>

                            <Form onSubmit={handleClick}>
                                <FormGroup>
                                    <input type="text" placeholder='Username' required id="username" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type="email" placeholder='Email' required id="email" onChange={handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <input type="password" placeholder='Password' required id="password" onChange={handleChange} />
                                </FormGroup>
                                <Button className='btn secondary__btn auth__btn' type="submit" onClick={handleClick}>Create Account</Button>
                            </Form>
                            <p>Already have an account? <Link to='/login'>Login</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
};

export default Register;
