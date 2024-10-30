import { AppBar,Box,Toolbar,Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import logo from '../../assests/logo.png'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStyles } from "../../screens/userinterface/HomeCss"
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices"
import { useSelector } from "react-redux";
import ShowCartProducts from "../userinterface/ShowCartProducts"
import { showStyles } from "./showCartProductsCss";
import Cookies from "js-cookie";


export default function Header(props)
{
  
  const theme = useTheme();
  const classes=useStyles();
  const showClasses=showStyles();
  try{
  var prd=JSON.parse(Cookies.get('CART'))
  }
  catch{
    prd={}
  }
  const [pattern,setPattern]=useState('')

 
  var products=useSelector((state)=>state.data)
  var user=useSelector((state)=>state.user)
  
  var keys=Object?.keys(prd)
  var 
  userData=''
  var  userInformation={}
  try{
    userData=Object.values(user)[0].username.split(' ')
    userData=userData[0]
    userInformation=Object.values(user)[0]
   
  }catch(e){}






  const navigate=useNavigate();
  const[status,setStatus]=useState(false)
  const [isOpen,setIsOpen]=useState(false)
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  
  const handleDrawer=()=>{
    setStatus(true)
  }

  const handleClose=()=>{
    setStatus(false)
  }

  const showCartDetails=()=>{
  
    setIsOpen(true)
  }
  const hideCartDetails=()=>{
  
    setIsOpen(false)
  }

  const handleFilterPage=()=>{
    navigate(`/filterscreen/${pattern}`)
   
   }

   const handleEnter=(e)=>{
    if(e.key=='Enter')
    navigate(`/filterscreen/${e.target.value}`)
   
   }

  const drawerList=()=>{
    return(
      <paper>
      <div className={classes.leftBarStyle}>
      <img src={`${serverURL}/images/1.jpg`}  style={{width:70,height:70,borderRadius:35}} />
          <div className={classes.nameStyle}>{userInformation?.username}</div>
          <div className={classes.emailStyle}>{userInformation?.emailid}</div>
          <div className={classes.phoneStyle}>{`+91${userInformation?.mobileno}`}</div>
      </div>

      <div className={classes.menuStyle}>
          <List>
              <Divider/>
              <ListItem disablePadding>
                  <ListItemButton>
                      <ListItemIcon>
                          <DashboardIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')}>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Brand List</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')}>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Product List</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton  onClick={()=>navigate('/admindashboard/banner')} >
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton  onClick={()=>navigate('/admindashboard/concern')} >
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>concern</span>}/>
                  </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                  <ListItemButton>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>}/>
                  </ListItemButton>
              </ListItem>

              <Divider />
              <ListItem disablePadding>
                  <ListItemButton>
                      <ListItemIcon>
                          <DraftsIcon/>
                     </ListItemIcon>
                     <ListItemText primary={<span className={classes.menuItemStyle}>Log Out</span>}/>
                  </ListItemButton>
              </ListItem>
          </List>

      </div>
  </paper>
    )
  }

  const secondarySearchBar=()=>{
    return(
      <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background:'#fff'}} position="static">
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
        <MenuOutlinedIcon onClick={handleDrawer} style={{fontSize:30,color:'#000'}}/> 
         {searchBarComponent()}
         <div style={{ display:'flex',width:70,justifyContent:'space-between'}}>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
           <PersonOutlineOutlinedIcon  onClick={()=>navigate("/signinpage")} style={{fontSize:30,color:'#000'}}/> 
           <div style={{width:'25%',fontSize:'0.5vw',color:'#000',fontWeight:'bolder'}}>{userData}</div>
           </div>
          
           <PhoneOutlinedIcon style={{fontSize:30,color:'#000'}}/>
          </div>
        </Toolbar>
      </AppBar>
      <div>
      
      </div>
    </Box>
    )
  }

  const searchBarComponent=()=>{
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', margin:1, alignItems: 'center', width: '50% '}}
      >
       
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products Here..."
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e)=>setPattern(e.target.value)}
          onKeyDown={(e)=>handleEnter(e)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon  onClick={handleFilterPage}/>
        </IconButton>
        
      </Paper>
    );

  }
    return(
        <Box sx={{ flexGrow: 1,position:'relative' }} onMouseLeave={hideCartDetails}>
        <AppBar style={{background:'#fff'}} position="static">
          <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
           <img src={logo} style={{width:matches?'30%':'12%'}} />
           {!matches?searchBarComponent():<div></div>}
           <div style={{ display:'flex',width:!matches?110:50,justifyContent:'space-between'}}>
           
              {!matches?<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
              <PersonOutlineOutlinedIcon  onClick={()=>navigate("/signinpage")} style={{fontSize:30,color:'#000'}}/> 
              <div style={{width:'25%',fontSize:'0.6vw', fontWeight:'bolder',color:'#000',marginRight:10}}>{userData}</div>
           </div>:<div></div>} 
              
              
              <Badge badgeContent={keys?.length} color="primary">
             <ShoppingCartOutlinedIcon  onMouseOver={showCartDetails}  style={{fontSize:30,color:'#000'}}/>
             </Badge>

             {!matches?<PhoneOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>}
            </div>
          </Toolbar>
        </AppBar>
        <div>
          {matches?secondarySearchBar():<div></div>}
        
        </div>
        <Drawer
           anchor={'left'}
           open={status}
            onClose={handleClose}
          >
            {drawerList()}
          </Drawer>
          <ShowCartProducts isOpen={isOpen} />
          
      </Box>
    

    )
}