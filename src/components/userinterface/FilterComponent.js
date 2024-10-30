
import { Divider, Grid,Paper,Button , useMediaQuery} from "@mui/material"
import InputBase from '@mui/material/InputBase';
import { useEffect,useState } from "react";
import { getData ,postData} from "../../services/FetchNodeServices";
import {MenuItem} from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from "@mui/material/styles";


export default function FilterComponent(){
    const[categoryList,setCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[subCategoryList,setSubCategoryList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();

    const matchesMd=useMediaQuery(theme.breakpoints.down("md"));
    


   const fetchAllCategory=async()=>{
        var result=await getData('userinterface/display_all_category')
        if(result.status)
        {setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()},[])

    
    const fetchAllSubCategory=async(cid)=>{
      var result=await postData('userinterface/fetch_all_subcategory_by_id',{categoryid:cid})
      if(result.status)
      {
        //  alert(JSON.stringify(result.data))
        setSubCategoryList(result.data)
      }
      
}

useEffect(function(){fetchAllSubCategory()},[])

const handleSubCategory=(categoryid,event)=>{
  fetchAllSubCategory(categoryid)
  setAnchorEl(event.currentTarget)

}



const fillAllSubCategory=()=>{
  return subCategoryList.map((item)=>{
     
      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
  })
}


    const showAllCategory=()=>{
        return categoryList.map((item)=>{
         
         return <div>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          value={item.categoryid}
          onClick={(event)=>handleSubCategory(item.categoryid,event)} 
        >
          {item.categoryname}
        </AccordionSummary>
        <AccordionDetails>
       {fillAllSubCategory()}
        </AccordionDetails>
      </Accordion>
    </div>


        })
    }


        
   {/*const fetchAllSubCategory=async(cid)=>{
        var result=await postData('userinterface/fetch_all_subcategory_by_id',{categoryid:cid})
        if(result.status)
        {
          //  alert(JSON.stringify(result.data))
            setSubCategoryList(result.data)
            
            
            
        }
        
}
useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return subCategoryList.map((item)=>{
           
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }*/}


        

           const fetchAllBrand=async()=>{
            var result=await getData('brand/display_all_brand')
            if(result.status)
            {setBrandList(result.data)
            }
        }
        useEffect(function(){fetchAllBrand()},[])
    
        const showAllBrands=()=>{
            return brandList.map((item)=>{
                return <MenuItem value={item.brandid}> <span> <FormControlLabel control={<Checkbox  />} /></span>
                    {item.brandname}
               
                </MenuItem>
            })
        }

    
    
    return(<div style={{width:'100%',height:'100%'}}>
   <div style={{width:matchesMd?200:280,height:'auto',background:"#f7f8f9",padding:matchesMd?'':10,margin:matchesMd?'':40,fontFamily:'kanit',borderRadius:10}}>
    <Grid container spacing={1}>
        <Grid item xs={12} style={{fontSize:20,fontWeight:'bolder',marginTop:10,padding:5,marginLeft:10}}>
          Filters
        </Grid>

        <Grid item xs={12}>
            <Divider/>
        </Grid>


        <Grid item xs={12} style={{fontSize:18,marginTop:10,padding:5,marginLeft:10,borderWidth:'bolder'}}>
            Category
        </Grid>

        <Grid item xs={12}>
        <Paper
           
          
           component="form"
           sx={{  display: 'flex',  alignItems: 'center', width: '95%',borderRadius:5}}
         >
         
           <InputBase

           style={{color:'black'}}
           
             sx={{ ml: 1, flex: 1 }}
             placeholder="Search Categories"
             inputProps={{ 'aria-label': 'search google maps' }}
           />
           
           </Paper>
           </Grid>

           <Grid item xs={12} >
           <div style={{display:'flex',flexDirection:'column'}}>{showAllCategory()}</div>
           </Grid>

           <Grid item xs={12}>
            <Divider/>
        </Grid>

        <Grid item xs={12} style={{fontSize:18,marginTop:10,padding:5,marginLeft:10,borderWidth:'bolder'}}>
            Brands
        </Grid>

        <Grid item xs={12}>
        <Paper
           
          
           component="form"
           sx={{  display: 'flex',  alignItems: 'center', width: '95%',borderRadius:5}}
         >
         
           <InputBase

           style={{color:'black'}}
           
             sx={{ ml: 1, flex: 1 }}
             placeholder="Search Brands"
             inputProps={{ 'aria-label': 'search google maps' }}
           />
           
           </Paper>
           </Grid>

           <Grid item xs={12} >
           <div style={{display:'flex',flexDirection:'column'}}>{showAllBrands()}</div>
           </Grid>

          


         


        
          
        





    </Grid>




</div>
    </div>)
}