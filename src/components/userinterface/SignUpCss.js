import makeStyles from '@mui/styles/makeStyles';
export const useStyles = makeStyles({
    root: {
      display: 'flex',
      width:'100%',
      height:'100vh',
      fontFamily:'Kanit', 
      justifyContent:'center',
      alignItems:'center',
      background:'#fff'
    },

    box:{

      width:315,
      height:'auto',
      background:'#fff',
      
      padding:5

    },

    boxdispaly:{

      width:800,
      height:800,
      background:'#fff',
      borderRadius:10,
      padding:10

  },


  container:{

    display:'flex',
    flexDirection:'column',
    margin:'auto',
    marginTop:20,
    background:'#fff',
    paddingBottom:3,
   

},

header:{

  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  gap:0.9,
  width:'100%',
 marginTop:3
 

},

header:{
  color:'grey',
  fontSize:20,
  fontWeight:70,
  alignItems:'center',
  justifyContent:'center',
  display:'flex'


},

inputs:{

  display:'flex',
  flexDirection:'column',
 
 
  gap:15,
  
 marginTop:5
 

},

input:{

  display:'flex',
  alignItems:'center',
  background:'#eaeaea',
  width:250,
  height:35,
  
  
  
 },

 textbox:{

  height:20,
  width:250,
  background:'transparent',
  border:'none',
  outline:'none',
  color:'#797979',
fontSize:12,
marginLeft:10,
  
  
 },

 login:{
  
  
  color:'#797979',
  fontSize:10,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
 }

 
 




  });