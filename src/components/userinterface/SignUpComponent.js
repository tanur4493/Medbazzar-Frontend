import { DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useStyles } from './SignUpCss';
import { useState } from 'react';
import {Grid,TextField ,Box,Button} from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import VibrationOutlinedIcon from '@mui/icons-material/VibrationOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

export default function SignUpComponent(){
    const [open,setOpen]=useState(false)
    const [name,setName]=useState('')
    const [mail,setMail]=useState('')
    const [number,setNumber]=useState('')
    const [password,setPassword]=useState('')
    const [birth,setBirth]=useState('')
    var classes=useStyles()


    const signUp=()=>{
        return(<div>

<Dialog open={true}
   
    maxWidth={"md"}
    >

        <DialogTitle style={{display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'kanit',color:'grey'}}>
            Signup With
        </DialogTitle>

       
               

        <DialogContent>
        <div className={classes.box}>
            <Grid container spacing={3} >
            <Grid item xs={12}>
        
       
            <TextField
                fullWidth
                
                label="Enter Your Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <PermIdentityOutlinedIcon  style={{color:'grey'}}/>
                  ),
                }}
              />
       
        
      </Grid>

      <Grid item xs={12}>
        
       
            <TextField
                fullWidth
                variant="outlined"
                label="Your Email Address*"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <EmailOutlinedIcon style={{color:'grey'}}/>
                  ),
                }}
              />
       
        
      </Grid>

      <Grid item xs={12}>
        
       
            <TextField
                fullWidth
                variant="outlined"
                label="+91 Mobile Number*"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <  VibrationOutlinedIcon style={{color:'grey'}} />
                   
                  ),
                }}
              />
       
        
      </Grid>

      <Grid item xs={12}>
        
       
            <TextField
                fullWidth
                variant="outlined"
                label="Choose Password*"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <LockOutlinedIcon style={{color:'grey'}} />
                  ),
                }}
              />
       
        
      </Grid>

      <Grid item xs={12} >
        
       
            <TextField 
                fullWidth
                variant="outlined"
                label="Date Of Birth"
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                InputProps={{
                  startAdornment: (
                    < CalendarMonthOutlinedIcon style={{color:'grey'}} />
                  ),
                }}
              />
       
        
      </Grid>


      <Grid item xs={12} >

        <Button fullWidth variant="contained">
            Register
        </Button>
      </Grid>

     
                
                
                
                </Grid>
                </div>

        </DialogContent>
           

    </Dialog>
        

       </div> )

 }

 return(<div  className={classes.root}>
    
    {signUp()}
    
 </div>)
}