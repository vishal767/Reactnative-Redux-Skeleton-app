import {StyleSheet} from 'react-native';
export const CONSTANTS ={
    LOGIN:'Login',
    APPNAME:"Cure Call ",
    APPCOLOR:"#ee5253",
    EMAIL:"EMAIL",
    PASSWORD:"Password",
    FORGOTPASSWORD:"Forgot Password ?",
    USERNAME:'Username',
    TEXTLABELCOLOR:"#00a662",
    HOME:'Home',
    LOGINFORM:{
      NAME:'Name',
      PASSWORD:'Password',
      GST:'GST No',
      WEBSITE:'Website',
      EMAIL:'Mail Id'
    },
    SAVE:'Save',
    DEFAULT:'Default',
    BHM:"Bhm",
    PROFILE:"Profile",
    LEADER_BOARD:"LeaderBoard",
    NOTIFICATIONS:'Notifications'
}
export const COLORS = {
  TEXTLABELCOLOR:"#00a662",
  APPCOLOR:"#ee5253",
  WHITE:"#fff",
  BLACK:"#333333",
  THEME:"#042e5e",
  DIM_GREY:"#b7b7b7",
  VERY_DIM_GREY:'#ebebeb',
  DIM_GREEN:'#9cfd63',
  END_GRADIENT:'#033efb',
}
export const styles = StyleSheet.create({
  Drawerbutton:{
    margin:10
  },
  DrawerbuttonText:{
    margin:0,
    color:COLORS.WHITE,
  },
  MainView:{
    height: '100%',
     width: '100%',
    flex:1,
   },
  headerView:{ justifyContent: 'center', alignItems: 'center', height: 150, paddingTop: 10},
  header:{
    color:CONSTANTS.APPCOLOR,
    fontFamily:'Lato',
    fontSize:70
  },
  loginView:{height:450,width:370, marginLeft: '5%',marginRight: '10%'},
    container: {
        flex: 1,
      justifyContent: 'center'
    },
    color: {
        color: '#000'
    },
    text: {
        alignSelf: 'center',
        color: '#C0C0C0',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    LoginText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Lato-Bold',
        paddingTop: 14,
        paddingBottom: 10
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    signin:{
      borderRadius:50,

        margin: 50,
         height: 50
       },
       textHeader:{ color:COLORS.TEXTLABELCOLOR, marginTop: 10, marginBottom:5},
       textInputLayout:{borderBottomColor: COLORS.DIM_GREY, borderBottomWidth: 1, color: COLORS.TEXTLABELCOLOR, height: 40,margin:20},
       profiletextHeader:{ color:CONSTANTS.BLACK, marginTop: 10, marginBottom:5,marginLeft:20},
       profiletextInputLayout:{borderBottomColor: COLORS.DIM_GREY, borderWidth: 1, color: 'white', height: 50,margin:20,marginTop:5,fontSize:20,backgroundColor:COLORS.VERY_DIM_GREY},
       containerStyle: {
      borderWidth: 1.5,
      borderRadius: 1.5,
      borderColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: COLORS.BLACK,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 7,

      backgroundColor:COLORS.THEME

    },
    statusHead:{
         left:50,
         color:COLORS.WHITE,
         fontWeight:'500',
         fontSize:18

       },
    savebutton:{
      borderWidth:1,
      borderColor:COLORS.DIM_GREY,
      backgroundColor:COLORS.THEME,
      padding:7,
      paddingLeft:25,
      paddingRight:25,
      marginRight:10
    },
    savebuttonText:{
      textAlign:'center',
      fontSize:15,
      color:COLORS.WHITE
    },
    defaultbutton:{
      borderWidth:1,
      borderColor:COLORS.DIM_GREY,
      backgroundColor:COLORS.WHITE,
      padding:7,
      paddingLeft:25,
      paddingRight:25,
      marginRight:10
    },
    defaultbuttonText:{
      textAlign:'center',
      fontSize:15,
      color:COLORS.BLACK
    },
      linearGradient: {

      paddingLeft: 35,
      paddingRight: 35,
      borderRadius: 5
    },
    buttonText: {
      fontSize: 23,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',

    },
  });
