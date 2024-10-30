import {useState,useEffect} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"
import { useStyles } from "./CategoriesCss"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData,getData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export default function SubCategory(props)
{
    var classes=useStyles()
    var navigate=useNavigate()
    const [subcategory,setSubCategory]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [picture,setPicture]=useState({file:'medical.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()},[])

    const handlePicture=(event)=>{
        
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }


    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleReset=()=>{
        setSubCategory('')
        setCategoryId('')
        setPicture({file:'medical.png',bytes:''})
    }


    const handleSubmit=async()=>{
        var submit=true
        if(subcategory.length==0)
        {
            handleError('subcategory','Pls input sub category name...')
            submit=false
        }


        if(categoryId.length==0)
        {
            handleError('categoryId','Pls input sub category id...')
            submit=false
        }

        if(picture.bytes.length==0)
        {
            handleError('picture','Pls choose icon...')
            submit=false
            
        }

        if(submit)
        { var formData= new FormData()
            formData.append('subcategoryname',subcategory)
            formData.append('categoryid',categoryId)
            formData.append('picture',picture.bytes)
            var result=await postData('subcategory/submit_subcategory',formData)
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
        <Grid container spacing={3} >

        <Grid item xs={12}>

        <TitleComponent title="Add New Sub Category" logo="logo.png"   listicon="list.png" page='/admindashboard/displayallsubcategory'/>
                </Grid>  

                <Grid item xs={12}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select
                        label="Category" value={categoryId}
                        onChange={(event)=>setCategoryId(event.target.value)}>
                          {fillAllCategory()}

                        </Select>

                    </FormControl>
                </Grid>
             <Grid item xs={12}>

            <TextField  value={subcategory} onFocus={()=>handleError('subcategory',null)} error={error.subcategory} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.subcategory}</span>}  onChange={(event)=>setSubCategory(event.target.value)} label="Sub Category Name" fullWidth/>
           
            </Grid>  

             <Grid item xs={6}>

            <Button  variant="contained" component="label" fullWidth>
                Upload
                <input  onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


            </Button>
            {error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14}}>{error.picture}</span>:<></>}
           
            
           
            </Grid> 

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file}   variant="rounded" />
                </Grid>

                <Grid item xs={6}>

           <Button onClick={handleSubmit}  variant="contained"  fullWidth>
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