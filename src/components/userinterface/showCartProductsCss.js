import makeStyles from '@mui/styles/makeStyles';
export const showStyles = makeStyles({
    root:{
        width:300,
        height:'auto',
        display:'flex',
        flexDirection:'column',
        padding:5
       
    },

    heading:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },

    order:{
        fontSize:16,
        fontWeight:'bold'
    },

    item:{
        fontSize:16,
        fontWeight:'bold',
    },

    product:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:6
    }

});