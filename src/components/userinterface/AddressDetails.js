import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Grid ,AppBar,Paper,Divider,TextField,Button} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { postData } from '../../services/FetchNodeServices';




export default function AddressDetails(props){
  const theme = useTheme();
   
    const[addressLineOne,setAddressLineOne]=useState('')
    const[addressLineTwo,setAddressLineTwo]=useState('')
    const[state,setState]=useState('')
    const[landmark,setLandMark]=useState('')
    const[city,setCity]=useState('')
    const[pincode,setPinCode]=useState('')
    const[status,setStatus]=useState(false)

    const matches = useMediaQuery(theme.breakpoints.down('md'));


   
    
      const handleClose=()=>{
       props?.setStatus(false)
    
      }

      const handleSubmit=async()=>{
        var body={mobileno:props?.userData?.mobileno,address:addressLineOne+"*"+addressLineTwo,landmark,city,state,pincode}
        var result= await postData('users/submit_user_address',body)
        if(result.status)
        {alert('ok')
       
      
        props.setPageRefresh(!props?.pageRefresh)
      }
        else
        {
          alert('fail')
          props.setStatus(false)
          props.setPageRefresh(!props.pageRefresh)
        }

        
      }


     
    
    const drawerList=()=>{
    return(
    <div

    

style={{width:matches?'100%':350,height:600,fontFamily:'kanit',padding:20,fontFamily:'kanit'}}>
        
           <Grid container spacing={2}>
            <Grid item xs={10} style={{fontSize:23,fontWeight:'bolder',color:'#000'}}>
             
             Add Address
             
            
            </Grid>

            <Grid item xs={2} style={{fontSize:23,fontWeight:'bolder',marginLeft:'auto'}}>
             
             <CloseOutlinedIcon onClick={handleClose} style={{cursor:'pointer'}}/>
             
            
            </Grid>

            <Grid item xs={12} >
             
     <div style={{fontWeight:'bolder',fontSize:18}}>  {props?.userData?.username} </div> 
    <div style={{fontSize:13}}> Enter Your Address Details </div>
             
            
            </Grid>


            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="Address Line One" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setAddressLineOne(e.target.value)} />


</Grid>

<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="Address Line Two" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setAddressLineTwo(e.target.value)} />


</Grid>

<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="Landmark" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setLandMark(e.target.value)} />


</Grid>

<Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="Pin Code." style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setPinCode(e.target.value)} />


</Grid>


<Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="State" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setState(e.target.value)} />


</Grid>


<Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

            
          
<TextField label="City" style={{fontWeight:'bolder'}} fullWidth variant="standard"   onChange={(e)=>setCity(e.target.value)} />


</Grid>

<Grid item xs={12} >
<Button  onClick={handleSubmit} variant="contained"  style={{ fontSize: 12, background:'#0078ad', marginTop: 10, borderRadius: 20,width:'90%' }}>Save & Proceed</Button>
             
</Grid>
 </Grid>
            
</div>
    )
     
    }



return(<div>

<Drawer
           anchor={'right'}
           open={props.status}
            onClose={handleClose}
          >
            {drawerList()}
          </Drawer>

</div>)





  

}