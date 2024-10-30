import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss"
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import TitleComponent from "../../components/admin/TitleComponent";

import { useNavigate } from "react-router-dom";
import { Button,Grid,TextField,Avatar } from "@mui/material";


export default function DisplayAllBrands(){

    var classes=useStyles()
    var navigate=useNavigate()

    
const[brandData,setBrandData]=useState([])
const [open,setOpen]=useState(false)
const [brandId,setBrandId]=useState('')
const[brand,setBrand]=useState('')
const[picture,setPicture]=useState({file:'medical.png',bytes:''})
const [temppicture,setTempPicture]=useState('')
const[error,setError]=useState({})
const [showBtn,setShowBtn]=useState(false)

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
  if(brand.length==0)
  {
      handleError('brand','pls input brand name...')
      submit=false
  }
  
  if(submit)
  {





  var body={brandid:brandId,brandname:brand}
  var result=await postData('brand/edit_brand_data',body)
  
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
  fetchAllBrand()
  }
  

}

const handleEditPicture=async()=>{
  
  var formData=new FormData()
      formData.append('brandid',brandId)
      formData.append('picture',picture.bytes)
      var result=await postData('brand/edit_brand_picture',formData)
       
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
  fetchAllBrand()
  
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
      var body={brandid:rowData.brandid}
// alert(JSON.stringify(body))
var result=await postData('brand/delete_brand_data',body)
 if(result.status)
      {Swal.fire({toast:true,title:"Deleted!",  icon:"success"});
      fetchAllBrand()}
    else
    Swal.fire({toast:true,title:"Fail to deleted record!",  icon:"error"});
    
    } else if (result.isDenied) {
      Swal.fire({toast:true,title:"Your record is safe",icon: "info"});
    }
  });




}






     








const fetchAllBrand=async()=>{
    var result=await getData('brand/display_all_brand')
    if(result.status)
    {setBrandData(result.data)}

   }



   useEffect(function(){
    fetchAllBrand()
 },[])

 const handleClose=()=>{
  setOpen(false)
 }


 const handleOpen=(rowData)=>{
  setOpen(true)
  setBrandId(rowData.brandid)
  setBrand(rowData.brandname)
  setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
  setTempPicture(`${serverURL}/images/${rowData.picture}`)

 }
 

 const showBrandForm=()=>{
  return(
    <Dialog open={open}
    onClose={handleClose}
    maxWidth={"md"}
    >
      
      <DialogContent>
      <div className={classes.Brandbox}>
           <Grid container spacing={3}>
            <Grid item xs={12}>
            
            <TitleComponent title="Edit Brands" logo="logo.png"   listicon="list.png" />
                </Grid>
            

            
           

            <Grid item xs={12}>
                <TextField  value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span style={{color:'#d32f2f',fontSize:14,fontWeight:'bolder',fontFamily:'cormorant'}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth/>


            </Grid>

            <Grid item xs={6}>
            {showBtn?<div style={{width:'100%',height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center'}}><Button  onClick={handleEditPicture}variant="contained">Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',justifyContent:'space-evenly',alignItems:'center',flexDirection:'column'}}>

<Button variant="contained" component="label" fullWidth>
    Set New Picture
    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


</Button>
{error.picture?<span style={{marginLeft:'5%',color:'#d32f2f',fontSize:14,fontWeight:'bolder'}}>{error.picture}</span>:<></>}

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
   



    function showBrand() {
        return (
          <MaterialTable
            title="Main Brands"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Type', field: 'brandname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></>
            },
             
            ]}
            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10],

            }}
           
            data={brandData}
              
                   
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpen(rowData)
              },

              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },

              {
                icon: 'add',
                tooltip: 'Add Brand',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/brands')
              }

             
            ]}
          />
        )
      }

      return(<div  className={classes.root}>
        <div className={classes.boxdispaly}>
        {showBrand()}
        </div>
        {showBrandForm()}
      </div>)
}