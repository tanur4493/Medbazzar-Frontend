import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss"
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../services/FetchNodeServicesAdmin";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"

import { useNavigate } from "react-router-dom";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/admin/TitleComponent";


export default function DisplayAllSubCategory(){
    var classes=useStyles()
    var navigate=useNavigate()
    const[subcategoryData,setSubCategoryData]=useState([])
    const [picture,setPicture]=useState({file:'medical.png',bytes:''})
    const [temppicture,setTempPicture]=useState('')
    const [open,setOpen]=useState(false)
    const [subcategory,setSubCategory]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubCategoryId]=useState('')
    const [showBtn,setShowBtn]=useState(false)
    const [categoryList,setCategoryList]=useState([])
    

    const [error,setError]=useState({})

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

    const handlePicture=(event)=>{
        
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

   

   



    const handleCancel=()=>{
      setPicture({file:temppicture,bytes:''})
      setShowBtn(false)
  }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleEditData=async()=>{
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


        if(submit)
        {
    var body={subcategoryid:subcategoryId,categoryid:categoryId,subcategoryname:subcategory,categorylist:categoryList}
    var result=await postData('subcategory/edit_subcategory_data',body)
    
    if(result.status)
    {
        Swal.fire({
            icon: "success",
            title: result.message,
            timer:1500,
            toast:true
            
          });
    }
    else
    {
        Swal.fire({
            icon: "error",
            title: result.message,
            timer:1500,
            toast:true
          });
        }
    fetchAllSubCategory()

  }

    }
  const handleEditPicture=async()=>{
     

    var formData=new FormData()
    formData.append('subcategoryid',subcategoryId)
    formData.append('picture',picture.bytes)
    var result=await postData('subcategory/edit_subcategory_picture',formData)
    if(result.status)
    {
        Swal.fire({
            icon: "success",
            title: result.message,
            timer:1500,
            toast:true
            
          });
    }
    else
    {
        Swal.fire({
            icon: "error",
            title: result.message,
            timer:1500,
            toast:true
          });
        }
    fetchAllSubCategory()
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
        var body={subcategoryid:rowData.subcategoryid}
// alert(JSON.stringify(body))
var result=await postData('subcategory/delete_subcategory_data',body)
   if(result.status)
        {Swal.fire({toast:true,title:"Deleted!",  icon:"success"});
        fetchAllSubCategory()}
      else
      Swal.fire({toast:true,title:"Fail to deleted record!",  icon:"error"});
      
      } else if (result.isDenied) {
        Swal.fire({toast:true,title:"Your record is safe",icon: "info"});
      }
    });


}

 const fetchAllSubCategory=async()=>{
        var result=await getData('subcategory/display_all_subcategory')
        if(result.status)
        {setSubCategoryData(result.data)}
    }





    useEffect(function(){
        fetchAllSubCategory()
     },[])

     const handleClose=()=>{
        setOpen(false)
       }

       const handleOpen=(rowData)=>{
        
        setOpen(true)
        setCategoryId(rowData.categoryid)
       
        setSubCategoryId(rowData.subcategoryid)
        setSubCategory(rowData.subcategoryname)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
        
        
        
       }

       

     const showSubCategoryForm=()=>{
         return(<Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"lg"}>
            <DialogContent>
            <div className={classes.box}>
        <Grid container spacing={3} >

        <Grid item xs={12}>

        <TitleComponent title="Add New Sub Category" logo="logo.png"   listicon="list.png" page='/displayallsubcategory'/>
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
             {showBtn?<div style={{width:'100%',height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>

            <Button  variant="contained" component="label" fullWidth>
                Set New Picture
                <input  onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


            </Button>
            {error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14}}>{error.picture}</span>:<></>}
           
            </div>}
           
            </Grid> 

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file}   variant="rounded" />
                </Grid>
               

               






                </Grid>
      </div>  
            </DialogContent>
            <DialogActions>
            
             <Button onClick={handleClose}>Close</Button>
             <Button onClick={handleEditData}>Edit Data</Button>

            </DialogActions>

         </Dialog>
         )
     }
    

    

   

    function showSubCategory() {
        return (
          <MaterialTable
            title="Main Sub Categories"
            columns={[
              { title: 'Categoryid', field: 'categoryname' },
              { title: 'SubCategory Id', field: 'subcategoryid' },
              { title: 'SubCategoryname', field: 'subcategoryname' },
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></> },
              
            ]}
            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10],

            }}

            data= {subcategoryData} 

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Sub Category',
                onClick: (event, rowData) => handleOpen(rowData)
              },

              {
                icon: 'delete',
                tooltip: 'Delete Sub Category',
                onClick: (event, rowData) => handleDelete(rowData)
              },

              {
                icon: 'add',
                tooltip: 'Add  Sub Category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/subcategory')
              }
            ]}
          />
        )
      }

      return(<div className={classes.root}>
        <div className={classes.boxdispaly}>
        {showSubCategory()}
       </div>
       {showSubCategoryForm()}
       
       </div>
       )






}