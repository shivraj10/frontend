import React, { useEffect} from 'react';
import './AllEvents.css';
import events from '../../data/events';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {  format } from 'date-fns'
import moment from 'moment'

const localizer = momentLocalizer(moment)

export default function AllEvents(props){
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [link, setLink] = React.useState('');
  const [data, setEvent] = React.useState(events);

  useEffect(() => {
    async function fetchMyEvents() {
      let headers = { 
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer '+ localStorage.getItem('authorization')
                    }
      let response = await fetch(`${process.env.REACT_APP_URL}/event`,{headers})
      response = await response.json()
      response.forEach(event => {
        event.startDate = new Date(event["startDate"])
        event.endDate = new Date(event["endDate"])
      })
      setEvent([...data,...response]) 
      console.log(response)
    }


    fetchMyEvents()
  }, [])


  const onSelect = (event) =>{
    setTitle(event.name)
    setLink(event.link)
    setStart(moment(event.startDate).format("DD MMMM YYYY, hh:mm A"));
    setEnd(moment(event.endDate).format("DD MMMM YYYY, hh:mm A"))
    setOpen(true);
    console.log(event);
    console.log(moment(event.startDate).format("DD MMMM YYYY, HH:mm"),moment(event.endDate).format("DD MMMM YYYY, HH:mm"));
    
  }
  
  const handleClose = () => {
    setTitle('')
    setStart('');
    setEnd('')
    setLink('');
    setOpen(false);
  };

  return(
  <div >
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="startDate"
      endAccessor="endDate"
      style={{ height:'75vh', width:'75vw' , margin:'4vh auto' }}
      views={['month']}
      titleAccessor='name'
      onSelectEvent={onSelect}
      popup
      selectable
      toolbar
    />
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <span className='label'>Start:</span><span> {start}</span><br/>
          <span className='label'>End:</span><span> {end}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> window.open(`https://${link}`, "_blank")} color="primary">
            Join Now
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
  </div>
);
}