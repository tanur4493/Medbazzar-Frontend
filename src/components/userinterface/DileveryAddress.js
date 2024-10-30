import { Grid,Divider,Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { returnFirstArg } from "html-react-parser/lib/utilities";
import { useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { postData } from "../../services/FetchNodeServices";


export default function DileveryAddress(props){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    var userData= Object.values(useSelector(state=>state.user))[0]
    const[status,setStatus]=useState()

    const showAllAddress=(userAddress)=>{
        return userAddress?.map((item)=>{
            return <div style={{display:'flex',flexDirection:'column',padding:matches?<></>:5,marginLeft:matches?<></>:5,fontSize:matches?15:<></>}}>
          <div>{item?.address}</div>
          <div>{item?.landmark}</div>
          <div>{item?.state},{item?.city} {item?.pincode}</div>
            </div>
        })
    }

    const check_user_address=async()=>{
        

        if(userData?.mobileno==undefined)
        {setStatus(false)}
        else
        {

        var result=await postData('users/check_user_address',{mobileno:props?.userAddress?.mobileno})
        if(result.status==false)
        {
          setStatus(true)
        
        }
        else
        {
            setStatus(false)
           
            
          
        }

    }
      }

      useEffect(function(){
        check_user_address()
      },[userData?.mobileno,props?.pageRefresh])


      const handleOpen=()=>{
        props.setStatus(!props.status)
      }
      


    
    return(<div style={{width:'100%',height:'auto'}}>
    {status?<div style={{display:'flex',border:'solid 1px #00000021',height:'auto',borderRadius:15,padding:10,fontFamily:'kanit'}}>
 <Grid container spacing ={3}>

    <Grid item xs={12} style={{fontSize:matches?20:16,fontWeight:'bolder',marginLeft:15,alignItems:'center',display:'flex',marginTop:10,justifyContent:matches?'center':<></>}}>
        Dilevery Address
    </Grid>

    <Grid item xs={12} >
    <Divider />
    </Grid>

    <Grid item md={6} xs={12}  style={{fontSize:matches?10:13,fontWeight:'bolder',alignItems:'center',display:'flex',justifyContent:matches?'center':<></>}}>
    {props?.userAddress?.length==0?<span>
     Please add your address to continue</span>:<div>
        <div style={{display:'flex',flexDirection:'column',padding:matches?<></>:5,marginLeft:matches?<></>:3,fontSize:matches?15:<></>}}>{props?.userData?.username}</div>
      <div> {showAllAddress(props?.userAddress)}</div>
        </div>}
    </Grid>

    <Grid item md={6} xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       

        <Button  startIcon={<AddIcon/>} variant="contained" onClick={handleOpen} style={{display:'flex',borderRadius:30,padding:matches?<></>:10,marginLeft:matches?<></>:'auto',fontFamily:'kanit',fontSize:'.8vw',fontWeight:'bolder',justifyContent:'center',alignItems:'center',marginBottom:10,width:'9vw',height:'4vh'}}>
         Add Address
        </Button>

    </Grid>



</Grid>
</div>:<div></div>}

    </div>)
}