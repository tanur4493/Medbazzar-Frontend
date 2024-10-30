import {useState,useEffect} from "react"
import { Button,Grid,TextField, Avatar } from "@mui/material"
import {FormControl,Select,MenuItem,InputLabel} from "@mui/material"
import { useStyles } from "./ProductDetailsCss"
import TitleComponent from "../../components/admin/TitleComponent"
import { postData,getData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from "react"

export default function ProductDetails(props){
    var classes=useStyles()
    var navigate=useNavigate()
    
    const modules = useMemo(() => ({

    toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['image', "link","video"],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
       
      },
    }), [])
    
    const [categoryId,setCategoryId]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [concernId,setConcernId]=useState('')
    const [concernList,setConcernList]=useState([])
    const [subcategoryId,setSubCategoryId]=useState('')
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [brandId,setBrandId]=useState('')
    const [productId,setProductId]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [description,setDescription]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const[offerType,setOfferType]=useState('')
    const [picture,setPicture]=useState({file:[],bytes:''})
    const [error,setError]=useState({})

    
    
    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        if(result.status)
        {setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleCatgoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
        
    }

    const fetchAllConcern=async()=>{
        var result=await getData('concern/display_all_concern')
        if(result.status)
        {setConcernList(result.data)
        }
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcern=()=>{
        return concernList.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
        })
    }

  


    const fetchAllSubCategory=async(cid)=>{
        var result=await postData('subcategory/fetch_all_subcategory_by_id',{categoryid:cid})
        if(result.status)
        {
          //  alert(JSON.stringify(result.data))
            setSubCategoryList(result.data)
        }
        
}

const fillAllSubCategory=()=>{
    return subCategoryList.map((item)=>{
       
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
}

const fetchAllBrand=async()=>{
    var result=await getData('brand/display_all_brand')
    if(result.status)
    {setBrandList(result.data)
    }
}
useEffect(function(){fetchAllBrand()},[])

const fillAllBrand=()=>{
    return brandList.map((item)=>{
        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
}


const handleBrandChange=(event)=>{
    setBrandId(event.target.value)
    fetchAllProduct(event.target.value)
    
}

const fetchAllProduct=async(bid)=>{
    var result=await postData('product/fetch_all_product_by_brandid',{brandid:bid})
    if(result.status)
    {
      //  alert(JSON.stringify(result.data))
        setProductList(result.data)
    }
    
}

const fillAllProduct=()=>{
    return productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })
}

const handlePicture=async(event)=>{
   // alert(JSON.stringify(event.target.files))
    if(Object.values(event.target.files).length<=3)
    {alert("PLS UPLOAD 3 OR MORE FILES")
    }
    else
    {
    setPicture({file:Object.values(event.target.files),bytes:event.target.files})
    }
}

const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))
}

const handleSubmit=async()=>{
    var submit=true
    if(categoryId.length==0)
    {
        handleError('categoryId','Pls choose category')
        submit=false
    }
    if(subcategoryId.length==0)
    {
        handleError('subcategoryId','Pls choose subcategory')
        submit=false
    }

    if(brandId.length==0)
    {
        handleError('brandId','Pls choose Brand')
        submit=false
    }

    if(productId.length==0)
    {
        handleError('productId','Pls choose Product')
        submit=false
    }
    if(productSubName.length==0)
    {
        handleError('productSubName','Pls input productSubname')
        submit=false
    }

    if(description.length==0)
    {
        handleError('description','Pls input description')
        submit=false
    }

    if(weight.length==0)
    {
        handleError('weight','Pls input weight')
        submit=false
    }

    if(weightType.length==0)
    {
        handleError('weightType','Pls choose weight Type')
        submit=false
    }

    if(type.length==0)
    {
        handleError('type','Pls choose Type')
        submit=false
    }

    if(packaging.length==0)
    {
        handleError('packaging','Pls input packaging')
        submit=false
    }

    if(qty.length==0)
    {
        handleError('qty','Pls input qty')
        submit=false
    }

    if(price.length==0)
    {
        handleError('price','Pls input price')
        submit=false
    }

    if(offerPrice.length==0)
    {
        handleError('offerPrice','Pls input offerPrice')
        submit=false
    }

    if(offerType.length==0)
    {
        handleError('offerType','Pls choose offerType')
        submit=false
    }

    if(picture.bytes.length==0)
    {
        handleError('picture','Pls choose icon...')
        submit=false
    }

    if(submit)
    {
        var formData= new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subcategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubName)
            formData.append('concernid',concernId)
            formData.append('description',description)
            formData.append('weight',weight)
            formData.append('weighttype',weightType)
            formData.append('type',type)
            formData.append('packaging',packaging)
            formData.append('qty',qty)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('offertype',offerType)
            picture.file.map((item,i)=>{
            formData.append('picture'+i,item)
            })
        var result=await postData('productdetails/submit_productdetail',formData)
        console.log(result)
        if(result.status)
            {
                Swal.fire({
                    icon: "success",
                    title: result.message,
                    timer:1500,
                    
                  });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer:1500,
                  });
            }
 }
}

