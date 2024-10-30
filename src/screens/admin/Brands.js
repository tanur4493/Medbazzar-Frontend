import {useState} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import { useStyles } from "./CategoriesCss"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
export default function Brands(props){
    var classes=useStyles()
    var navigate=useNavigate()
    const[brand,setBrand]=useState('')
    const[picture,setPicture]=useState({file:'medical.png',bytes:''})
    const[error,setError]=useState({})

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))

    }

    const handleReset=()=>{
        setBrand('')
        setPicture({file:'medical.png',bytes:''})
    }

    const handleSubmit=async()=>{
        var submit=true
        if(brand.length==0)
        {
            handleError('brand','pls input brand name...')
            submit=false
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','pls choose icon...')
            submit=false
        }
        if(submit)
        { var formData= new FormData()
            formData.append('brandname',brand)
            formData.append('picture',picture.bytes)
            var result=await postData('brand/submit_brand',formData)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    timer:1500,
                    
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                  });
            }
        }
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
           <Grid container spacing={3}>
            <Grid item xs={12}>
            <TitleComponent title="Add New Brands" logo="logo.png"   listicon="list.png" page={('/admindashboard/displayallbrands')}/>
            </Grid>

            
            

            <Grid item xs={12}>
                <TextField  value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span style={{color:'#d32f2f',fontSize:14,fontWeight:'bolder',fontFamily:'cormorant'}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>


            </Grid>

            <Grid item xs={6}>

<Button variant="contained" component="label" fullWidth>
    Upload
    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


</Button>
{error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14,fontWeight:'bolder'}}>{error.picture}</span>:<></>}

</Grid>

<Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file}   variant="circular" />
                </Grid>

                <Grid item xs={6}>

<Button onClick={handleSubmit} variant="contained"  fullWidth>
      Submit


</Button>

</Grid>


<Grid item xs={6}>

<Button onClick={handleReset} variant="contained"  fullWidth>
      Reset


</Button>

</Grid>


          
          
 </Grid>





        </div>
        
    </div>)
}