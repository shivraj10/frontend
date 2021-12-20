import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import history from "../../history";

axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = `Bearer ${localStorage.getItem(
            "accessToken"
        )}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const useStyles = makeStyles({
    root: {
        // minWidth: "900px",
        marginTop: "1%",
        marginRight: "2%",
        marginLeft: "2%",
        marginBottom: "1%",
        boxShadow:
            "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px",
    },
    media: {
        height: "50px",
        width: "75vw",
        minWidth: "700px",
    },
});

export default function BlogCard(prop) {
    const classes = useStyles();
    console.log(prop);
    const ViewBtnHandler = () => {
        history.push("/view-blog/" + prop.blogId);

        window.location.reload(false);
    };

    const EditBtnHandler = () => {
        console.log(prop);

        console.log("edit button pressed...");
        history.push("/edit-blog/" + prop.blogId);

        window.location.reload(false);
    };

    const DeleteBtnHandler = () => {
        console.log(prop.blogId);

        console.log("delete button pressed...");

        axios
            .delete(`${process.env.REACT_APP_URL}/blog/deleteblog/` + prop.blogId)
            .then((res) => {
                console.log(res);
                console.log("inside reponce promise");
                prop.setDeleted(prop.blogId)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    if (prop.uid == prop.authorId) {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media} title="" />

                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h5">
                            {prop.titleBlog}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                        >
                            {prop.abstractBlog}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={ViewBtnHandler}
                    >
                        Learn More
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={EditBtnHandler}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        onClick={DeleteBtnHandler}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        );
    } else {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia className={classes.media} title="" />

                    <CardContent>
                        <Typography gutterBottom variant="h4" component="h5">
                            {prop.titleBlog}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            component="p"
                        >
                            {prop.abstractBlog}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions>
                    <Button
                        size="small"
                        color="primary"
                        variant="outlined"
                        onClick={ViewBtnHandler}
                    >
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}
