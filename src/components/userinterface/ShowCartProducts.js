import { useSelector } from "react-redux";
import { Divider,Paper } from "@mui/material";
import { showStyles } from "./showCartProductsCss";
import { useNavigate } from "react-router-dom";

export default function ShowCartProducts(props)
{  

    var navigate=useNavigate()
    var products=useSelector((state)=>state.data)
    var keys=Object?.keys(products)
    var products=Object?.values(products)
    
    const showClasses=showStyles();

    const showProducts=()=>{
        return products.map((item)=>{
            return <div className={showClasses?.product}><div>{item?.productname}</div><div>Qty:{item?.qty}</div></div>
        })
    }

    return(<Paper elevation={2} style={{display:props?.isOpen?'flex':'none',position:'absolute',top:50,right:70,zIndex:3}}>
     <div className={showClasses?.root} >
        <div className={showClasses?.heading}>
         <div className={showClasses?.order} >Order Summary</div>   
         <div  className={showClasses?.item}>{keys?.length} Items</div>
        
         
        </div>
        <Divider/> 
        {showProducts()}
        <div onClick={()=>navigate('/cart')} style={{display:'flex',justifyContent:'center',alignItems:'center',margin:10,background:'#00391c',color:'#fff',width:280,height:40,borderRadius:10}}>
            <div  style={{cursor:'pointer'}}>Proceed to Cart</div>

        </div>
        </div>       
    </Paper>)
}