import React, {useEffect } from "react";
import Comment from "./Comment";
import './Comment.css';
import AddComment from './AddComment'
import axios from 'axios'
import {Grid,Container, Typography} from "@material-ui/core"

axios.interceptors.request.use(
   (config) => {
     config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );

function CommentsContainer(prop) {
   const [comments, setComments] = React.useState([]);
   
   return (
      <Container>
         <Grid container justify="space-between" >
            <Grid item xs={12}>            
            <AddComment comments={comments}  setComments={setComments} />
            </Grid>
            <Grid item>
            <Typography  variant="h4" gutterBottom>
               Comments
            </Typography>
            </Grid>
         </Grid>
         <Comments BlogId={prop.id} comments={comments}  setComments={setComments} />
      </Container>
   )
}

const Comments = (props)=> {
   const [isFetching, setFetching] = React.useState(true);
      
    useEffect(() => {
      async function fetchComments() {
        await axios.get(`${process.env.REACT_APP_URL}/comment/`+props.BlogId).then((res)=>{
            // console.log(res)
            let commentList = res.data.comments;
            // console.log(commentList)
            props.setComments([...commentList]) 
            setFetching(false)
         })    
      }  
      fetchComments()
    }, [])
   
   return isFetching ? "Loading..." : <Comment setComments={props.setComments} comments={props.comments} />;
      
}

export default CommentsContainer