import { Grid} from "@mui/material";
import PaymentDetail from "../../components/userinterface/PaymentDetail";
import ShowCart from "../../components/userinterface/ShowCart";
import { useSelector } from "react-redux";
import Header from "../../components/userinterface/Header"
import { useEffect, useState } from "react";
import AddressDetails from "../../components/userinterface/AddressDetails";
import { postData } from "../../services/FetchNodeServices";
import DileveryAddress from "../../components/userinterface/DileveryAddress"
import Cookies from "js-cookie";



export default function Cart()

{ 
  
  // var products=useSelector(state=>state.data)
    var userData= Object.values(useSelector(state=>state.user))[0]
    const[pageRefresh,setPageRefresh]=useState(false)
    const[status,setStatus]=useState(false)
    const[userAddress,setUserAddress]=useState([])
    var prd=JSON.parse(Cookies.get('CART'))
    var products=Object.values(prd)
    
console.log("USER DATAAAA:",userData)
    const check_user_address=async()=>{
        

        if(userData?.mobileno==undefined)
        {setStatus(false)}
        else
        {

        var result=await postData('users/check_user_address',{mobileno:userData?.mobileno})
        if(result.status==false)
        {
          setStatus(true)
        
        }
        else
        {
            setStatus(false)
            setUserAddress(result.data)
            
          
        }

    }
      }

      useEffect(function(){
        check_user_address()
      },[userData?.mobileno,pageRefresh])
   


   
   return(<div >
    <Header/>
         

         <div style={{padding:5,width:'90%',display:'flex',justifyContent:'center',margin:10}}>
        <Grid container spacing={2}>


            <Grid item xs={12} md={8} >
            <div style={{margin:20,display:'flex'}}>
            <DileveryAddress status={status} setStatus={setStatus} userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </div>
              <div style={{margin:20,display:'flex'}}>
            <ShowCart products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
            </div>
        </Grid>

        <Grid item xs={12}  md={4}>
        <div  style={{marginTop:40}}>
        <PaymentDetail pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userAddress={userAddress} products={products} userData={userData} />
        </div>
        </Grid>

        </Grid>

        </div>
        <AddressDetails status={status} setStatus={setStatus} userData={userData}  pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}/>
    
    </div>)
}