import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BlogIndex(props) {

    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost/laravel8/public/api/blog')
            .then(res => {
                setBlogList(res.data.blog);

            }
            ).catch(
                err => {
                    console.log(err);
                }
            )
    }, [])


    const renderBlogList = () => {

        if (Object.keys(blogList).length > 0) {
            return blogList.data.map((blog, index) => {
                return (
                    <div className="single-blog-post">
                        <h3>{blog.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> {blog.author}</li>
                                <li><i className="fa fa-clock-o"></i> {blog.time}</li>
                                <li><i className="fa fa-calendar"></i> {blog.date}</li>
                            </ul>
                            <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <a href="">
                            <img src={`http://localhost/laravel8/public/upload/Blog/image/${blog.image}`} alt={blog.title}></img>
                        </a>
                        <p>{blog.excerpt}</p>
                       
                        <Link to={`/blog/detail/${blog.id}`} className="btn btn-primary">Read More</Link>
                    </div>
                )
            })
        }
    }



    return (

        <div className='col-sm-9 padding-right'>
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>

                {renderBlogList()}



                <div className="pagination-area">
                    <ul className="pagination">
                        <li><a href="" className="active">1</a></li>
                        <li><a href="">2</a></li>
                        <li><a href="">3</a></li>
                        <li><a href=""><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>

    );
}

export default BlogIndex;