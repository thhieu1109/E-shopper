import axios from 'axios';
import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
        level: 0
    });

    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        const fieldInput = e.target.name;
        const value = e.target.value;

        setInput((prevState) => {
            return {
                ...prevState,          // Sao chép lại các giá trị cũ
                [fieldInput]: value    // Ghi đè giá trị mới vào đúng trường tương ứng
            }
        });
    }

    const validateLogin = () => {
        let haveErrors = {};
        let isValid = true;

        if (!input.email) {
            haveErrors.email = 'Email is required';
            isValid = false;
        }
        if (!input.password) {
            haveErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(haveErrors);
        return isValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateLogin()) {
            console.log(input);
            axios.post('http://localhost/laravel8/public/api/login', input)
                .then((response) => {
                    console.log(response.data);
                    localStorage.setItem('User', JSON.stringify(response.data));
                    alert('Login successfully!');
                    navigate('/');
                })
                .catch((error) => {
                    console.error('There was an error logging in!', error);
                    alert('Login failed!');
                })
        }
    }

    return (
        <div>
            <div className="col-sm-4 offset-sm-1">
                <div className="login-form">
                    <h2>Login to your account</h2>

                    <form action="#" onSubmit={handleSubmit}>


                        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>

                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>

                        <span>
                            <input type="checkbox" className="checkbox" />Keep me signed in
                        </span>

                        <button type="submit" className="btn btn-default">Login</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;