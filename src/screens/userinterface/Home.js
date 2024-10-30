import { Divider,Grid } from "@mui/material"
import BrandComponent from "../../components/userinterface/BrandComponent"
import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import SliderComponent from "../../components/userinterface/SliderComponent"
import CategoryComponent from "../../components/userinterface/CategoryComponent"
import ProductComponent from "../../components/userinterface/ProductComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import { useState,useEffect } from "react"
import { getData, postData } from "../../services/FetchNodeServices"
import ConcernComponent from "../../components/userinterface/ConcernComponent"
export default function Home(props)
// 18 july 19:00
{
    const [bannerList,setBannerList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [concernList,setConcernList]=useState([])
    const[productListOffer,setProductListOffer]=useState([])
    const[trendingList,setTrendingList]=useState([])
    const[popularList,setPopularList]=useState([])
    const[pageRefresh,setPageRefresh]=useState(false)

const fetchAllBanners=async()=>{
    var result=await postData('userinterface/show_all_banners',{bannertype:'General'})
    setBannerList(result.data)
}

const fetchAllBrands=async()=>{
    var result=await getData('userinterface/show_all_brands')
    setBrandList(result.data)

}

const fetchAllCategory=async()=>{
    var result=await getData('userinterface/display_all_category')
    setCategoryList(result.data)

}

const fetchAllConcern=async()=>{
    var result=await getData('userinterface/display_all_concern')
    setConcernList(result.data)

}


const fetchAllProductDetail=async(offertype)=>{
    var result=await postData('userinterface/display_all_productdetail_by_offer',{offertype})
    setProductListOffer(result.data)

}

const fetchAllTrendingProducts=async(offertype)=>{
    var result=await postData('userinterface/display_all_productdetail_by_offer',{offertype})
    setTrendingList(result.data)

}

const fetchAllPopularProducts=async(offertype)=>{
    var result=await postData('userinterface/display_all_productdetail_by_offer',{offertype})
    setPopularList(result.data)

}

useEffect(function(){
fetchAllBanners()
fetchAllBrands()
fetchAllCategory()
fetchAllConcern()
fetchAllProductDetail('Month end sale')
fetchAllTrendingProducts('Trending products')
fetchAllPopularProducts('Popular products')
},[])
    

    return(<div >
        <Header/>
        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <SliderComponent data={bannerList} />
        </div>
        
        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

       

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <BrandComponent title="Brands"   data={brandList} />
        </div>

      
       

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <CategoryComponent title=" Browse by category"  data={categoryList}/>
        </div>

        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

       
        <div style={{display:'flex',justifyContent:'center',marginTop:20,}}>
            <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title=" Month end sale"  data={productListOffer}/>
        </div>

        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}  title=" Trending Products"  data={trendingList}/>
        </div>

        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}  title=" Popular Products"  data={popularList}/>
        </div>

        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
            <ConcernComponent title=" Concern"  data={concernList}/>
        </div>

        <div style={{marginTop:40,width:'bolder'}}>
        <Divider/>
        </div>

        <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginTop:20,padding:20,margin:20}}>
            <FooterComponent/>
        </Grid>

       



    

    </div>)
}