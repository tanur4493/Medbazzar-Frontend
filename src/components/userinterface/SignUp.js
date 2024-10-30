import { Button, DialogTitle } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useStyles } from './SignUpCss';
import { useState } from 'react';
import person from '../../assests/person.jpg'
import email from '../../assests/email.jpg'
import mobile from '../../assests/mobile.png'
import password from '../../assests/password.png'
import calender from '../../assests/calender.jpg'
export default function SignUp(){

    const [open,setOpen]=useState(false)
    var classes=useStyles()
   
    const signUp=()=>{
        return(<div>
            <Dialog open={true}
   
   maxWidth={"md"}>

    <DialogTitle>
        <div className={classes.container}>
        <div className={classes.header}>
        <div className={classes.text} >
           Sign Up
        </div>
        <div className={classes.underline}></div>

        </div>

        </div>
    </DialogTitle>

    <DialogContent>
    <div className={classes.inputs}>
    <div className={classes.input} >
<img src={person} style={{width:15,height:15,marginLeft:10}}/>
<input   className={classes.textbox} type="text" placeholder='Enter Your Name'/>
    </div>

    <div className={classes.input}>
    <img src={email} style={{width:18,height:18,marginLeft:10}}/>
<input className={classes.textbox}  type="email" placeholder='Email Id'/>
    </div>

    <div className={classes.input} style={{display:'flex'}}>
    <img src={mobile} style={{width:18,height:18,margin:'0px,300px',display:'flex',marginLeft:10}}/>
<input className={classes.textbox} type="text" placeholder='+91 Mobile Number'/>
    </div>

    <div className={classes.input}>
    <img src={password} style={{width:18,height:18,marginLeft:10}}/>
<input className={classes.textbox}  type="password" placeholder='Password'/>
    </div>

    <div className={classes.input}>
    <img src={calender} style={{width:18,height:18,marginLeft:10}}/>
<input className={classes.textbox} type="text" placeholder='Date Of Birth'/>
    </div>

    </div>

   
        
    </DialogContent>

    <DialogActions>
    
        <Button variant="contained" fullWidth>Register</Button>
        
        
        
    </DialogActions>









   </Dialog>


        </div>)
        
    
    }
   
   
   
   
   
   
   
   
   
   return(<div  className={classes.root}>
    
        {signUp()}
        
     </div>)
}