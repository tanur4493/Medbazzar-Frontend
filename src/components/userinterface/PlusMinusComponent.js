import { Button,IconButton } from "@mui/material"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function PlusMinusComponent(props){
  const theme = useTheme();
  const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
  const [value,setValue]=useState(props.qty)
    
  useEffect(function(){
        setValue(props?.qty)
    },[props?.qty,value])

    const handlePlus=()=>{
      setValue((prev)=>prev+1)
    var  v=value
      v=v+1
      props.onChange(v)
    }

    const handleMinus=()=>{
      if(value>=1)
      {
        setValue((prev)=>prev-1)
      var  v=value
      v=v-1
      props.onChange(v)
      }
    }

return(<div style={{display:'flex',width:'100%'}}>
{value==0?

<IconButton style={{width:props.width}} fullWidth   onClick={handlePlus}  color="primary" aria-label="add to shopping cart"> 

<Button 
variant="outlined"
fullWidth
endIcon={<AddShoppingCartIcon  />}


 size="small"
 
 

>
  <span >
ADD
</span>
</Button>
    </IconButton>:


    
    <div  style={{alignItems:'center',display:'flex', justifyContent:'space-evenly', background:'#00391c',height:30,  borderRadius:4, width:props.width}} >
<span   onClick={handleMinus} style={{cursor:'pointer', color:'#fff',fontSize:16,fontWeight:'bold'}}>-</span>


<span style={{color:'#fff',fontSize:16,fontWeight:'bold'}}>{value}</span>

<span onClick={handlePlus} style={{cursor:'pointer',color:'#fff',fontSize:16,fontWeight:'bold'}}>+</span>


</div>}
    </div>)
}