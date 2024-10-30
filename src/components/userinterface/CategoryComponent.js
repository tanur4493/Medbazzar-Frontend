import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
export default function CategoryComponent(props){

    const theme = useTheme();
  const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
    var navigate=useNavigate()

    var sld=createRef()


    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
      };
      
    var category=props?.data
    // var images=Object.values(category)[0].picture.split(",")

    const handleGoToFilterPage=(item)=>{
    navigate('/filterscreen/null',{state:{categoryid:item.categoryid}})
    }




    const showCategorySlide=()=>{
        
        return category?.map((item)=>{
            return (
                <div  onClick={()=>handleGoToFilterPage(item)} style={{fontFamily:'kanit'}}><div style={{marginLeft:3,marginRight:3,width:"90%",display:'block',borderRadius:10}}>
            <img src={`${serverURL}/images/${item.picture}`} 
            style={{width: "80%",
              
            borderRadius: 10,
            height: 'auto',
           
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            aspectRatio:3/3,}}/>
            </div>
            <div style={{textAlign:'center',width:'90%',fontWeight:'bold',fontSize:matchesMd?"0.7em":"1.0em"}}>{item.categoryname}</div>
            </div>
            )
        })
     }


     const handleForward=()=>{
        sld.current.slickPrev()
     }
     const handleBackward=()=>{
       sld.current.slickNext()
     }
    
    
    return(
        <div style={{width:'95%',position:'relative' }}>
            <div style={{margin:'10px 0px 15px 15px',fontWeight:'bold',fontSize:matchesMd?"0.7em":"1.0em"}}>{props?.title}</div>
            { matchesMd?<div></div>:
            <div style={{zIndex:2,top:'50%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
                <ArrowBackIosIcon onClick={handleBackward}/>
            </div>
}
        <Slider {...settings} ref={sld}>
         {showCategorySlide()}
      </Slider>
      { matchesMd?<div></div>:
      <div style={{zIndex:2,top:'50%',right:'0.09%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
      <ArrowForwardIosIcon onClick={handleForward}/>
      </div>
}
      </div>
    );
 


}

      
