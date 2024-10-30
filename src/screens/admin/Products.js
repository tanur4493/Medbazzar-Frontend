import {useState,useEffect} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"
import { useStyles } from "./ProductsCss"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData,getData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"


export default function Products(props){
    var classes=useStyles()
    var navigate=useNavigate()

    

    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [picture,setPicture]=useState({file:'medical.png',bytes:''})
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    const [error,setError]=useState({})
    const [subcategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

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

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handlePicture=(event)=>{
        
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    
    const handleCatgoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
        
    }

    const fetchAllSubCategory=async(cid)=>{
        var result=await postData('subcategory/fetch_all_subcategory_by_id',{categoryid:cid})
        if(result.status)
        {
          //  alert(JSON.stringify(result.data))
            setSubCategoryList(result.data)
        }
        
}

    const fillAllSubCategory=()=>{
        return subCategoryList.map((item)=>{
           
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleSubmit=async()=>{
        var submit=true
        
        if(product.length==0)
        {
            handleError('product','Pls input product name')
            submit=false
        }

        if(description.length==0)
        {
            handleError('description','Pls input description')
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
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subcategoryId)
            formData.append('brandid',brandId)
            formData.append('productname',product)
            formData.append('description',description)
            formData.append('picture',picture.bytes)
            var result=await postData('product/submit_product',formData)
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
        setSubCategoryId('')
        setCategoryId('')
        setBrandId('')
        setProduct('')
        setDescription('')
        setPicture({file:'medical.png',bytes:''})
    }

   





    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={3} >

        <Grid item xs={12}>

        <TitleComponent title="Add New Products" logo="logo.png"   listicon="list.png" page='/admindashboard/displayallproducts'/>
                </Grid>  

                <Grid item xs={4}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" value={categoryId}
                        onChange={handleCatgoryChange}
                        error={error.categoryId}
                        onFocus={()=>handleError('categoryId',null)}>

                          {fillAllCategory()}

                        </Select>
                        {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}

                    </FormControl>
                    </Grid>
                    
                    <Grid item xs={4}>
                    
                    <FormControl fullWidth>
                        <InputLabel> Sub Category</InputLabel>
                        <Select label=" Sub Category" value={subcategoryId}
                        onChange={(event)=>setSubCategoryId(event.target.value)}
                        
                        onFocus={()=>handleError('subcategoryId',null)}>
                           {fillAllSubCategory()}

                        </Select>
                       
                        {error.subcategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subcategoryId}</span>:<></>}
                        </FormControl>
                        
                        </Grid>
                 
                <Grid item xs={4}>
                    
                    <FormControl fullWidth>
                        <InputLabel> Brands </InputLabel>
                        <Select
                        label="Brands" value={brandId}
                        onChange={(event)=>setBrandId(event.target.value)}>
                          {fillAllBrand()}

                        </Select>

                    </FormControl>
                </Grid>

                <Grid item xs={12}>

            <TextField  value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.product}</span>}  onChange={(event)=>setProduct(event.target.value)} label=" Product Name" fullWidth/>
           
            </Grid>

             

                <Grid item xs={12}>

            <TextField  value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.description}</span>}  onChange={(event)=>setDescription(event.target.value)} label=" Description" fullWidth/>
           
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

<Button  onClick={handleSubmit} variant="contained"  fullWidth>
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