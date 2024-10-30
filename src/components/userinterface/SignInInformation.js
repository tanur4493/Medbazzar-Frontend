import { Paper ,Grid} from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import { postData } from "../../services/FetchNodeServices"
import { useDispatch } from "react-redux";



import Input from '@mui/material/Input';
import Registration from "./Registration";
import { AssistWalker } from "@mui/icons-material";
import OtpComponent from "./OtpComponent";

export default function SignInInformation(){

var navigate=useNavigate()
const theme = useTheme();
var dispatch=useDispatch()

const [status,setStatus]=useState(true)
const[userData,setUserData]=useState([])
const[otp,setOtp]=useState(0)

const[mobileno,setMobileno]=useState('')
const[userStatus,setUserStatus]=useState(false)

const matches = useMediaQuery(theme.breakpoints.down('md'));

const generateOTP=()=>{
  var myotp=parseInt(Math.random()*8999)+1000
  alert(myotp)
  setOtp(myotp)

}

const handleOTP=async()=>{

  var result=await postData('users/check_userdata',{mobileno:mobileno})
  if(result.status==false)
  {
    generateOTP()
  setStatus(!status)
  setUserStatus(false)
  
  }
  else
  {
    generateOTP()
    setStatus(!status)
   setUserStatus(true)
   setUserData(result.data)
   
   
  }
}
 




    return(<div style={{width:matches?'100vw':'100%',heigth:matches?'100vh':<></>,display:'flex',alignItems:'center',fontFamily:'kanit',justifyContent:'center'}}>

     
    
     {/*{matchesMd?*/}
    
     {status?
      
        <Paper elevation={1} style={{width:matches?'100vw':'80%',borderRadius:30,height:matches?'100vh':'auto',padding:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
           <Grid container spacing={3}>
            <Grid item xs={12} >
             <div style={{fontSize:25,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:5}}>
             Sign in To MedBazzar
             </div>
            <div  style={{fontSize:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
             to access your Adresses, Orders & Wishlist.
             </div>
            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>

            
          
          <Input 
          placeholder="Enter Your Mobile Number"
            id="standard-adornment-amount"
            startAdornment={<InputAdornment position="start">+91 -</InputAdornment>}
            onChange={(e)=>setMobileno(e.target.value)}
          />
        
            
            </Grid>

            <Grid item xs={12}>
              {userStatus?<OtpComponent/>:<></>}
            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
                <div onClick={handleOTP} style={{width:matches?'50%':'80%',height:'230%',background:'#0078ad',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
                   <span    style={{display:'flex',textAlign:'center',color:'white',fontWeight:'bolder'}}>Get OTP </span>
                </div>
            </Grid>

           


            <Grid item xs={12} style={{}}>
              <div style={{fontSize:12,color:'black',display:'flex',justifyContent:'center',alignItems:'center',margin:5,padding:5,marginLeft:15}}>By continuing,you agree to our Terms of service and Privacy & Legal Policy</div>
            </Grid>


           </Grid>
        </Paper>:userStatus?<OtpComponent  mobileno={mobileno} otp={otp} userData={userData} />:<Registration mobileno={mobileno} otp={otp}/>}
        {/*:

        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>


<div elevation={1} style={{width:'100vw',borderRadius:30,height:'100vh',padding:5,alignItems:'center',justifyContent:'center',display:'flex'}}>
<Grid container spacing={3}>
 <Grid item xs={12} >
  <div style={{fontSize:25,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:5}}>
  Sign in To MedBazzar
  </div>
 <div  style={{fontSize:15,display:'flex',justifyContent:'center',alignItems:'center'}}>
  to access your Adresses, Orders & Wishlist.
  </div>
 </Grid>

 <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>

 

<Input 
placeholder="Enter Your Mobile Number"
 id="standard-adornment-amount"
 startAdornment={<InputAdornment position="start">+91 -</InputAdornment>}
/>

 
 </Grid>

 <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
     <div onClick={handleOTP}  style={{width:'80%',height:'230%',background:'#b6cbd5',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <span    style={{display:'flex',textAlign:'center',color:'white',fontWeight:'bolder'}}>Get OTP </span>
     </div>
 </Grid>

 <Grid item xs={12} style={{}}>
   <div style={{fontSize:12,color:'black',display:'flex',justifyContent:'center',alignItems:'center',margin:5,padding:5,marginLeft:15}}>By continuing,you agree to our Terms of service and Privacy & Legal Policy</div>
 </Grid>


</Grid>
</div>
</div>
}*/}



    </div>)
    
}