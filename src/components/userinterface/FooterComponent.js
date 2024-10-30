import { Grid ,Paper,Button,Box} from "@mui/material"
import { serverURL,getData } from "../../services/FetchNodeServices"
import { Divider } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Twitter } from "@mui/icons-material";
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import { useState,useEffect } from "react";
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function FooterComponent(props){
  const theme = useTheme();
  const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
    const[categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        if(result.status)
        {setCategoryList(result.data)}
    }
         useEffect(function(){
            fetchAllCategory()
         },[])

         const showAllCategory=()=>{
            return categoryList.map((item)=>{
               return<Button  style={{color:'#fff',fontSize:matchesMd?"0.7em":"0.9em"}}>{item.categoryname}</Button>
            })
           } 


           
           var medicines=[{Buy:"Buy Medicines,upload Doctor's Note"}]
         
           const showMedicines=()=>{
            return medicines.map((item)=>{
                return(<div>
                    
                 </div>)
            })
           }

          



 return(<div>
   <Grid container spacing={3} style={{width:'110%',background:'#2c3e50',height:'auto',display:'flex'}}>
   <Grid item md={6} xs={12} >
     <Grid item xs={12} style={{margin:'0px 5px 5px 90px',display:'flex'}}>
     <span style={{fontSize:20,margin:'0px 5px 5px 0px',fontWeight:'bolder',color:'#747d8c'}}>Follow us</span>
   </Grid>    
   
   
   <Grid item xs={12} style={{margin:'15px 5px 5px 90px',display:'flex',color:'#d2dae2'}}>
   
   {<FacebookIcon style={{fontSize:35,marginRight:'2%',display:'flex',borderRadius:50}}/>}
   
   {<InstagramIcon  style={{fontSize:35,marginRight:'2%',display:'flex',borderRadius:50}} />}
   
   {<Twitter  style={{fontSize:35,marginRight:'2%',display:'flex',borderRadius:50}}/>}
   
   {<LinkedInIcon  style={{fontSize:35,marginRight:'2%',display:'flex',borderRadius:50}}/>}
   </Grid>
   <Grid item xs={12} style={{display:'flex',marginTop:30,margin:'15px 5px 5px 90px'}}>
   <Grid item xs={4}>
   <span style={{color:'#747d8c',display:'flex',fontWeight:'bolder',fontSize:matchesMd?"0.9em":"1.3em",marginLeft:10}}>Categories</span>
  <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#d2dae2',marginTop:25}}>{showAllCategory()}</div> 
   </Grid>
   <Grid item xs={4}>
   <span style={{color:'#747d8c',display:'flex',fontWeight:'bolder',fontSize:20,marginLeft:10,flexDirection:matchesMd?'row':<></>,fontSize:matchesMd?"0.9em":"1.3em"}}>Medicine</span>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Buy Medicines</div>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Upload Doctor's Note</div>
   </Grid>
   <Grid item xs={4}>

   <span style={{display:'flex',fontWeight:'bolder',marginLeft:10,color:'#747d8c',fontSize:matchesMd?"0.9em":"1.3em"}}>Other</span>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Offers</div>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Blogs</div>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Terms & Conditions</div>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Privacy Policy</div>
   <div style={{display:'flex',flexDirection:'column',justifyContent:'center',marginRight:70,color:'#fff',marginTop:25}}>Store Locator</div>
   </Grid>
   </Grid>
   </Grid>
   <Grid item md={5} xs={12}>
   <Grid item xs={12} style={{margin:'0px 5px 5px 0px',display:'flex'}} >
     <span style={{fontSize:20,margin:'0px 5px 10px 0px',fontWeight:'bolder',color:'#747d8c'}}  > Download the mobile app</span>
   </Grid>
   
   <Grid item xs={12} style={{height:'10%',display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
   
   {<img src={`${serverURL}/images/play.webp`} style={{width:120,color:'#2c3e50',borderRadius:5,display:'flex',justifyContent:'space-evenly',marginLeft:30}}/>}
   {<img src={`${serverURL}/images/apple.png`} style={{width:120,color:'#2c3e50',borderRadius:5,marginRight:'50%',display:'flex'}}/>}
   </Grid>
   
   
   
   <Grid item xs={12} style={{margin:'0px 5px 5px 5px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
 <Grid item xs={1} style={{marginTop:30,display:'flex'}}>
   <MailOutlinedIcon style={{fontSize:33,color:'#747d8c',display:'flex',alignItems:'center'}}/>
 </Grid>
   <Grid item xs={11}>
   <div style={{fontSize:20,fontFamily:'Bold',color:'#747d8c',marginTop:10,marginBottom:9}}>  Email us  </div>
   <div style={{fontSize:20,fontFamily:'Bold',color:'#d2dae2',display:'flex',marginTop:4}}>Info@MedBazzar.in
   </div>
   
   </Grid>
   </Grid>
   <Grid item xs={12} style={{margin:'0px 5px 5px 5px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
   <Grid item xs={1}>
   <WifiCalling3OutlinedIcon style={{fontSize:33,color:'#747d8c'}}/>
</Grid>
   <Grid item xs={11}>
   <p style={{fontSize:20,fontFamily:'Bold',color:'#747d8c',marginTop:10,marginBottom:9}}>  Give us a missed call 
   <span style={{fontSize:20,fontFamily:'Bold',color:'#d2dae2',display:'flex',marginTop:4}}>18002662247</span>
   </p>
   
   </Grid>
   </Grid>
               <Divider sx={{ bgcolor: "#ced6e0" }}/>
   
   
               <Grid item xs={12}>
   <p style={{fontSize:matchesMd?"0.7em":"1.0em",color:'#747d8c',fontWeight:'bold',fontFamily:'Bold'}}>15 Years Of Trust</p></Grid>
   <Grid item xs={12} style={{marginBottom:25}} >
   <span style={{color:'#ced6e0',wordBreak:"break-word",fontSize:matchesMd?"0.7em":"1.0em",display:'flex',flexWrap:'wrap',padding:15}}>Over the last 15 years, we have touched the lives of lakhs of Indian families by serving them with only 
   the best quality and genuine healthcare products. With over 300+ stores,
    a comprehensive website and an easy-to-use app, it is only true to say that
     
      </span></Grid>
   
   </Grid>
   </Grid>
   
   </div>)
   
   
        
         
}