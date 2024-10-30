import { Grid } from "@mui/material"
import { serverURL } from "../../services/FetchNodeServices"
export default function SignInPicture(){
    return(<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
   <Grid container spacing={3}>

    <Grid item xs={12}>

    <img src={`${serverURL}/images/medbazar.jpg`} 
        style={{
           width:'70%',
           height:'70%',
           display:'flex',
           alignItems:'center',
           justifyContent:'center',
           marginTop:60,
           marginLeft:100
      
      }}/>

    </Grid>
   </Grid>

    </div>)
}