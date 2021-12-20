import "./BlogMain.css";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import BlogCard from "./blog-card.js";
import axios from "axios";

axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default function BlogMain() {
    const [blogs, setBlogs] = useState([]);
    const [deleted, setDeleted] = useState(null);

    let userid = localStorage.getItem("UserID");



    useEffect(() => {

        console.log("fetch blogs");
        axios
            .get(`${process.env.REACT_APP_URL}/blog/viewblog`)
            .then((res) => {
                console.log(res);
                setBlogs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {

        if(deleted)
          {
                
          setBlogs(blogs.filter(function( obj ) {
            return obj.id !== deleted;
            }))
        }
    },[deleted])

    return (
        <div className="App">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {blogs.map((value, index) => {
                    return (
                        <Grid key={index} item xl={12}>
                            <BlogCard
                                setDeleted={setDeleted}
                                key={value.id}
                                titleBlog={value.title}
                                abstractBlog={value.Abstraction}
                                contentBlog={value.blog}
                                uid={userid}
                                authorId={value.username}
                                blogId={value.id}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </div>
    );
}
