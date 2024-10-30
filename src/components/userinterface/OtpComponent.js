import { Paper ,Grid,Button} from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import OtpInput from 'react-otp-input';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import Input from '@mui/material/Input';
import SignInInformation from "./SignInInformation";

export default function OtpComponent(props){
   
  var navigate=useNavigate('')
  const theme = useTheme();
  var dispatch=useDispatch()
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));

    const [otp, setOtp] = useState('');
    const [status,setStatus]=useState(true)

    const handleVerifyOtp=()=>{
      if(otp==props.otp)
      {
        dispatch({type:'ADD_USER',payload:[props?.mobileno,props?.userData]})
        navigate('/cart')
      }
      else
      {
        alert("Invalid otp....")
      }
    }




    return(<div style={{width:'78%',height:'105%',display:'flex',alignItems:'center',fontFamily:'kanit'}}>
           {status?
        <Paper elevation={1} style={{width:'90%',borderRadius:30,height:'auto',padding:5}}>
           <Grid container spacing={3}>
           <Grid item xs={12} >
             <div style={{fontSize:25,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:5}}>
             Verify Phone Number
             </div>
            <div  style={{fontSize:15,display:'flex',justifyContent:'center',alignItems:'center',padding:10}}>
            An SMS with 4-digit OTP was sent to
             </div>
            </Grid>

            <Grid item xs={12} fullWidth style={{display:'flex',justifyContent:'center',alignItems:'center'}}  >
                    
                    <div style={{fontWeight:'bold',fontSize:15,margin:5}} >+91 -{props.mobileno} </div>
                    <Button onClick={()=>setStatus(!status)} size="small" variant="text" >change</Button>

            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
                 
                 <OtpInput
       value={otp}
       onChange={setOtp}
       numInputs={4}
       renderSeparator={<span>-</span>}
       renderInput={(props) => <input {...props} />}
       inputStyle={{width:40,height:40,margin:5}}
      
     />
     
     </Grid>



            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
                <div onClick={handleVerifyOtp} style={{width:'80%',height:'230%',background:'#0078ad',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center',cursor:'pointer'}}>
                   <span style={{display:'flex',textAlign:'center',color:'white',fontWeight:'bolder'}}>Verify</span>
                </div>
            </Grid>

            

            <Grid item xs={12} style={{}}>
              <div style={{fontSize:12,color:'black',display:'flex',justifyContent:'center',alignItems:'center',margin:5,padding:5,marginLeft:15}}>By continuing,you agree to our Terms of service and Privacy & Legal Policy</div>
            </Grid>


           </Grid>
        </Paper>:<SignInInformation/>}

       {/* <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

<div elevation={1} style={{width:'100vw',borderRadius:30,height:'100vh',padding:5,display:'flex',justifyContent:'center',alignItems:'center'}}>
<Grid container spacing={3}>
<Grid item xs={12} >
  <div style={{fontSize:25,fontWeight:'bolder',display:'flex',justifyContent:'center',alignItems:'center',marginTop:5}}>
  Verify Phone Number
  </div>
 <div  style={{fontSize:15,display:'flex',justifyContent:'center',alignItems:'center',padding:10}}>
 An SMS with 6-digit OTP was sent to
  </div>
 </Grid>

 <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:20}}>
      
      <OtpInput
value={otp}
onChange={setOtp}
numInputs={4}
renderSeparator={<span>-</span>}
renderInput={(props) => <input {...props} />}
inputStyle={{width:40,height:40,margin:5}}

/>

</Grid>



 <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:50}}>
     <div style={{width:'45%',height:'230%',background:'#0078ad',borderRadius:30,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <span style={{display:'flex',textAlign:'center',color:'white',fontWeight:'bolder'}}>Get Started </span>
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