import { postData } from "../../services/FetchNodeServices"
import { useState,useEffect } from "react"
import { Grid,Button,useMediaQuery } from "@mui/material"
import { useSelector } from "react-redux"
import PlusMinusComponent from "../../components/userinterface/PlusMinusComponent"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import logo from '../../assests/logo.png'
import { serverURL } from "../../services/FetchNodeServices"
import { useDispatch } from "react-redux"
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material"
import { useNavigate } from "react-router-dom"


export default function ProductFilter(props){
    var dispatch=useDispatch()
    const theme = useTheme();
    var navigate=useNavigate()
    const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
    var productFromRedux=useSelector(state=>state.data)
         var productRedux=Object.values(productFromRedux)

         var product=props?.data
        


    const handleChange=(v,item)=>{
        if(v>0)
        {
        item['qty']=v
        dispatch({type:'ADD_PRODUCT',payload:[item?.productdetailid,item]})
        }
        else
        {
          dispatch({type:'DELETE_PRODUCT',payload:[item?.productdetailid]})
        }
        props?.setPageRefresh(!props?.pageRefresh)
      }


    

        const handleProductDetail=(item)=>{
            navigate('/productdetails',{state:{data:item}})
          }

        const showSlide = (item) => {
      
      
            return( <div onClick={()=>handleProductDetail(item)}  style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={`${serverURL}/images/${ item.picture}`}
                  style={{ width: "70%", borderRadius: 0, height: "auto" ,aspectRatio:3/3}}
                />
              </div>)
            
          };

       
    const productDetail=()=>{
        return product?.map((item,index)=>{
           return(
              <div >

                 <div style={{
                    width:"50%",
                    height:'',
                    display:'flex',
                    justifyContent:'',
                    margin:" 0 auto",
                    flexWrap:'wrap'
                    
                    
                   
                 }}
                 >
                    <Grid container spacing={1}>
                    <Grid item xs={12}>
                  <FavoriteBorderIcon
                    style={{
                      display: "flex",
                      marginLeft: "auto",
                      marginTop: 10,
                      fontSize: 30,
                      color: "#e84393",
                    }}
                  />
                </Grid>
                       <Grid item xs={12}>
                  {showSlide(item)}
                </Grid>
                
  
                <Grid
                  item
                  xs={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 0.9,
                  }}
                >
                  <img src={logo} style={{ width:85 }} />
                </Grid>
  
                <Grid
                  item
                  xs={12}
                 
                    
                 
                >
                  <div  style={{
                    fontSize: matchesMd?"0.7em":"1.0em",
                    display: "flex",
                    fontWeight: "bold",
                    margin: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    
                  }}>
                  {item.description.length<=20?<div>{item.description}<div>&nbsp;</div></div>: item.description}
                 </div>
                  <div>{item.weight} {item.weighttype}</div>
                  
                   
                </Grid>
  
               
  
                       <Grid item xs={12} style={{fontSize:matchesMd?"0.7em":"1.0em",display:'flex',margin:2,fontWeight:'bold'}}>
                          {item.offerprice==0?<span>&#x20B9;{item.price}</span>:
                          <div>
                             <span style={{fontWeight:600,color:'grey',textDecoration:"line-through",marginRight:5}}>
                                &#x20B9;{item.price}</span>
                                <span> &#x20B9;{item.offerprice}</span>
                             </div>}
  
                       </Grid>
  
                       <Grid item xs={12}>
                          <Divider style={{borderWidth:1.5}}></Divider>
                       </Grid>
  
                       <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                          <Grid item xs={6} style={{display:'flex',margin:2}}>
                            <PlusMinusComponent width={'80%'} qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)} /> 
                          </Grid>
  
                          <Grid item xs={6} >
                  <Button
                        variant="text"
                         style={{color:'#fff',background:'#000'}}
                        size='small'
                      >
                        Buy 
                      </Button>
                  </Grid>
                    </Grid>
                     </Grid>
                 </div>
             </div>
              )
          });
      }
     


            
    
    
    
    
    
    return(<div style={{  display: 'flex',
    width:'auto',
    height:'100%',
    fontFamily:'Kanit', 
    justifyContent:'flex-start',
    alignItems:'',
    flexWrap:'wrap',
    flexDirection:'row'}}>

<Grid item xs={12}  md={8}  >
            <div style={{display:'flex',alignItems:'stretch',flexDirection:'row',justifyContent:'flex-start',marginTop:20,width:'50%'}}>
            {productDetail()}
        </div>
            </Grid>

    </div>)
}