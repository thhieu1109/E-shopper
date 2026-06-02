import axios from 'axios';
import React, { useState } from 'react';

function Comment(props) {

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

    const [userComment, setComment] = useState({
        id_blog: props.id_blog,
        id_user: user ? user.Auth.id : null,
        name_user: user ? user.Auth.name : null,
        id_comment: props.id_comment || 0,
        comment: '',
        image_user: user ? user.Auth.avatar : null
    });



    const checkLogin = () => {
        if (!user) {
            alert('You need to login first!');
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setComment({
            ...userComment,
            comment: value
        });
    }

    const handleSubmitComment = (e) => {

        e.preventDefault();
        if (!userComment.comment || userComment.comment.trim() === '') {
            alert('Comment is required!');
        } else if (!user) {
            alert('You need to login first!');
        } else {
            // console.log(comment);

            axios.post(`http://localhost/laravel8/public/api/blog/comment/${props.id_blog}`, userComment, config)
                .then(
                    response => {

                        console.log(response.data.data.id_comment);
                        // COMMENT MỚI
                        const newComment = response.data.data;



                        // UPDATE UI NGAY
                        props.setComments(prev => [...prev, newComment]);

                        // RESET TEXTAREA
                        setComment({
                            ...userComment,
                            comment: ''
                        });
                        alert('Comment successfully!');
                    }
                ).catch(error => {
                    console.error('Error submitting comment:', error);
                });


        }
    }

    return (
        <div>
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">

                        <h2>Leave a replay</h2>

                        <div className="text-area">

                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>

                            <span>*</span>

                            <textarea
                                name="message"
                                rows="11"
                                value={userComment.comment}
                                onChange={handleInputChange}
                                onClick={checkLogin}
                            ></textarea>

                            <a className="btn btn-primary" onClick={handleSubmitComment}>
                                Post your comment
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;