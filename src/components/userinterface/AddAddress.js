import Drawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Grid ,AppBar,Paper,Divider} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import GpsFixedOutlinedIcon from '@mui/icons-material/GpsFixedOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';




export default function AddAddress(props){
  const theme = useTheme();
    const[status,setStatus]=useState(false)

    const matches = useMediaQuery(theme.breakpoints.down('md'));


    const handleDrawer=()=>{
        setStatus(true)
      }
    
      const handleClose=()=>{
        setStatus(false)
      }


      const searchBarComponent=()=>{
        return (
            <Paper
           
          
            component="form"
            sx={{  display: 'flex',  alignItems: 'center', width: '95%',borderRadius:15}}
          >
          
            <InputBase

            style={{color:'black'}}
            
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for area , landmark"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon  />
           
            </IconButton>

            </Paper>
            
          
        );
    
      }
    
    const drawerList=()=>{
    return(
    <div

    

style={{width:matches?'100%':350,height:600,fontFamily:'kanit',padding:20,fontFamily:'kanit',color:'#0c5273'}}>
        
           <Grid container spacing={3}>
            <Grid item xs={10} style={{fontSize:23,fontWeight:'bolder'}}>
             
             Add Address
             
            
            </Grid>

            <Grid item xs={2} style={{fontSize:23,fontWeight:'bolder',marginLeft:'auto',color:'#0c5273'}}>
             
             <CloseOutlinedIcon onClick={handleClose} style={{cursor:'pointer'}}/>
             
            
            </Grid>

            <Grid item xs={12} style={{fontSize:12,fontWeight:'bolder'}}>
             
             To add a new address,search for your area,landmark,streetname or apartment
             
            
            </Grid>

            <Grid item xs={12} >
             
            {searchBarComponent()}
             
            
            </Grid>

            <Grid item xs={12} style={{display:'flex', justifyContent:'space-around'}} >
             
             <Divider style={{width:'40%',height:5,margin:5}}></Divider> Or  <Divider style={{width:'40%',height:5,margin:5}}></Divider>
              
             
             </Grid>

             <Grid item xs={1} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
              <GpsFixedOutlinedIcon size="small" style={{display:'flex',color:'#0c5273'}}/>
              </Grid>

              <Grid item xs={11}  >
             
             <div style={{display:'flex',color:'#0c5273',fontWeight:'bolder',fontSize:15}}>Use Current Location</div>
             
          
            <div style={{display:'flex',color:'#0c5273',fontSize:12}}>Using GPS</div>

            </Grid>

            
            <Grid item xs={12} style={{display:'flex', justifyContent:'space-around'}} >
             
             <Divider style={{width:'40%',height:5,margin:5}}></Divider> Or  <Divider style={{width:'40%',height:5,margin:5}}></Divider>
              
             
             </Grid>

             <Grid item xs={1} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
              <AddOutlinedIcon size="small" style={{display:'flex',color:'#0c5273'}}/>
              </Grid>

              <Grid item xs={11}  >
             
             <div style={{display:'flex',color:'#0c5273',fontWeight:'bolder',fontSize:15}}>Type Your Address</div>

            </Grid>
           
           
            </Grid>
            

            




         
    



    


</div>
    )
     
    }



return(<div><div>
    <button onClick={handleDrawer}>add</button>


</div>

<Drawer
           anchor={'right'}
           open={status}
            onClose={handleClose}
          >
            {drawerList()}
          </Drawer>

</div>)





  

}