import {useState,useEffect} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"
import { useStyles } from "./BannerCss"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData,getData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function Banner(props){
    var classes=useStyles()
    var navigate=useNavigate()
    const[bannerType,setBannerType]=useState('')
    const[error,setError]=useState('')
    const [brandList,setBrandList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [picture,setPicture]=useState({file:[],bytes:''})

   

    const fetchAllBrand=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status)
        {setBrandList(result.data)
        }
    }
    useEffect(function(){fetchAllBrand()},[])

    const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handlePicture=async(event)=>{
        
         if(Object.values(event.target.files).length<6)
         {alert("PLS UPLOAD 6 OR MORE FILES")
         }
         else
         {
         setPicture({file:Object.values(event.target.files),bytes:event.target.files})
         }
     }

     const showImages=()=>{
        return picture?.file?.map((item,i)=>{
             return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item,i)} variant="rounded" /></div>)
         })
     }

     const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

     const handleSubmit=async()=>{
        var submit=true

        if(bannerType.length==0)
    {
        handleError('bannerType','Pls choose bannerType')
        submit=false
    }
    if(brandId.length==0)
    {
        handleError('brandId','Pls choose brand')
        submit=false
    }

    if(picture.bytes.length==0)
    {
        handleError('picture','Pls choose icon...')
        submit=false
    }
     if(submit)
     {
        var formData= new FormData()
        formData.append('bannertype',bannerType)
        formData.append('brandid',brandId)
        picture.file.map((item,i)=>{
            formData.append('picture'+i,item)
            })

var result=await postData('banner//submit_banner',formData)
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

    const handleReset=()=>{
        setBannerType('')
        setBrandId('')
        setPicture({file:[] ,bytes:''})
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
       <Grid container spacing={3}>
 
 <Grid item xs={12}>
      

<TitleComponent title="Add Banners" logo="logo.png"  />
        </Grid> 

        <Grid item xs={6}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Banner Type</InputLabel>
                        <Select label="BannerType" value={bannerType}
                        // onChange={(event)=>setBannerType(event.target.value)}
                        onChange={(event)=>setBannerType(event.target.value)}
                        onFocus={()=>handleError('bannerType',null)}>
                        <MenuItem value={'General'}>General</MenuItem>
                         <MenuItem value={'Brand'}>Brand</MenuItem>
                         <MenuItem value={'trending'}>trending</MenuItem>
                         <MenuItem value={'latest'}>latest</MenuItem>
                         <MenuItem value={'popular'}>popular</MenuItem>
                        
                         </Select>
                         {error.bannerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.bannerType}</span>:<></>}          
                         
                 </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                    
                    <FormControl fullWidth>
                        <InputLabel> Brands </InputLabel>
                        <Select
                        label="Brands" value={brandId}
                        onChange={(event)=>setBrandId(event.target.value)}
                        onFocus={()=>handleError('brandId',null)}>
                            {bannerType==='Brand'?(
                          fillAllBrand()
                            ):(
                                <MenuItem value={0}>None</MenuItem>
                            )}

                        </Select>
                        {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}          
                    </FormControl>
                </Grid>

                <Grid item xs={6}>

<Button  variant="contained" component="label" fullWidth>
    Upload
    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


</Button>
{error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14,fontWeight:'bolder'}}>{error.picture}</span>:<></>}
</Grid>

<Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
   {showImages()}      
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