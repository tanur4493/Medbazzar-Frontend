import { useState } from "react";
import { useStyles } from "./AdminDashboardCss";
import { Avatar,AppBar,Box,Toolbar,Typography,Grid,Paper } from "@mui/material";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Routes,Route,Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices"
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import Brands from "./Brands";
import DisplayAllBrands from "./DisplayAllBrands";
import Concern from "./Concern";

import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProductDetails";
import Banner from "./Banner";
//import Summary from "./Summary";
//import Chart from "../../components/DashboardComponent/Chart";

export default function AdminDashboard(props){
    const classes=useStyles();
    const navigate=useNavigate();
    var adminData=JSON.parse(localStorage.getItem('ADMIN'))

    return(
        <Box sx={{flexGrow:1}}>
        <AppBar position="sticky">
        <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
            MedBazzar
        </Typography>
        </Toolbar>
       </AppBar>

       <Grid container spaces={3} style={{paddingInlineStart:5}}>
        <Grid item xs={2.2}>
            <paper>
                <div className={classes.leftBarStyle}>
                    <img src={`${serverURL}/images/${adminData.picture}`} style={{width:70,height:70,borderRadius:35}}/>
                    <div className={classes.nameStyle}>{adminData.adminname}</div>
                    <div className={classes.emailStyle}>{adminData.emailid}</div>
                    <div className={classes.phoneStyle}>{adminData.mobileno}</div>
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
        </Grid>

        <Grid item xs={9.8} style={{padding:20}}>
            
                <Routes>
                    {/* <Route path="/" element={<Navigate to="/admindashboard/summary" replace={true}/>}/> */}
                    <Route element={<Categories/>} path='/category'/>
                    <Route element={<DisplayAllCategory/>} path='/displayallcategory'/>
                    <Route element={<SubCategory/>} path='/subcategory'/>
                    <Route element={<DisplayAllSubCategory/>} path='/displayallsubcategory'/>
                    <Route element={<Brands/>} path='/brands'/>
                    <Route element={<DisplayAllBrands/>} path='/displayallbrands'/>
                    <Route element={<Products/>} path='/products'/>
                    <Route element={<DisplayAllProducts/>} path='/displayallproducts'/>
                    <Route element={<ProductDetails/>} path='/productdetails'/>
                    <Route element={<DisplayAllProductDetails/>} path='/displayallproductdetails'/>
                    <Route element={<Banner/>} path='/banner'/>
                    <Route element={<Concern/>} path='/concern'/>

                </Routes>
            
        </Grid>
      
      
      
      
     

        
        
        
        
        
        
        
      </Grid>
        </Box>
 )
}