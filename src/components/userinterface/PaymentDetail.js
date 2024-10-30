import { Grid ,Paper,Button,Box, Divider,useMediaQuery,} from "@mui/material"

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { postData, serverURL } from "../../services/FetchNodeServices"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from "@mui/material/styles";
import {useNavigate} from "react-router-dom"
import { useState ,useEffect} from "react";
import Header from "./Header";

export default function PaymentDetail(props){
   const navigate=useNavigate()
   
   var productFromRedux=props.products
  var product=Object.values(productFromRedux)
  var [caption,setCaption]=useState('Login To Proceed')

  const handleLogin=()=>{
   if(caption.toUpperCase()==='MAKE PAYMENT')
   openPayModal()
else
   navigate("/signinpage")
  }

  useEffect(function(){
   if(props?.userAddress?.length>0)
   {
      setCaption('Make Payment')
   }
  
},[props.userAddress])
  
  
  
  
  
  var totalamount=product.reduce((p1,p2)=>{
       var amt=p2.qty*p2.price
       return p1+amt
  },0)

  var amountpaid=product.reduce((p1,p2)=>{
   var amt=p2.qty*(p2.offerprice>0?p2.offerprice:p2.price)
   return p1+amt
},0)

var save=totalamount-amountpaid

const generateOrder=async(razorpay_payment_id)=>{
 var result=await postData('users/save_order',{userid:props?.userData?.userid,mobileno:props?.userData?.mobileno,emailid:props?.userData?.emailid,paymentstatus:'online',paymentid:razorpay_payment_id,orderlist:product})
alert(result.status)
}

const handleCaptionChange=()=>{
   setCaption('Confirm Order')
}


 ///********Payment Gateway********** */
 const options = {
   key: "rzp_test_GQ6XaPC6gMPNwH",
   amount: amountpaid*100, //  = INR 1
   name: "MedBazzar",
   description: 'some description',
   image:
     `${serverURL}/images/logo.png`,
   handler: function (response) {
      generateOrder(response.razorpay_payment_id)
        alert(response.razorpay_payment_id);
   },
   prefill: {
     name: props?.userData?.username,
     contact: props?.userData?.mobileno,
     email: props?.userData?.emailid,
   },
   notes: {
     address: "some address",
   },
   theme: {
     color: "blue",
     hide_topbar: false,
   },
 };

 const openPayModal = () => {
   var rzp1 = new window.Razorpay(options);
   rzp1.open();
 };
 useEffect(() => {
   const script = document.createElement("script");
   script.src = "https://checkout.razorpay.com/v1/checkout.js";
   script.async = true;
   document.body.appendChild(script);
 }, []);



 ////********************* */

  
  
   const theme = useTheme();

const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
const matchesSM=useMediaQuery(theme.breakpoints.down("sm"));
const matchesXS=useMediaQuery(theme.breakpoints.down("xs"));





const showSlide = (item) => {
    const images = item.picture.split(",");
    return images.map((image, index) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={`${serverURL}/images/${image}`}
          style={{ width: "70%", borderRadius: 0, height: "auto" }}
        />
      </div>
    ));
  };

  
  
  

  


       
        
             
            
            
  




  
    return(<div  style={{fontFamily:'kanit'}} >
     
        <Grid container spacing={1}>
         

            <Grid item xs={12} style={{fontSize:20,fontWeight:'bold',width:'100%',borderRadius:10,display:'flex',justifyContent:'center',alignItems:'center',padding:10,margin:20}}>
                Payment Details
            </Grid>

            <Grid item xs={6} style={{fontSize:15}}>
                Total Amount
            </Grid>

            <Grid item xs={6} style={{display:'flex',fontWeight:'bolder',}} >
         <span style={{marginLeft:'auto',display:'flex',fontSize:17}}>  &#x20B9; {totalamount } </span> 
            </Grid>

            <Grid item xs={6}   style={{fontSize:15}}>
                Amount Paid
            </Grid>

            <Grid item xs={6} style={{fontSize:15,display:'flex'}} >
            <span style={{marginLeft:'auto'}}>   &#x20B9; {amountpaid} </span>
            </Grid>

            <Grid item xs={6}   style={{fontSize:15}}>
                Savings
            </Grid>

            <Grid item xs={6} style={{fontSize:15,display:'flex'}} >
            <span style={{marginLeft:'auto'}}>    &#x20B9; {save} </span>
            </Grid>

            <Grid item xs={12} style={{background:'#fffa65',display:'flex',padding:8,borderRadius:7,marginTop:20}} >
            <Grid item xs={6}  style={{fontSize:15,fontWeight:'bolder',marginLeft:5}}>
                Order Total
                </Grid>

                <Grid item xs={6} style={{display:'flex',fontWeight:'bolder',}} >
         <span style={{marginLeft:'auto',display:'flex',fontSize:17}}>  &#x20B9; {amountpaid } </span> 
            </Grid>
                
            </Grid>

            <Grid item xs={12} style={{fontSize:12,padding:15}} >
             Price may vary depending on the product batch*
            </Grid>

            <Grid item xs={12}>
                        <Divider style={{borderWidth:1.5}}></Divider>
                     </Grid>

                     <Grid item xs={12} style={{display:'flex'}}>
                     <img src={`${serverURL}/images/coupon.png`} style={{width:"5%",height:"80%",display:'flex',alignItems:'center',justifyContent:'center',marginTop:2,padding:2}}/>   <span style={{fontWeight:'bolder'}}> Use Coupons </span> <ArrowForwardIosIcon style={{marginLeft:'auto',justifyContent:'center',alignItems:'center'}}/>
                      </Grid>
                        
                     

                     <Grid item xs={12} style={{display:'flex'}}>
                     
                    < span style={{fontSize:12}}>Also get a gift code after pacing this order</span>
                       </Grid>

                     <Grid item xs={12}>
                        <Divider style={{borderWidth:1.5}}></Divider>
                     </Grid>

                     <Grid item xs={12} style={{background:'#f6b93b',marginTop:10,padding:10,fontSize:12}}>
                        Shop for 729.52 more to get free dilevery
                     </Grid>

                     <Grid item xs={12} style={{background:'#dfe4ea',display:'flex',alignItems:'center',fontWeight:'bold'}}>

                     <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="P"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel onClick={handleCaptionChange} value="D" control={<Radio size="small" />} label="Cash on Delivery" />
                            <FormControlLabel value="P" control={<Radio size="small" />} label="Make Payment" style={{marginLeft:'auto'}}/>
                            </RadioGroup>

                     </Grid>

                     <Grid item xs={12} style={{display:'flex'}} >

                     <Grid item xs={6} style={{display:'flex',fontWeight:'bolder',flexDirection:'column'}} >
                        <div style={{display:'flex',fontSize:13}}>{product.length} ITEM</div>
                     <div style={{display:'flex',fontSize:13}}>  &#x20B9; {amountpaid} </div> 
                    
                     </Grid>

                     <Grid item xs={6} style={{marginLeft:'auto'}} >
                        <Button variant="contained" style={{color:'#fff',background:'#000',fontWeight:'bolder'}}>
                       <span style={{fontSize:12}} onClick={handleLogin}> {caption} </span>
                        </Button>
                     </Grid>

                     </Grid>

                     <Grid item xs={12}>
                        <Divider style={{borderWidth:1.5}}></Divider>
                     </Grid>

                     <Grid item xs={12} style={{fontWeight:'bolder'}}>
                        Dilevery Instruction
                     </Grid>

                     <Grid item xs={12}  style={{display:'flex'}} >
                     <Grid item xs={6} style={{fontWeight:'bolder',fontSize:14,display:'flex',justifyContent:'center',alignItems:'center'}}>
                     <img src={`${serverURL}/images/dilevery.png`} style={{width:"9%",height:"80%",display:'flex',marginRight:8}}/>  Add Dilevery Instructions 
                      </Grid>

                      <Grid item xs={6} style={{display:'flex'}}>
                      <ArrowForwardIosIcon style={{marginLeft:'auto'}}/>
                      </Grid>
                    
                     </Grid>

                     <Grid item xs={12}>
                        <Divider style={{borderWidth:1.5}}></Divider>
                     </Grid>


            






        </Grid>
        
    </div>)
    
    



}