const handleReset=()=>{
    
    setCategoryId('')
    setSubCategoryId('')
    setBrandId('')
    setProductId('')
    setProductSubName('')
    setDescription('')
    setWeight('')
    setWeightType('')
    setType('')
    setPackaging('')
    setQty('')
    setPrice('')
    setOfferPrice('')
    setOfferType('')
    setPicture({file:'medical.png',bytes:''})
}

const showImages=()=>{
   return picture?.file?.map((item,i)=>{
        return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item,i)} variant="rounded" /></div>)
    })
}







    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={3} >

        <Grid item xs={12}>

<TitleComponent title="Add Product Details" logo="logo.png"   listicon="list.png" page='/admindashboard/displayallproductdetails'/>
        </Grid> 

        <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" value={categoryId}
                        onChange={handleCatgoryChange}
                        onFocus={()=>handleError('categoryId',null)}>
                            {fillAllCategory()}
                        
                        </Select>
                        {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}          

                    </FormControl>
                    </Grid>
                    <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel> Sub Category</InputLabel>
                        <Select label=" Sub Category" value={subcategoryId}
                        onChange={(event)=>setSubCategoryId(event.target.value)}
                        onFocus={()=>handleError('subcategoryId',null)}>
                        
                    {fillAllSubCategory()}

                        </Select>
                        {error.subcategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.subcategoryId}</span>:<></>}          
                       
                        </FormControl>
                        
                        </Grid>

                        <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel> Brands </InputLabel>
                        <Select
                        label="Brands" value={brandId}
                        onChange={handleBrandChange}
                        onFocus={()=>handleError('brandId',null)}>
                          {fillAllBrand()}

                        </Select>
                        {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.brandId}</span>:<></>}    
                    </FormControl>
                </Grid>




                    <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Product</InputLabel>
                        <Select label="Product" value={productId} 
                        onChange={(event)=>setProductId(event.target.value)}
                        onFocus={()=>handleError('productId',null)}>
                         {fillAllProduct()}
                        

                           </Select>
                           {error.productId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.productId}</span>:<></>}      
                  </FormControl>
                    </Grid>

                    <Grid item xs={6}>

            <TextField  value={productSubName} onFocus={()=>handleError('productSubName',null)} error={error.productSubName} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.productSubName}</span>}  onChange={(event)=>setProductSubName(event.target.value)} label= "Product Subname" fullWidth/>
           
            </Grid>

            <Grid item xs={6}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Concern</InputLabel>
                        <Select label="Concern" value={concernId}
                         onChange={(event)=>setConcernId(event.target.value)}
                        onFocus={()=>handleError('concernId',null)}>
                            {fillAllConcern()}
                        
                        </Select>
                        {error.concernId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.concernId}</span>:<></>}          

                    </FormControl>
                    </Grid>

            <Grid item xs={12}>

            <ReactQuill modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} />
</Grid>

            <Grid item xs={3}>

              <TextField value={weight} onFocus={()=>handleError('weight',null)} error={error.weight} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.weight}</span>}  onChange={(event)=>setWeight(event.target.value)} label= "Weight" fullWidth/>

</Grid>

<Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Weight Type</InputLabel>
                        <Select label="WeightType" value={weightType}
                         onChange={(event)=>setWeightType(event.target.value)}
                         onFocus={()=>handleError('weightType',null)}>
                        <MenuItem value={'mg'}>mg</MenuItem>
                     <MenuItem value={'ml'}>ml</MenuItem>
                         <MenuItem value={'litre'}>litre</MenuItem>
                         <MenuItem value={'kg'}>kg</MenuItem>
                         <MenuItem value={'pcs'}>pcs</MenuItem>
                         <MenuItem value={'gm'}>gm</MenuItem>
                        
                         </Select>
                         {error.weightType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.weightType}</span>:<></>}     
                 </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select label="Type" value={type}
                        onChange={(event)=>setType(event.target.value)}
                        onFocus={()=>handleError('type',null)}>
                        <MenuItem value={'Tablets'}>Tablets</MenuItem>
                       <MenuItem value={'capsules'}>capsules</MenuItem>
                         <MenuItem value={'Drip'}>Drip</MenuItem>
                         <MenuItem value={'Injections'}>Injections</MenuItem>
                        < MenuItem value={'Lotions'}>Lotions</MenuItem>
                        < MenuItem value={'Cereal'}>Cereal</MenuItem>
                        <MenuItem value={'Diapers'}>Diapers</MenuItem>
                        <MenuItem value={'Equipments'}>Equipments</MenuItem>
                        <MenuItem value={'Spray'}>Spray</MenuItem>
                        <MenuItem value={'Rollon'}>Rollon</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                     </Select>
                     {error.type?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.type}</span>:<></>}         

                    </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>Packaging</InputLabel>
                        <Select label="Packaging" value={packaging}
                         onChange={(event)=>setPackaging(event.target.value)}
                         onFocus={()=>handleError('packaging',null)}>
                            <MenuItem value={'Bottles'}>Bottles</MenuItem>
                          <MenuItem value={'Packs'}>Packs</MenuItem>
                          <MenuItem value={'Box'}>Box</MenuItem>
                         
                        
                         </Select>
                         {error.packaging?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.packaging}</span>:<></>}       

                    </FormControl>
                    </Grid>

                    <Grid item xs={3}>

<TextField value={qty} onFocus={()=>handleError('qty',null)} error={error.qty} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.qty}</span>}  onChange={(event)=>setQty(event.target.value)} label= "Quantity" fullWidth/>

</Grid>

<Grid item xs={3}>

<TextField value={price} onFocus={()=>handleError('price',null)} error={error.price} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.price}</span>} onChange={(event)=>setPrice(event.target.value)}  label= "Price" fullWidth/>

</Grid>

<Grid item xs={3}>

<TextField  value={offerPrice} onFocus={()=>handleError('offerPrice',null)} error={error.offerPrice} helperText={<span style={{color:'#d32f2f',fontSize:14,fontFamily:'kanit'}}>{error.offerPrice}</span>}  onChange={(event)=>setOfferPrice(event.target.value)} label= "OfferPrice" fullWidth/>

</Grid>

<Grid item xs={3}>
                    
                    <FormControl fullWidth>
                        <InputLabel>OfferType</InputLabel>
                        <Select label="OfferType"  value={offerType}
                         onChange={(event)=>setOfferType(event.target.value)}
                         onFocus={()=>handleError('offerType',null)}>
                             <MenuItem value={'Month end sale'}>Month end sale</MenuItem>
                             <MenuItem value={'Trending products'}>Trending products</MenuItem>
                             <MenuItem value={'Popular products'}>Popular products</MenuItem>
                           </Select>
                        
                         {error.offerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.offerType}</span>:<></>} 
                    </FormControl>
                    </Grid>

                    <Grid item xs={6}>

<Button  variant="contained" component="label" fullWidth>
    Upload
    <input onChange={handlePicture} type="file" hidden accept="images/*" multiple/>


</Button>
</Grid>

<Grid item xs={6} style={{display:'flex',justifyContent:'center'}}>
   {showImages()}      
                </Grid>

                <Grid item xs={6}>

<Button onClick={handleSubmit} variant="contained"  fullWidth>
      Submit


</Button>

</Grid>       

<Grid item xs={6}>

<Button onClick={handleReset} variant="contained"  fullWidth>
      Reset


</Button>

</Grid>    






            
          </Grid>
        </div>  
    </div>)


}