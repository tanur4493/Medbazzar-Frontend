
import React from 'react';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Divider ,Grid} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlusMinusComponent from './PlusMinusComponent';
import { serverURL } from "../../services/FetchNodeServices"
import logo from "../../assests/logo.png"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function ProductList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const matchesMd=useMediaQuery(theme.breakpoints.down("md"));

  const productFromRedux = useSelector(state => state.data);
  const productRedux = Object.values(productFromRedux);

  const handleChange = (v, item) => {
    if (v > 0) {
      item['qty'] = v;
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: 'DELETE_PRODUCT', payload: [item.productdetailid] });
    }

    props.setPageRefresh(!props.pageRefresh);
  };

  
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


  const showProduct = () => {
    return props.data.map(item => (
      <div key={item.productdetailid} style={{ height: '', width: matches?'19%':'100%', marginRight: '3%', border: 'solid white', marginTop: '2%',display:'flex',flexDirection:'column' }}>
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
                {showSlide(item)}
        <img src={logo} style={{ width:85,justifyContent:'flex-end',display:'flex',marginLeft:'auto' }} />
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
     
      </div>
    
  
  ));
  };

  return (
    <div style={{ display: 'flex',  marginLeft: matches ? '-6%' : '2%', justifyContent: 'flex-start', height: '100%', flexDirection: 'column', width: '70vw', marginTop: '3%', background: '#fff' }}>
     
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'stretch', height: 'auto', flexDirection: 'row' }}>
        {showProduct()}
      </div>
    </div>
  );
}
