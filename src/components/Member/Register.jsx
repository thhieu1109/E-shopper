import axios from 'axios';
import React, { useState } from 'react';

function Register(props) {

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: '',
        level: 0
    });

    const [errors, setErrors] = useState({});

    const [file, setFile] = useState(null);

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

    const validateRegister = () => {
        let haveErrors = {};
        let isValid = true;

        if (!input.name) {
            haveErrors.name = 'Name is required';
            isValid = false;
        }
        if (!input.email) {
            haveErrors.email = 'Email is required';
            isValid = false;
        }
        if (!input.password) {
            haveErrors.password = 'Password is required';
            isValid = false;
        }
        if (!input.phone) {
            haveErrors.phone = 'Phone is required';
            isValid = false;
        }
        if (!input.address) {
            haveErrors.address = 'Address is required';
            isValid = false;
        }

        if (!input.avatar) {
            haveErrors.avatar = 'Avatar is required';
            isValid = false;
        }


        setErrors(haveErrors);

        return isValid;

        console.log(errors);
    }

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }
        // Check image
        const typeFile = selectedFile['type'];

        const imageTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp'
        ];

        if (!imageTypes.includes(typeFile)) {

            setErrors(state => ({
                ...state,
                avatar: 'File must be image'
            }));

            return;
        }

        // Check size < 1MB
        if (selectedFile.size > 1024 * 1024) {

            setErrors(state => ({
                ...state,
                avatar: 'File size less than 1MB'
            }));

            return;
        }

        let readFile = new FileReader();

        readFile.onload = (event) => {

            setFile(event.target.result);

            setInput(state => ({
                ...state,
                avatar: event.target.result
            }));

        };


        readFile.readAsDataURL(selectedFile);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateRegister()) {
            console.log(input);
            axios.post('http://localhost/laravel8/public/api/register', input)
                .then((response) => {
                    console.log(response.data);
                    alert('Register successfully!');
                   
                })
                .catch((error) => {
                    console.error('There was an error registering!', error);
                    alert('Register failed!');
                });
        }
    }


    return (
        <div>
            <div className="col-sm-4">
                <div className="signup-form">

                    <h2>New User Signup!</h2>

                    <form >

                        <input type="text" name="name" placeholder="Name" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>

                        <input type="email" name="email" placeholder="Email Address" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.email}</p>
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.password}</p>
                        <input type="text" name="phone" placeholder="Phone" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</p>
                        <input type="text" name="address" placeholder="Address" onChange={handleInputChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.address}</p>
                        <input type="file" name="avatar" onChange={handleFileChange} />
                        <p style={{ color: 'red', fontSize: '12px' }}>{errors.avatar}</p>

                        <button type="submit" className="btn btn-default" onClick={handleSubmit}>
                            Signup
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Register;