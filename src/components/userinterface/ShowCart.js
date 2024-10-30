import { Grid,Divider,Paper,useMediaQuery } from "@mui/material"
import { serverURL } from "../../services/FetchNodeServices";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useTheme } from "@mui/material/styles";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { useSelector } from "react-redux";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
export default function ShowCart(props){

  var productFromRedux=props.products
  var product=Object.values(productFromRedux)
  const dispatch =useDispatch()
  const theme = useTheme();
  var navigate=useNavigate();

  const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
const matchesSM=useMediaQuery(theme.breakpoints.down("sm"));
const matchesXS=useMediaQuery(theme.breakpoints.down("xs"));

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
  props.setPageRefresh(!props.pageRefresh) 
}


    

    const showSlide = (item) => {
        const images = item.picture.split(",");
        return images.map((image, index) => (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={`${serverURL}/images/${image}`}
              style={{ width: "50%", borderRadius: 0, height: "auto" ,marginTop:20,display:'flex',justifyContent:'center'}}
            />
          </div>
        ));
      };
  
      const cartList=()=>{
        return product.map((item,index)=>{
            return(<div style={{display:'flex',width:'100%',border:'solid 1px #00000021',borderRadius:5,paddingTop:15,paddingBottom:15,marginTop:7}}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                 {showSlide(item)}
                </Grid>

                <Grid item xs={8} style={{display:'flex',flexDirection:'column'}}>
               <span style={{display:'flex',fontFamily:'kanit',padding:4,fontSize:22,fontWeight:'bolder',marginLeft:4,padding:4 }}> {item.description},{item.weight} {item.weighttype}</span> 
               <span style={{display:'flex',fontFamily:'kanit',fontSize:15,padding:4,color:'grey'}}>{item.productsubname}   |    {item.weight}{item.weighttype} </span> 
              <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                
               <span style={{display:'flex',fontFamily:'kanit',padding:4,fontSize:22,fontWeight:'bolder',marginLeft:4,padding:4 ,display:'flex',flexDirection:'row'}}>
                {item.offerprice==0?<span>&#x20B9;{item.price}</span>:<span style={{display:'flex',flexDirection:'row'}}>&#x20B9;{item.offerprice} <s style={{fontSize:13,display:'flex',justifyContent:'center',alignItems:'center',padding:5,color:'grey',fontWeight:'lighter',flexDirection:'row'}}>MRP &#x20B9;{item.price} </s></span>} 
                </span>

              
                
              <div style={{width:300}}>
              <PlusMinusComponent  qty={item?.qty} onChange={(v)=>handleChange(v,item)} width={'20%'}/>
               </div>
               </div>

               <div style={{fontFamily:'kanit',fontSize:13,color:'grey',display:'flex',alignItems:'center',padding:5,margin:5}} > 
                    <div style={{color:'red',marginRight:10,display:'flex'}} ><AccessTimeOutlinedIcon fontSize="small" /></div>
                        Delivery within
                        <span style={{color:'black',fontWeight:'bold',marginLeft:5,display:'flex'}} >1 - 3 Days</span> 
                    </div>

               <Divider style={{margin:5}}/> 
               <span style={{fontSize:12,fontFamily:'kanit',display:'flex',alignItems:'center'}}><DeleteIcon style={{size:'small',display:'flex'}}/>Remove <BookmarkAddOutlinedIcon style={{marginLeft:20,size:'small'}}/> Add to Favourites</span>
                </Grid>
            
            </Grid>
            
            </div>)

        })
      }
    
//800

     
    return(<div style={{width:'100%',fontFamily:'kanit'}}>
        <Grid container spacing={1}>
            <Grid item xs={12} style={{fontSize:'1.6em',fontWeight:'bold'}}>
              {product.length}  Items in your Cart
            </Grid>

            

<Grid item xs={12} >
 {cartList()}

</Grid>

<Grid item xs={12} style={{fontWeight:'bolder',fontFamily:'kanit',display:'flex',padding:5,alignItems:'center'}} >
 <span>
 <AddBoxOutlinedIcon onClick={()=>navigate('/home')}  style={{fontSize:'1.8em',marginTop:5}}/> 
 </span>

 <span style={{fontWeight:'bolder',fontSize:'1.0em',margin:10}} >
                    Add more items
                </span>

</Grid>
            
        </Grid>
        
    </div>)
      
      
}