import React from 'react'
import { MuiPickersUtilsProvider,KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from '@material-ui/core/Grid'

export default function DatePicker(props) {

    
    const[ SelectedDate, setSelectedDate]=React.useState(
        new Date() 
    )

    const handleDateChange=(date)=>{
        setSelectedDate(date)
        if(props.datas.type == 'start')
            props.datas.changeStartTime(date)
        else
            props.datas.changeEndTime(date)
    }
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>            
            <Grid item xs={6}>
            <KeyboardTimePicker 
                disablePast
                ampm={false}
                variant="inline"
                inputVariant="outlined"
                id='time-picker'
                margin='normal'
                value={SelectedDate}
                onChange={handleDateChange}
            />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}