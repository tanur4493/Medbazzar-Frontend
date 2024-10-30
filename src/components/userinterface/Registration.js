import { Paper ,Grid,Button} from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OtpInput from 'react-otp-input';
import { useState } from "react";
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch } from "react-redux";
import Input from '@mui/material/Input';
import { postData } from "../../services/FetchNodeServices";
import SignInInformation from "./SignInInformation";


export default function Registration(props){

    const navigate=useNavigate()
    const theme = useTheme();
    var dispatch=useDispatch()
    
    
    const [otp, setOtp] = useState('');
    const[emailId,setEmailId]=useState('')
    const [mobileno, setMobileno] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [status,setStatus]=useState(true)

    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleSubmit=async()=>{
        if(props.otp==otp)
        {      var body={mobileno:props.mobileno,emailid:emailId,username:(firstname+" "+lastname)}
              var result=await postData('users/submit_user',body)
             if(result.status)
             {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are registered now....",
                    showConfirmButton: false,
                    timer: 1500,
                    toast:true
                  });

                  dispatch({type:'ADD_USER',payload:[props.mobileno,body]})
                  navigate('/cart')
             }

            }
            else
            {
               alert("Invalid OTP...")
            }
    }

    const handleChange=()=>{
        setStatus(!status)
        
       }


    return(<div style={{width:matches?'100vw':'100%',heigth:matches?"100%":<></>,display:'flex',alignItems:'center',fontFamily:'kanit',justifyContent:'center',padding:matches?<></>:30,fontFamily:'kanit'}}>
           {status?
        <Paper elevation={1} style={{width:matches?'100vw':'60%',borderRadius:30,height:matches?'100%':'auto',borderRadius:30,padding:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
           <Grid container spacing={2}>
            <Grid item xs={12} >
             <div style={{fontSize:20,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:5}}>
             Welcome To MedBazzar
             </div>
            <div  style={{fontSize:13,display:'flex',justifyContent:'center',alignItems:'center',marginLeft:20}}>
             Please enter your details for a better shopping experience
             </div>
            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:13}}>

            
          
            <TextField label="Enter Your Name*" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setFirstName(e.target.value)} />
        
            
            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:13}}>

            
          
<TextField  label="Enter Last Name (Optional)"  fullWidth onChange={(e)=>setLastName(e.target.value)} variant="standard" />


</Grid>

<Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center',marginLeft:13}}>

            
          
<TextField  label="Enter Email ID (Optional)" variant="standard"  fullWidth  onChange={(e)=>setEmailId(e.target.value)}  />


</Grid>

<Grid item xs={12} >
<div style={{fontSize:20,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:10,marginRight:15}}>
             Verify Phone Number
             </div>
            <div  style={{fontSize:13,display:'flex',justifyContent:'center',alignItems:'center',marginLeft:14}}>
            An SMS with 4-digit OTP was sent to
             </div>
            </Grid>

            <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center'}}  >
                    
                    <span style={{fontWeight:'bold',fontSize:13,display:'flex',justifyContent:'center',alignItems:'center'}} >+91 - {props.mobileno}</span>
                <span>   <Button onClick={handleChange} variant="text" size="small" style={{fontSize:12,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center'}}>Change</Button></span> 

                </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                 
                 <OtpInput
       value={otp}
       onChange={setOtp}
       numInputs={4}
       renderSeparator={<span>-</span>}
       renderInput={(props) => <input {...props} />}
       inputStyle={{width:35,height:35,margin:5}}
      
     />
     
     </Grid>



            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
                <div  style={{width:matches?'80%':'100%',height:'230%',background:'#0078ad',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
                   <span onClick={handleSubmit} style={{display:'flex',textAlign:'center',color:'white',fontWeight:'bolder'}}>Get Started </span>
                </div>
            </Grid>

            <Grid item xs={12} >
              <div style={{fontSize:11,color:'black',display:'flex',justifyContent:'center',alignItems:'center',margin:5,padding:5,marginLeft:15}}>By continuing,you agree to our Terms of service and Privacy & Legal Policy</div>
            </Grid>


           </Grid>
        </Paper>:<SignInInformation/>}

    </div>)
}