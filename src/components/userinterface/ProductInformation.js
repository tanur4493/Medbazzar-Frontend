import { Button, Grid, inputClasses } from "@mui/material"
import { Divider } from "@mui/material"
import parse from 'html-react-parser';
import PlusMinusComponent from "./PlusMinusComponent"
import { useDispatch, useSelector } from "react-redux"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProductInformation(props){
   var navigate=useNavigate()
   var dispatch=useDispatch()

  var productFromRedux=useSelector(state=>state.data)
  var values=Object.values(productFromRedux)
  var product
  if(values?.length==0)
  {
   product=props?.item
   product['qty']=0
  }

  else
  {
   
  var prd=productFromRedux[props.item?.productdetailid]

  if(prd===undefined)
  {

   product=props?.item
   product['qty']=0
  
  }

  else
  {

   product=prd

  }

}

   

  

   const handleChange=(v,item)=>{
      if(v>0)
      {
      item['qty']=v
      dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
      }
      else
      {
        dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
      }
      props?.setPageRefresh(!props?.pageRefresh)
    }
   
    const productInfo=()=>{
        
            return(<div style={{fontFamily:'kanit'}}>
            <Grid container spacing={2} >
                <Grid item xs={12} style={{fontWeight:'bolder',fontSize:25}}>

                { product?.productname}, {product?.weight} {product?.weighttype}
                </Grid>

                <Grid item xs={12} style={{fontSize:20}}>

                { product?.productsubname}
                </Grid>

                <Grid item xs={12} style={{fontWeight:'bolder',fontSize:25}}>

                 &#8377;{product?.offerprice!=0?product?.offerprice:product?.price}
                 <div style={{fontWeight:'bolder',fontSize:10}}>(incl. all Taxes)</div>
               </Grid>

               <Grid item xs={12}>
                        <Divider style={{borderWidth:1.0}}></Divider>
                     </Grid>


               <Grid item xs={12} style={{fontSize:15,color:'grey',flexDirection:'row',dispaly:'flex',justifyContent:'center'}}>
                {product?.offerprice!=0?<s>MRP: &#8377; {product?.price} </s>:<div> </div>}
                <span style={{margin:5,color:'black',fontSize:17,fontWeight:'bolder'}}> {product?.offerprice!=0?<span> (save&#8377;{product?.price-product?.offerprice})</span>:<span></span>} </span> 
               
                </Grid>

                <Grid item xs={12} style={{display:'flex',justifyContent:'space-between',alignItems:'center',width:'70%'}}>
                < Grid item xs={6} >
                  
                <PlusMinusComponent  qty={product?.qty} onChange={(v)=>handleChange(v,product)} width={'80%'}/>
                
                                </Grid>

                                < Grid item xs={6} >
                                <Button onClick={()=>navigate('/home')} variant="contained" size="small" fullWidth style={{background:'#00391c',color:'#fff',fontWeight:'bolder',width:'80%'}}>Continue Shopping</Button>
                                </Grid>
                                </Grid>
                               

                                <Grid item xs={12}>
                                   <Divider style={{borderWidth:1.0}}></Divider>
                                   </Grid>

                                   <Grid item xs={12} style={{fontWeight:'bolder',fontSize:18}}>
                               <div> Super Savings (2 Offers)</div> 
                                </Grid>

               
                <Grid item xs={6} >
                <Grid style={{border:'solid 1px',borderRadius:5,padding:10,margin:2,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Grid  style={{fontSize:10,color:'lightblue',fontWeight:'bold'}}>HDFC BANK</Grid>
                 <Divider style={{borderWidth:1.0}}></Divider>
                <Grid style={{fontSize:10}}>10% instant discount upto 2000 on HDFC Bank credit & Debit Card on Selected MedBazzar Products Select the offer from “View all offers ”on payment page T&C Apply. </Grid>
                
                </Grid>
                </Grid>

                <Grid item xs={6} >
                <Grid style={{border:'solid 1px',borderRadius:5,padding:10,margin:2,display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Grid  style={{fontSize:10,color:'lightblue',fontWeight:'bold'}}>Multiple Banks</Grid>
                 <Divider style={{borderWidth:1.0}}></Divider>
                <Grid style={{fontSize:10}}>No-Cost EMI upto 12 month tenure on major Bank Credit Card only. Select offer under view all offer segment on payment page to avail the benefit T&C Apply. </Grid>
                
                </Grid>
                </Grid>
                 

                <Grid item xs={12}>
                        <Divider style={{borderWidth:1.0}}></Divider>
                     </Grid>

                      <Grid item xs={12} >
                      <Grid style={{border:'solid 1px',padding:10,margin:2}}>
                      <span style={{fontSize:15,fontWeight:'bold',marginLeft:10}}> Key Features </span>
                        <span style={{fontSize:10}}>

                   {parse(product.pd_description)}
                      </span>
                      </Grid>

                       </Grid>
                    
            </Grid>
            </div>)

        
    }



    return(<div style={{display:'flex',marginLeft:'auto'}}>
       {productInfo()}
    </div>)
 }

