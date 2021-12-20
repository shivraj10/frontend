import React from 'react'
import { TextField ,IconButton,Grid} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from "axios"
import { useParams } from 'react-router';


axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
 

function AddComment(props) {
   const [comment,setComment] = React.useState("")
   const params  =  useParams()

   const handleChange =(event) => {
      setComment(event.target.value)
   }
   //console.log(props.comments)

   const resetAndSubmit =() => {
      //console.log(props.comments)
      axios.post(`${process.env.REACT_APP_URL}/comment/`, {
                commentText:comment,
                blogId:params.id
            })
            .then(function (res) {
                props.setComments([...props.comments,res.data.commentSaved])
                //console.log("Successfull")
                console.log(res);
                setComment("")
               //  window.location.reload(false)
            })
            .catch((err) => {
                //console.log(err);
            });
   }
   return (
      <form noValidate autoComplete="off">
         <Grid container>
            <Grid item xs={11}>
            <TextField
               label="Comment"
               variant="outlined"
               color="primary"
               value ={comment}
               onChange={handleChange}
            />
            </Grid>

            <Grid item xs={1}>
                  <IconButton onClick={resetAndSubmit}>
                  <SendIcon fontSize="large" />
                  </IconButton>
            </Grid>
        </Grid>
      </form>
   )
}

export default AddComment
