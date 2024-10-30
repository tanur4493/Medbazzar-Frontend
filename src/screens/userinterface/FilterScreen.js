import FilterComponent from "../../components/userinterface/FilterComponent"
import Header from "../../components/userinterface/Header"
import { Grid,Button,useMediaQuery } from "@mui/material"
import ProductFilter from "../../components/userinterface/ProductFilter"
import { useState,useEffect } from "react"
import { postData } from "../../services/FetchNodeServices"
import { useLocation,useParams } from "react-router-dom"
import ProductList from "../../components/userinterface/ProductList"

export default function FilterScreen(props){
  var param=useParams()

  const[products,setProducts]=useState([])
  const[pageRefresh,setPageRefresh]=useState(false)

  var location=useLocation()
  
  

  var categoryid=''
  try{
    if(location?.state?.categoryid==undefined)
        categoryid=null

    else
    categoryid=location?.state?.categoryid
  }

  catch(e){
     
  }

 var pattern=''
  try
  { 
    if(location?.state?.pattern==undefined)
      pattern=null
    else   
      pattern=location?.state?.pattern
  
  
}
catch(e){}
  

  const fetchAllProduct=async()=>{
    var result=await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'pattern':param['pattern']})
   setProducts(result.data)
   }
  useEffect(function(){
    
   fetchAllProduct()

  },[param['pattern']])

  
   
        return<div style={{display:'',width:'auto'}} >
        <Header/>
             
    
             <div style={{padding:5,width:'auto',flexDirection:'row',height:'auto',display:'flex',justifyContent:'',margin:20}}>
            <Grid container spacing={2}>
    
    
                <Grid item md={4} xs={12} >
                <div>
                    <FilterComponent/>
                </div>
                
            </Grid>

            <Grid item   md={7} xs={12} >
            <div style={{display:'',justifyContent:'',marginTop:20}}>
            <ProductList  pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}   data={products} />
        </div>
            </Grid>
    
           
    
            </Grid>
    
            </div>
            
        </div>

       


    
}