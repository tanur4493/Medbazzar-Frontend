import MaterialTable from "@material-table/core";
import { getData,postData } from "../../services/FetchNodeServices";
import { useEffect,useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";

export default function DisplayOrders(){
  const [orderData,setOrderData]=useState([])
  const [orderDetailData,setOrderDetailData]=useState([])
  const[open,setOpen]=useState(false)
  const[orderid,setOrderId]=useState('')

const fetchAllOrders=async()=>{

  var result=await getData('users/display_all_orders')
  if(result.status)
  {setOrderData(result.data)}
 
}
   useEffect(function(){
      fetchAllOrders()
   },[])


   

 


   const fetchAllOrderDetails=async(orderid)=>{

    var result=await postData('users/display_all_orderdetails',{orderid:orderid})
    if(result.status)
    {
   setOrderDetailData(result.data)
    }
  }
     useEffect(function(){
        fetchAllOrderDetails()
     },[])
     
  



    function orderDisplay() {
        return (
          <MaterialTable
            title="Display Orders"
            columns={[
              { title: 'Order Id', field: 'orderid' },
              { title: 'Order Date', field: 'orderdate' },
              { title: 'User Id', field: 'userid' },
              { title: 'Payment Id', field: 'paymentid'},
              { title: 'Payment Status', field: 'paymentstatus'},
              
              
            ]}

            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10],

            }}

            data= {orderData}
             
                 
            actions={[
              {
                icon: 'link',
                tooltip: 'Show Order Details',
                onClick: (e,rowData) => handleOpen(rowData)
              }
            ]}
          />
        )
      }

    const  handleOpen=(rowData)=>{
          setOpen(true)
          fetchAllOrderDetails(rowData.orderid)
          

          
      }

      const handleClose=()=>{
        setOpen(false)
       }


      const showCategoryForm=()=>{
        return(
          <Dialog
          open={open}
          onClose={handleClose}
          maxWidth={"lg"}
          >

            <DialogContent>

            <MaterialTable
      title="Order Details"
      columns={[
        { title: 'Transaction Id', field: 'transactionid' },
        { title: 'Order Id', field: 'orderid' },
        { title: 'Product Detail Id', field: 'productdetailid' },
        { title: 'Product Name', field: 'productsubname' },
        { title: 'Price', field: 'price' },
        { title: 'Offer Price', field: 'offerprice' },
        { title: 'Quantity', field: 'qty' },
        { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/></>}
        
      
      ]}
      data={orderDetailData}    
     
      
    />
            </DialogContent>

            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>

          
            </Dialog>
  )
}



      
      
    


     


     
    
    
    
    
    
    return(<div style={{ display: 'flex', width:'100%', height:'100vh', fontFamily:'Kanit',  justifyContent:'center',alignItems:'center', background:'#ecf0f1'}}>
           <div style={{ width:'70vw', height:'auto', background:'#fff', borderRadius:10, padding:10}}>
           {orderDisplay()}
           </div>

           {showCategoryForm()}
           


    </div>)

}