import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';

function RatingBlog(props) {

    let user = JSON.parse(localStorage.getItem('User'));

    let accessToken = null;

    if (user) {
        accessToken = user.token;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json'
        }
    };

    const [userRating, setUserRating] = useState({
        blog_id: props.id_blog,
        user_id: user ? user.Auth.id : null,
        rate: 0
    });


    const [avarageRating, setAverageRating] = useState(0);

    const checkLogin = () => {

        if (!user) {
            alert('You need to login first!');
            return false;
        }

        return true;
    };

    // click star
    const handleRating = (value) => {

        if (!checkLogin()) return;

        const data = {
            ...userRating,
            rate: value
        };

        setUserRating(data);

        console.log(data);

        submitRating(data);
    };

    // submit api
    const submitRating = (userRating) => {

        axios.post(
            `http://localhost/laravel8/public/api/blog/rate/${props.id_blog}`, userRating, config
        )
            .then((response) => {

                console.log(response.data);

                alert('Rating successfully!');

            })
            .catch((error) => {

                console.error(error);

                alert('Rating failed!');
            });
    };

    // get average rating
    const getBlogRating = () => {

        axios.get(
            `http://localhost/laravel8/public/api/blog/rate/${props.id_blog}`).then(
                (response) => {

                    const data = response.data.data;

                    let total = 0;

                    for (let i = 0; i < data.length; i++) {
                        total += data[i].rate;
                    }

                    setAverageRating((total / data.length).toFixed(2));


                }
            ).catch(
                (error) => {
                    console.error(error);
                }
            )
    };

    useEffect(() => {

        getBlogRating(); 

    }, []);

    return (
        <div>

            <div className="rating-area">

                <ul className="ratings" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>

                    <li className="rate-this">
                        Rate this item:
                    </li>

                    <Rating
                        onClick={handleRating}
                        initialValue={userRating.rate}
                        size={20}
                        transition
                        fillColor="gold"
                        emptyColor="grey"
                    />

                    <p>Average rating of Blog: {avarageRating}</p>

                </ul>



            </div>

        </div>
    );
}

export default RatingBlog;