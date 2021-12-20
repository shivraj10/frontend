import { Route,Switch} from 'react-router-dom'
import React from 'react'
import {Grid, makeStyles} from "@material-ui/core"
import './index.css';
import "./App.css";

import Login from './components/Login/Login';
import ChatBody from "./components/messenger/Messenger";
import Header from './components/Header/Header'
import AllEvents from './components/TimeTable/AllEvents'
import CreateEvent from './components/CreateEvent/CreateEvent'
import CreateBlog from "./components/blogComponents/create-blog.js";
import ViewBlog from "./components/blogComponents/view-blog.js";
import EditBlog from "./components/blogComponents/edit-blog.js";
import BlogMain from './components/blogComponents/BlogMain';

const App = ()=> {  
  return (
  <div>  
      <Grid container direction={"column"} spacing={10}>
        {
            localStorage.getItem('UserID') &&
            <Grid item xs={12} >
              <Header/>
            </Grid>
        }
        <Grid item xs={12}>  
          <Switch> 
            
            { localStorage.getItem('UserID') ? ( 
              <>
            <Route  path="/events" component={AllEvents} exact/>
            <Route path="/chat">
              <div className="__main">
                <ChatBody />
              </div>
            </Route>
            <Route path="/view-blog/:id" component={ViewBlog} exact/>
            <Route path="/create-blog" component={CreateBlog} exact/>
            <Route path="/edit-blog/:id" component={EditBlog} exact/>
            <Route path="/create-event" component={CreateEvent} exact/>
            <Route path="/" component={BlogMain} exact/>              
            </>
            ): (<>
              <Route  path="/" component={Login} exact/>
            </>)}
          </Switch>
        </Grid>
      </Grid>
  </div>
  );

}

export default App;