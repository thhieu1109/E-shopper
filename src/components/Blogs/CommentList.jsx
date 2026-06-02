import React, { useState } from 'react';
import Comment from './Comment';

function CommentList({ dataComments, setComments }) {

    const [replyId, setReplyId] = useState(null);

    // tìm id comment cha để tách riêng ra, chọn dc id cha r thì ms map comment con bên trong cho đúng
    const parentComments = dataComments.filter(
        item => item.id_comment === 0
    );

    const renderComments = () => {

        if (!dataComments || dataComments.length === 0) {
            return <p>No comments yet.</p>;
        }

        // map comment cha xong bên trong map comment con
        return parentComments.map((parent, index) => {

            // lấy id của comment con theo id cha  rồi map comment con theo id comment con bên dưới
            const childComments = dataComments.filter(
                item => item.id_comment === parent.id
            );


            // map comment con
            const renderChildComments = () => {
                return childComments.map((childComment) => {

                    return (

                        <div
                            key={childComment.id}
                            className="media second-media"
                            style={{
                                marginLeft: "80px",
                                marginTop: "30px"
                            }}
                        >

                            <a className="pull-left" href="/">
                                <img
                                    className="media-object"
                                    src={
                                        "http://localhost/laravel8/public/upload/user/avatar/" +
                                        childComment.image_user
                                    }
                                    alt=""
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        objectFit: "cover",
                                        borderRadius: "50%"
                                    }}
                                />
                            </a>

                            <div className="media-body">

                                <ul className="sinlge-post-meta">

                                    <li>
                                        <i className="fa fa-user"></i>
                                        {childComment.name_user}
                                    </li>

                                    <li>
                                        <i className="fa fa-clock-o"></i>
                                        {childComment.created_at}
                                    </li>

                                </ul>

                                <p>
                                    {childComment.comment}
                                </p>




                            </div>



                        </div>
                    )
                })
            }

            return (

                <li className="media" key={parent.id}>

                    {/* COMMENT CHA */}
                    <a className="pull-left" href="/">
                        <img
                            className="media-object"
                            src={
                                "http://localhost/laravel8/public/upload/user/avatar/" +
                                parent.image_user
                            }
                            alt=""
                            style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover",
                                borderRadius: "50%"
                            }}
                        />
                    </a>

                    <div className="media-body">

                        <ul className="sinlge-post-meta">

                            <li>
                                <i className="fa fa-user"></i>
                                {parent.name_user}
                            </li>

                            <li>
                                <i className="fa fa-clock-o"></i>
                                {parent.created_at}
                            </li>

                        </ul>

                        <p>
                            {parent.comment}
                        </p>

                        <button
                            className="btn btn-primary"
                            onClick={() => setReplyId(parent.id)}
                        >
                            Reply
                        </button>

                        {/* FORM REPLY */}
                        {/* component comment chính là form để tạo comment con
                        thao tác như tạo comment cha nhưng set id cho comment con bằng comment cha */}
                        {
                            replyId === parent.id && (

                                <div style={{ marginTop: '20px' }}>

                                    <Comment
                                        id_blog={parent.id_blog}
                                        id_comment={parent.id}
                                        setComments={setComments}
                                    />

                                </div>
                            )
                        }

                        {renderChildComments()}



                    </div>

                </li>
            )
        });
    }

    return (
        <div>

            <div className="response-area">

                <h2>
                    {dataComments ? dataComments.length : 0} RESPONSES
                </h2>

                <ul className="media-list">

                    {renderComments()}

                </ul>

            </div>

        </div>
    );
}

export default CommentList;