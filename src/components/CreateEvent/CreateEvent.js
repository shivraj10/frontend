import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import {Grid, Paper, Typography, Avatar} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DatePicker from './DatePicker'
import TimePicker from './TimePicker'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios"

axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem("accessToken")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


const paperStyle={padding:'30px 20px', width:600, margin:"30px auto"}

class CreateEvent extends Component {
	constructor(props) {
		super(props)

		this.state = {
            title:'',
            eventType:'quiz',
			googleLink: '',
            startDate:new Date(),
            startTime:new Date(),
            endDate:new Date(),
            endTime:new Date()            
            
		};
        this.changeHandler = this.changeHandler.bind(this);
        this.handleStartDateTimeChange = this.handleStartDateTimeChange.bind(this);
        this.handleEndDateTimeChange = this.handleEndDateTimeChange.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
	}

    onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
      }

	changeHandler = e => {
        e.preventDefault()
		this.setState({ [e.target.name]: e.target.value })        
	}

    handleStartDateTimeChange(date) {
        this.setState({
          startTime: date
        })
      }
    handleEndDateTimeChange(date) {
        this.setState({
          endTime: date
        })
    }

	submitHandler = e => {
		e.preventDefault()
        let Title=this.state.title;
        let GoogleLink=this.state.googleLink;
        if(Title.length < 1)
        {
            alert("Title must not be empty");
        }
        else if(GoogleLink.length < 1)
        {
            alert("Google Link must not be empty");
        }
        else{
            alert("Submitted")
        }

        let data= this.state
        console.log(data);
        let startdate = data.startDate
        let startTime = data.startTime
        let date = startdate.getFullYear()+'-'+(startdate.getMonth()+1)+'-'+startdate.getDate();
        let time = startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds();
        console.log(date,time);
        console.log(new Date(date+' '+time))
         let sDate = new Date(date+' '+time)
        let endDate = data.endDate
        let endTime = data.endTime
        date = endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate();
        time = endTime.getHours() + ":" + endTime.getMinutes() + ":" + endTime.getSeconds();

         let eDate = new Date(date+' '+time)
        const body = {
            name:data.title,
            isQuiz :data.eventType =='quiz'?true :false,
			link:data.googleLink,
            startDate:sDate,
            endDate:eDate            
		};
        console.log(body);

        axios
        .post(`${process.env.REACT_APP_URL}/event/insert`, body)
        .then(function (response) {
            console.log("inside reponce promise");
            console.log(response);
            this.resetForm()
        })
        .catch((err) => {
            console.log(err);
        });
		
	}
    onRadioChange = (e) => {
        this.setState({
          eventType: e.target.value
        });
    }

    resetForm = () => {
        this.setState({ 
            title:'',
            eventType:'quiz',
			googleLink: '',
            startDate: new Date(),
            endDate: new Date(),
            startTime: new Date(),
            endTime: new Date()
        });
    }

    changeStartDate(item)
    {
        this.setState({startDate:item})
    }
    changeEndDate(item)
    {
        this.setState({endDate:item})
    }
    changeStartTime(item)
    {
        this.setState({startTime:item})
    }
    changeEndTime(item)
    {
        this.setState({endTime:item})
    }
	render() {
		const {  eventType } = this.state
		return (
            <Grid>
			<Paper elevation={20} style={paperStyle}>
                    <Grid align='center' >
                        <Avatar style={{backgroundColor:'#5c6bc0'}}>
                        <AddCircleIcon/>
                        </Avatar>
                        <h1 > Create Event</h1>
                    </Grid>

			    <form  onSubmit={this.submitHandler} >  
                <Grid align='left' >     
                    <Typography style={{color:'#757575'}}  variant="body1" gutterBottom >Event Title</Typography>                
					<Grid >
                        <TextField
                        fullWidth
                        variant="outlined"
                        label=""
                        name="title"
                        value={this.state.title}
                        onChange={this.changeHandler}
                        >                      
                        </TextField>
                    </Grid> 

                    <Grid  item xs={12}>
                    <Typography  style={{color:'#757575' , marginTop:5,marginBottom:0 }} size="large" variant="body1" gutterBottom >Event Type</Typography>
                        <FormControl component="fieldset">
                            <FormLabel component="legend"></FormLabel>
                            <RadioGroup row aria-label="gender" name="gender1" value={eventType} onChange={this.onRadioChange}>
                                <FormControlLabel value="quiz" control={<Radio />} label="Quiz" />
                                <FormControlLabel value="session" control={<Radio />} label="Session" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Typography style={{color:'#757575', marginTop:5}}  variant="body1" gutterBottom >Google Link</Typography>                
                    <Grid>
                        <TextField
                        fullWidth
                        variant="outlined"
                        label=""
                        name="googleLink"
                        value={this.state.googleLink}
                        onChange={this.changeHandler}
                        >                      
                        </TextField>
                    </Grid>
                    <Typography style={{color:'#757575'}}  variant="body1" gutterBottom >Start Date</Typography>                
                    <Grid xs={6}>
                        <DatePicker datas={
                            { startDate:this.state.startDate,changeStartDate:this.changeStartDate.bind(this),type:'start'}
                        }/>
                    </Grid >
                    <Typography style={{color:'#757575'}}  variant="body1" gutterBottom >Start Time</Typography>                
                    <Grid xs={6}>
                        <TimePicker datas={
                            { startTime:this.state.startTime,changeStartTime:this.changeStartTime.bind(this),type:'start'}
                        }/>
                    </Grid>
                    <Typography style={{color:'#757575'}}  variant="body1" gutterBottom >End Date</Typography>                
                    <Grid xs={6}>
                        <DatePicker datas={
                            { endDate:this.state.endDate,changeEndDate:this.changeEndDate.bind(this),type:'end'}
                        }/>
                    </Grid>
                    <Typography style={{color:'#757575'}}  variant="body1" gutterBottom >End Time</Typography>                
                    <Grid xs={6}>
                        <TimePicker datas={
                            { endTime:this.state.endTime,changeEndTime:this.changeEndTime.bind(this),type:'end'}
                        }/>
                    </Grid>
                    <Grid align='center'>
                        <Button  size="large" variant="contained" color="primary" onClick={ this.submitHandler} >Submit</Button>
                        <Button style={{marginLeft:20}} size="large" variant="contained" color="secondary" onClick={()=> this.resetForm() }  >Reset</Button>
                    </Grid>
                </Grid>
				</form>
			</Paper>
            </Grid>
		)
	}
}

export default CreateEvent