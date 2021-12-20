import React, {useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  IconButton
} from "@material-ui/core";
import axios from "axios"

import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  fonts: {
    fontWeight: "bold"
  },
  inline: {
    display: "inline"
  }
}));

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



const Comment = ({ setComments,comments }) => {
  const classes = useStyles();
  const [clickedId, setclickedId] = useState(null);

useEffect(() => {

    if(clickedId)
      {
        axios
        .delete(`${process.env.REACT_APP_URL}/comment/`+clickedId)
        .then((res) => {
            console.log(res);
            console.log("inside reponce promise");
        })
        .catch((err) => {
            console.log(err);
        });

      setComments(comments.filter(function( obj ) {
        return obj._id !== clickedId ;
        }))
    }
},[clickedId])


  return (
    <List className={classes.root}>
      {comments.map(comment => <CommentRow setclickedId={setclickedId} key={comment.id} comment={comment} />)}
    </List>
  );
};

const CommentRow = ({setclickedId,comment}) => {
  const classes = useStyles();

console.log(comment);
return (
  <>
    <ListItem key={comment?.id} alignItems="flex-start">
      <ListItemText
        primary={
          <Typography className={classes.fonts}>
            {comment?.name}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {comment.email.split("@")[0]}
            </Typography>
            {` - ${comment?.commentText}`}
          </>
        }
      />
      {
        localStorage.getItem("UserID") == comment.email.split("@")[0] &&  
        
          <IconButton onClick={()=> setclickedId(comment._id)}>
            <DeleteIcon color="secondary"/>
          </IconButton>
        
      }
    </ListItem>
    <Divider />
    
  </>
);

}


export default Comment;