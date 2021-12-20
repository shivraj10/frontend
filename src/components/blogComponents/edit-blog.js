import React, { useState, useEffect } from "react";
import axios from "axios";
import "./edit-blog.css";
import history from '../../history';


axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
 

export default function EditBlog(prop) {

    const [blog, setBlog] = useState({
        titleOfBlog: "",
        abstractOfBlog: "",
        contentOfBlog: "",
    });

    useEffect(() => {
        console.log("propseditblog>>",prop)
        const edit_blog_id = prop.match.params.id;
        console.log("edit_blog_id",edit_blog_id);
        axios.get(`${process.env.REACT_APP_URL}/blog/viewblog/`+ edit_blog_id)
            .then((res) => {
                console.log(res);
                setBlog({
                    titleOfBlog: res.data.title,
                    abstractOfBlog: res.data.Abstraction,
                    contentOfBlog: res.data.blog,
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);

    const mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(event,blog);
        

         axios
            .put(`${process.env.REACT_APP_URL}/blog/updateblog/`+prop.match.params.id, {
                title: blog.titleOfBlog,
                abstraction:blog.abstractOfBlog,
                blog: blog.contentOfBlog,
                username:localStorage.getItem('UserID')
            })
            .then(function (response) {
                console.log("inside reponce promise");
                console.log(response);
                history.push('/');
                window.location.reload(false);
            })
            .catch((err) => {
                console.log("errot",err);
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
                            autoComplete="off"
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
                            autocomplete="off"
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
                            autoComplete="off"
                        />
                    </div>
                </div>

                <div className="row">
                    <input type="submit" value="SUBMIT" />
                </div>
            </form>
        </div>
    );
}
