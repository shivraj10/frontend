import React, { useState } from "react";
import axios from "axios";
import "./create-blog.css";
import history from '../../history'
axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default function CreateBlog() {

    const [blog, setBlog] = useState({
        titleOfBlog: "",
        abstractOfBlog: "",
        contentOfBlog: "",
    });

    const mySubmitHandler = (e) => {
        e.preventDefault();
        alert('You are submitting "' + blog.titleOfBlog + '" ');

        let body ={ 
            title: blog.titleOfBlog,
            abstraction:blog.abstractOfBlog,
            blog: blog.contentOfBlog,
            username:localStorage.getItem('UserID')
        }
        console.log(blog)
        axios
            .post(`${process.env.REACT_APP_URL}/blog/createblog`, body)
            .then(function (response) {
                console.log("inside reponce promise");
                console.log(response);
                setBlog({})
                history.push('/')                
                window.location.reload(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        if (nam === "titleOfBlog") {
            setBlog({ ...blog, titleOfBlog: val });
        }
        if (nam === "abstractOfBlog") {
            setBlog({ ...blog, abstractOfBlog: val });
        }
        if (nam === "contentOfBlog") {
            setBlog({ ...blog, contentOfBlog: val });
        }
    };

    return (
        <div className="container">
            <form onSubmit={mySubmitHandler}>
                <div className="row">
                    <div className="col-25">
                        <label>Title:</label>
                    </div>
                    <div className="col-75">
                        <input
                            type="text"
                            name="titleOfBlog"
                            value={blog.titleOfBlog}
                            onChange={myChangeHandler}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Abstract:</label>
                    </div>
                    <div className="col-75">
                        <textarea
                            name="abstractOfBlog"
                            value={blog.abstractOfBlog}
                            onChange={myChangeHandler}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-25">
                        <label>Content:</label>
                    </div>
                    <div className="col-75">
                        <textarea
                            name="contentOfBlog"
                            value={blog.contentOfBlog}
                            onChange={myChangeHandler}
                            style={{ height: "300px" }}
                        />
                    </div>
                </div>

                <div className="row">
                    <input type="submit"  value="SUBMIT" />
                </div>
            </form>
        </div>
    );
}
