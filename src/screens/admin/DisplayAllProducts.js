import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./ProductsCss"
import { useState,useEffect } from "react";
import { getData, serverURL } from "../../services/FetchNodeServices";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData} from "../../services/FetchNodeServices"
import Swal from "sweetalert2";


export default function DisplayAllProducts(){
    var classes=useStyles()
    var navigate=useNavigate()
    const [productId,setProductId]=useState('')
    const[productData,setProductData]=useState([])
    const[open,setOpen]=useState(false)
    const [subcategory,setSubCategory]=useState('')

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
    const[showBtn,setShowBtn]=useState(false)
    const[tempPicture,setTempPicture]=useState('')

    const handlePicture=(event)=>{
        
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const fetchAllProduct=async()=>{
        var result=await getData('product/display_all_product')
        if(result.status)
        {
            setProductData(result.data)
        }
       
    }
    useEffect(function(){
        fetchAllProduct()
    },[])

    const handleClose=()=>{
        setOpen(false)
    }

    const handleOpen=(rowData)=>{
        setOpen(true)
        setSubCategoryId(rowData.subcategoryid)
        fetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setBrandId(rowData.brandid)
        setProductId(rowData.productid)
        setProduct(rowData.productname)
        setDescription(rowData.description)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

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

const handleCancel=()=>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
}

const handleEditData=async()=>{
    
   var body={categoryid:categoryId,subcategoryid:subcategoryId,brandid:brandId,productname:product,description:description,productid:productId}
   var result=await postData('product/edit_product_data',body)
   alert(result.message)
   fetchAllProduct()
}

const handleEditPicture=async()=>{
     

    var formData=new FormData()
    formData.append('productid',productId)
    formData.append('picture',picture.bytes)
    var result=await postData('product/edit_product_picture',formData)
    alert(result.message)
    fetchAllProduct()

}


const handleDelete=async(rowData)=>{

        
        
                    
    Swal.fire({
      title: "Do you want to delete the category?",
      toast:true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={productid:rowData.productid}
// alert(JSON.stringify(body))
var result=await postData('product/delete_product_data',body)
   if(result.status)
        {Swal.fire({toast:true,title:"Deleted!",  icon:"success"});
        fetchAllProduct()}
      else
      Swal.fire({toast:true,title:"Fail to deleted record!",  icon:"error"});
      
      } else if (result.isDenied) {
        Swal.fire({toast:true,title:"Your record is safe",icon: "info"});
      }
    });
}




    const showProductForm=()=>{
        return(
            <Dialog 
            open={open}
            onClose={handleClose}
            maxWidth={"md"}>
                <DialogContent>
                <div className={classes.box}>
        <Grid container spacing={3} >

        <Grid item xs={12}>

        <TitleComponent title="Edit Products" logo="logo.png"   listicon="list.png" page='/displayallproducts'/>
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
                        error={error.subcategoryId}
                        
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
                {showBtn?<div style={{width:'100%',display:'flex',height:100,justifyContent:"space-evenly",alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',display:'flex',height:100,justifyContent:"space-evenly",alignItems:'center'}}>

<Button  variant="contained" component="label" fullWidth>
    Set New Picture
    <input  onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


</Button>
{error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14}}>{error.picture}</span>:<></>}
</div>}


</Grid> 

<Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file}   variant="rounded" style={{width:100,height:100}} />
                </Grid>

                
    

    </Grid>
      </div>  
                </DialogContent>
                <DialogActions>
                <Button onClick={handleEditData}>Edit Data</Button>
                    <Button onClick={handleClose}>close</Button>
                    
                </DialogActions>
            </Dialog>
        )
    }

    function showProducts() {
        return (
          <MaterialTable
            title="Main Products"
            columns={[
              { title: 'category', field: 'categoryname' },
              { title: 'subCategory', field: 'subcategoryname' },
              { title: 'brand', field: 'brandname' },
              { title: 'productId', field: 'productid' },
              { title: 'productname', field: 'productname' },
              { title: 'description', field: 'description' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
              
              
            ]}

            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10],

            }}

            data={productData}
                    
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product',
                onClick: (event, rowData) => handleOpen(rowData)
              },

              {
                icon: 'delete',
                tooltip: 'Delete Product',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Products',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/products')
              }
            ]}
          />
        )
      }
      return(<div className={classes.root}>
        <div className={classes.displaybox}>
        {showProducts()}
        </div>
        {showProductForm()}
      </div>)

}