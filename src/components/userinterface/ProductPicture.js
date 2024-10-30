import { serverURL } from "../../services/FetchNodeServices"
import { Grid } from "@mui/material"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useState } from "react";

export default function ProductPicture(props){ 

   
    const settings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase:'linear',
        arrows:false,
          };

          const settings2 = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            cssEase:'linear',
            arrows:false,
            autoplay:true,
            vertical:true,
            verticalSwipping:true
              };

var product=props?.item

 var images=(product).multi_picture.split(",")
//  const showSlide1=()=>{
//     return images.map((item,index)=>{
//         return (<div><img src={`${serverURL}/images/${item}`} 
//         style={{//width: 80,
//             // borderRadius: 10,
//            // height: 80,
//            // marginLeft: "auto",
//            // marginRight: "auto",
//            width:"78%",height:'auto',display:'block',borderRadius:10
//         }}/>
//         </div>
//         )
//     })
//  }
const [sliderData,setSliderData]=useState(images[0])

    const handleImg=(index)=>{

      var slider=images[index]
      setSliderData(slider)
    }


 

 const showSlide2=()=>{
    return images.map((item,index)=>{
        return (<div><img src={`${serverURL}/images/${item}`}   onMouseOver={()=>handleImg(index) } 
        style={{
           width:"48%",height:'auto',display:'block',borderRadius:10,aspectRatio:2/2
        }}/>
        </div>
        )
    })
 }
 
 

 
    

    return(<div style={{width:'100%',padding:10}} >
      {/* <Grid container spacing={3}>*/}
            {/*<Grid item xs={12}>
      <img  src={`${serverURL}/images/${product.picture}`} style={{width:400,height:'auto',display:'block',marginLeft:'auto',marginRight:'auto',borderRadius:10}}/>
    </Grid>*/}

<div style={{marginLeft:'auto',display:'flex',justifyContent:'flex-end'}} >
                        <FavoriteBorderOutlinedIcon style={{marginRight:20}} />
                        <ShareOutlinedIcon style={{marginRight:20}} />
                    </div>

     <Grid container spacing={1}>

     <Grid item xs={3}>
        
        <Slider {...settings2}  >
           {showSlide2()}
        </Slider>
        </Grid>

        <Grid item xs={9}>
      {/* <Slider {...settings1}  >
         {showSlide1()}
      </Slider> */}
      <img src={`${serverURL}/images/${sliderData}`} width="80%" height='90%' />
      </Grid>
      

     

        </Grid>
      
    
      
    {/*</Grid>*/}
    </div>)

}