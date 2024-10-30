import { Grid } from "@mui/material"
import SignInPicture from "../../components/userinterface/SignInPicture"
import SignInInformation from "../../components/userinterface/SignInInformation"
import Registration from "../../components/userinterface/Registration"
import OtpComponent from "../../components/userinterface/OtpComponent"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function OtpPage(){

    const theme = useTheme();
    const matchesMd = useMediaQuery(theme.breakpoints.up('md'));


    return(<div style={{display:'flex',}}>
         { matchesMd?
        <Grid container spacing={3}>
            <Grid item xs={7}>
                <SignInPicture/>
            </Grid>

            <Grid item xs={5}  >
             <OtpComponent/>
               {/* <Registration/>*/}
            </Grid>
        </Grid>:

<Grid item xs={12}  >
<OtpComponent/>
  {/* <Registration/>*/}
</Grid>
}

    </div>)
}