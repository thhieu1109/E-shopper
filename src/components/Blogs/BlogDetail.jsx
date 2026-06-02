import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentList from './CommentList';
import Rating from './RatingBlog';
import RatingBlog from './RatingBlog';

function BlogDetail(props) {

    const [blogDetail, setBlogDetail] = useState({});

    const [comments, setComments] = useState([]);

    const blogId = props.id;

    let params = useParams()
    // Returns an object of key/value-pairs of the dynamic params from the current URL that were matched by the routes. 
    // Child routes inherit all params from their parent routes.
    // Assuming a route pattern like /posts/:postId is matched by /posts/123 then params.postId will be "123".

    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/blog/detail/' + params.id).then(
            res => {
                setBlogDetail(res.data.data);
                
                //data là field chứa dữ liệu trả về từ API, trong đó có trường data chứa chi tiết của blog. Vì vậy, để lấy chi tiết của blog, ta truy cập vào res.data.data.
                console.log(res.data.data);

                setComments(res.data.data.comment);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }, [])

    const renderBlogDetail = () => {
        if (Object.keys(blogDetail).length > 0) {
            return (
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>

                    <div className="single-blog-post">
                        <h3>{blogDetail.title}</h3>

                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> {blogDetail.id_auth}</li>
                                <li><i className="fa fa-clock-o"></i> {blogDetail.created_at}</li>
                                <li><i className="fa fa-calendar"></i> {blogDetail.created_at}</li>
                            </ul>

                            <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>

                        <a href="/">
                            <img
                                src={
                                    "http://localhost/laravel8/public/upload/blog/image/" +
                                    blogDetail.image
                                }
                                alt={blogDetail.title}
                            />
                        </a>


                        <div
                            dangerouslySetInnerHTML={{
                                __html: blogDetail.content
                            }}
                        ></div>


                        <br />

                        <p>
                            {blogDetail.description}
                        </p>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="/">Pre</a></li>
                                <li><a href="/">Next</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="col-sm-9">
                {renderBlogDetail()}

                <RatingBlog  id_blog={params.id}/>

                <div className="socials-share">
                    <a href="/">
                        <img src="/images/blog/socials.png" alt="" />
                    </a>
                </div>

                <div className="media commnets">
                    <a className="pull-left" href="/">
                        <img
                            className="media-object"
                            src="/images/blog/man-one.jpg"
                            alt=""
                        />
                    </a>

                    <div className="media-body">
                        <h4 className="media-heading">Annie Davis</h4>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>

                        <div className="blog-socials">
                            <ul>
                                <li>
                                    <a href="/">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i className="fa fa-dribbble"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="/">
                                        <i className="fa fa-google-plus"></i>
                                    </a>
                                </li>
                            </ul>

                            <a className="btn btn-primary" href="/">
                                Other Posts
                            </a>
                        </div>
                    </div>
                </div>

                <CommentList dataComments={comments}  setComments={setComments}/>


                <Comment id_blog={params.id} comments={comments} setComments={setComments} />
                {/* Do đã sử dụng useParams bên trên để lấy id của blog, nên khi truyền props cho component Comment, ta sẽ truyền params.id thay vì props.id.
                   Vì params.id đã chứa giá trị id của blog được lấy từ URL, nên ta có thể sử dụng nó trực tiếp để truyền vào Comment mà không cần phải sử dụng props.id nữa. */}
            </div>
        </div>
    );
}

export default BlogDetail;