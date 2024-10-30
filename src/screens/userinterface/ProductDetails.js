import ProductPicture from "../../components/userinterface/ProductPicture";
import { Grid } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import ProductInformation from "../../components/userinterface/ProductInformation";
import { json, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/userinterface/Header";

export default function ProductDetails(){
    const[pageRefresh,setPageRefresh]=useState(false)
    
    var location=useLocation()
    var item=location?.state?.data

    

    return(<div>
        
        <Grid container spacing={3} >
            <Grid item xs={12} >
                <Header/>
            </Grid>
            <Grid item xs={12} md={6} >
                <ProductPicture item={item}/>
            </Grid>
            <Grid item xs={12} md={6} >
                <ProductInformation item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </Grid>
        </Grid>

    </div>)

}