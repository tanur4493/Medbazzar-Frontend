import { Grid } from "@mui/material"
import SignInPicture from "../../components/userinterface/SignInPicture"
import SignInInformation from "../../components/userinterface/SignInInformation"
import Registration from "../../components/userinterface/Registration"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "../../components/userinterface/Header";

export default function SignInPage(){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
   

    return(<div>
        <Header/>
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
       
       
        <Grid container spacing={3}>
            <Grid item md={7}>
           { !matches?
           <>
                <SignInPicture/>
                </>
                :<></>}

            </Grid>

            <Grid item xs={12} md={5}  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
            <SignInInformation/>
                {/* <Registration/>*/}
            </Grid>
        </Grid>

        







    </div>
    </div>)
}