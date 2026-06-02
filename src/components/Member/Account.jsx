import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account(props) {

    const user = JSON.parse(localStorage.getItem('User'));

    let accessToken = null;
    if (user) {
        accessToken = user.token;
        console.log(accessToken);
    }

    let config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
    };

    const navigate = useNavigate();

    const [showFormUpdate, setShowFormUpdate] = useState(false);


    const handleShowFormUpdate = () => {
        setShowFormUpdate(true);
    }

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        avatar: null
    });

    useEffect(() => {

        if (!user) {
            alert('You need to login first!');
            navigate('/member/auth');
        } else {


            setUserData({
                name: user.Auth.name,
                email: user.Auth.email,
                password: '',
                phone: user.Auth.phone,
                address: user.Auth.address,
                avatar: user.Auth.avatar
            });


        }

    }, []);



    const handleInputChange = (e) => {

        const fieldInput = e.target.name;
        const value = e.target.value;

        setUserData({
            ...userData,
            [fieldInput]: value
        });
    }

    const setAvatar = (e) => {
        setUserData({
            ...userData,
            avatar: e.target.files[0]
        })
    }


    const handleUpdateInformation = (e) => {

        e.preventDefault();
        axios.post(`http://localhost/laravel8/public/api/user/update/${user.Auth.id}`, userData, config).then(
            response => {
                console.log(response.data);

                const updatedUser = response.data;


                localStorage.setItem('User', JSON.stringify(updatedUser));

                alert('Update information successfully!');
                window.location.reload();
            }
        ).catch(
            error => {
                console.error(error);
                alert('Update information failed!');
            }
        )
    }

    const someInformation = () => {

        if (user) {
            return (
                <div>

                    <h2>Account Information</h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Name</th>
                                <td>{user.Auth.name}</td>
                            </tr>

                            <tr>
                                <th>Email</th>
                                <td>{user.Auth.email}</td>
                            </tr>

                        </tbody>

                    </table>

                    <div>
                        <button
                            className="btn btn-primary"
                            onClick={handleShowFormUpdate}
                        >
                            Update Information
                        </button>
                    </div>

                    {
                        showFormUpdate && (

                            <form action="" style={{ marginTop: '20px', marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                    readOnly
                                />

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="*******"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                />

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                />

                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    className="form-control mb-3"
                                />

                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={setAvatar}
                                    className="form-control mb-3"
                                />

                                <button className="btn btn-success" onClick={handleUpdateInformation}>
                                    Update
                                </button>

                            </form>

                        )
                    }

                </div>
            );
        }
    }

    return (
        <div className="col-sm-9 padding-right">
            {someInformation()}
        </div>
    );
}

export default Account;