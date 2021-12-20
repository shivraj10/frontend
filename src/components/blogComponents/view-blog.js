import React,{useState,useEffect} from "react";
import "./view-blog.css";
import axios from 'axios'
import CommentsContainer from '../Comments/CommentsContainer'

axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const ViewBlog = (prop) => {
    const [blog, setBlog] = useState({
        titleOfBlog: "",
        abstractOfBlog: "",
        contentOfBlog: "",
    });

    useEffect(() => {
        console.log("props>>",prop)
        const edit_blog_id = prop.match.params.id;
        console.log("edit_blog_id",edit_blog_id);
        axios
            .get(`${process.env.REACT_APP_URL}/blog/viewblog/`+ edit_blog_id)
            .then((res) => {
                console.log(res);
                setBlog({
                    titleOfBlog: res.data.title,
                    abstractOfBlog: res.data.Abstraction,
                    contentOfBlog: res.data.blog,
                    username : res.data.username
                })
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);


    return(
            <div className="WholeBody">
                <div className="TitleInfo">
                    <h1>{blog.titleOfBlog}</h1>
                </div>

                <div className="DateInfo">
                    <p> {blog.date}</p>
                </div>

                <div className="AbstractInfo">
                    <p>{blog.abstractOfBlog}</p>
                </div>

                <div className="ContentInfo">
                    <p>{blog.contentOfBlog}</p>
                </div>

                <div className="AuthorInfo">
                    <blockquote>
                        <p>Created by</p>
                        <p className="AuthorName"> - {blog.username} </p>
                    </blockquote>
                </div>
                <CommentsContainer id={prop.match.params.id}/>
            </div>
        );
}

export default ViewBlog
