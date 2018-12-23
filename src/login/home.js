import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TextInput,
  StatusBar,
  AsyncStorage,
  ImageBackground,

} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    Container,
    Header,
    Content,
    Body,
    Left,
    Icon,
    Text,
    Card,
    Right
  } from "native-base";
  import appImage from '../images/back.png';
  import {connect} from 'react-redux';
  import Feed from '../feed';
  import {CONSTANTS,COLORS,styles} from '../../Constants';
  import Notification from '../notifications';
import Carousel from 'react-native-snap-carousel';
import SideMenu from 'react-native-side-menu';
import {updateLogin} from '../actions/appAction';
import {GET_OVERALL_DETAILS} from '../api';
import Speedometer from 'react-native-speedometer-chart';
type Props = {};


const mapStateToProps = state => ({
  credentials:state.auth
});
 class Home extends Component<Props> {
    constructor(props){
    super(props);
    this.state={
      credentials:this.props.credentials,

      notification:false,
      mainData:{
      BHMCGScore:  {
          value:50,
          diff:0
        },
        OFMCGBHMScore:{
          value:50,
          diff:0
        },
        BSP:{
          value:50,
          diff:0
        },
      CEM:{
          value:50,
          diff:0
        }
      },
      AgencyDetails:{
        name:"Loading name..",
        city:"Hosur"
      },
      feed:[
        {
          title:'name',
          name:'name'
        },
        {
          title:'name1',
          name:'name1'
        },

      ],
      loading:true
    }

    }



    componentDidMount(){
      let {credentials} =this.state;
      if(credentials.token!=undefined){
        GET_OVERALL_DETAILS(credentials.token)
          .then(res => {
            console.log(res)
            if(res.error==undefined){
            let {diff,latest_overall,least_improved,lowest_value}=res;
            this.getMainData(diff,latest_overall);
            let {AgencyDetails} = this.state;
            let feed = [];
            if(least_improved!=undefined){
              let obj={};
              obj.title=`You have shown the least improvement in the ${least_improved.measure} . It has changed ${Math.abs(least_improved.diff)}% over the previous month`
              feed.push(obj);
            }
            if(lowest_value!=undefined){
              let obj={};
              obj.title=`In this month, you have performed the worst in ${lowest_value.measure}`;
              feed.push(obj);
            }
            AgencyDetails.name=latest_overall.WDFirm;
            this.setState({
              AgencyDetails,
              feed
            })
          }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    getMainData(diff,latest_overall){

      if(diff==undefined || latest_overall==undefined)return;

      let {mainData} = this.state;
      mainData.BHMCGScore.value=latest_overall.BHMCGScore;
      mainData.OFMCGBHMScore.value=latest_overall.OFMCGBHMScore;
      mainData.BSP.value=latest_overall.BSP;
      mainData.CEM.value=latest_overall.CEM;
      for(var i in diff){
        let diff_iter=diff[i];
        if(mainData[diff_iter.measure]!=undefined)
        mainData[diff_iter.measure].diff=diff_iter.diff;
      }
      this.setState({
        mainData
      },()=>console.log(mainData))

    }
    getConsole(something){
      console.log(something);
    }
    getDeg(value){
      let deg = (value*2.05)-15;
      console.log(value,deg)
      return `${deg}deg`;
    }
  render() {
    const menu = <Notification/>;
    let {mainData,AgencyDetails} =this.state;
    return (
        <Container style={styles.container}>
        <StatusBar
          backgroundColor="#2B2B2B"
          barStyle="light-content"
          />
          <SideMenu menu={menu} menuPosition={'right'} isOpen={this.state.notification}>
        <Header androidStatusBarColor={COLORS.WHITE} iosBarStyle='light-content' style={styles.containerStyle}>
              <Left>
                <Icon name='ios-menu' style={{color:COLORS.WHITE}} onPress={() => this.props.navigation.openDrawer()} />
                </Left>
              <Body >
                <Text style={styles.statusHead}>{CONSTANTS.HOME}</Text>
              </Body>
              <Right>
                <Icon name='ios-notifications' style={{color:COLORS.WHITE}} onPress={() =>{
                  let {notification} = this.state;
                  this.setState({
                    notification:!notification
                  })
                }} />
              </Right>
          </Header>

        <View style={{flex:1,flexDirection:'column',backgroundColor:COLORS.WHITE}}>
          <View style={{flex:0.8,justifyContent:'center',}}>

                  <View style={{flex:1,flexDirection:'row',borderRadius:10,margin:20,elevation:3,backgroundColor:COLORS.WHITE}}>
                                        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../images/profile.png')}
                          style={{width:60,height:55}}
                        />
                    </View>
                    <View style={{flex:8,justifyContent:'center',alignItems:'flex-start',borderLeftColor:'red',borderLeftWidth:1,borderColor:COLORS.DIM_GREY,marginTop:20,marginBottom:20,paddingLeft:10}}>
                        <Text style={{fontSize:22,fontWeight:'bold',marginBottom:7}}>{AgencyDetails.name}</Text>

                        <Text style={{fontSize:12}}>{'Hosur'}</Text>
                    </View>

                  </View>

          </View>
          <View style={{flex:2.3,justifyContent:'center'}}>
            <View style={{flexDirection:'row',marginLeft:10,marginRight:10,height:160}}>
              <View style={{flex:1,flexDirection:'column'}}>
                  <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Bhm')}>
                  <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#f01e29","#f7626a"]} style={{flex:1,backgroundColor:'red',marginTop:10,marginBottom:10,marginLeft:20,marginRight:20,elevation:2,borderRadius:10,alignItems:'center'}}>
                        <Image source={require('../images/speedometer.png')} style={{width:"55%",height:75,margin:10,marginBottom:5}}/>
                        <View style={{ position: 'absolute', transform: [{ rotate: this.getDeg(mainData.BHMCGScore.value) }], top: -5, bottom: 0, left: -5, right: -5, justifyContent: 'center',margin:60 }}>
                          <View  style={{ width: 25, borderWidth: 2, borderColor: '#1d3960', elevation: 4 }} />
                        </View>
                      <Text style={{color:COLORS.WHITE,textAlign:'center',fontSize:12}}>{CONSTANTS.BHM}</Text>
                      <Text style={{color:COLORS.WHITE,textAlign:'center',justifyContent:"center",fontSize:12,fontWeight:"bold"}}>{Math.abs(mainData.BHMCGScore.diff)+"%"}<Icon name='ios-arrow-down' style={{color:COLORS.WHITE,justifyContent:'center',fontSize:14}}  /></Text>
                  </LinearGradient>
                  </TouchableWithoutFeedback>
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Ofm')}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#eaab46","#e59746"]} style={{flex:1,backgroundColor:'red',marginTop:10,marginBottom:10,marginLeft:20,marginRight:20,elevation:2,borderRadius:10,alignItems:'center'}}>
                  <Image source={require('../images/speedometer.png')} style={{width:"55%",height:75,margin:10,marginBottom:5}}/>
                  <View style={{ position: 'absolute', transform: [{ rotate: this.getDeg(mainData.OFMCGBHMScore.value) }], top: -5, bottom: 0, left: -5, right: -5, justifyContent: 'center',margin:60 }}>
                    <View  style={{ width: 25, borderWidth: 2, borderColor: '#1d3960', elevation: 4 }} />
                  </View>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',fontSize:12}}>{CONSTANTS.OFM}</Text>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',justifyContent:"center",fontSize:12,fontWeight:"bold"}}>{Math.abs(mainData.OFMCGBHMScore.diff)+"%"}<Icon name='ios-arrow-down' style={{color:COLORS.WHITE,justifyContent:'center',fontSize:14}}  /></Text>
                </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View style={{flexDirection:'row',marginLeft:10,marginRight:10,height:160}}>
              <View style={{flex:1,flexDirection:'column'}}>
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Cem')}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#4a69f3","#7ea5f9"]} style={{flex:1,backgroundColor:'red',marginTop:10,marginBottom:10,marginLeft:20,marginRight:20,elevation:2,borderRadius:10,alignItems:'center'}}>
                  <Image source={require('../images/speedometer.png')} style={{width:"55%",height:75,margin:10,marginBottom:5}}/>
                  <View style={{ position: 'absolute', transform: [{ rotate: this.getDeg(mainData.CEM.value) }], top: -5, bottom: 0, left: -5, right: -5, justifyContent: 'center',margin:60 }}>
                    <View  style={{ width: 25, borderWidth: 2, borderColor: '#1d3960', elevation: 4 }} />
                  </View>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',fontSize:12}}>{CONSTANTS.CEM}</Text>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',justifyContent:"center",fontSize:12,fontWeight:"bold"}}>{Math.abs(mainData.CEM.diff)+"%"}<Icon name='ios-arrow-down' style={{color:COLORS.WHITE,justifyContent:'center',fontSize:14}}  /></Text>
                </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
                <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Bsp')}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#78bbd2","#4485b4"]} style={{flex:1,backgroundColor:'red',marginTop:10,marginBottom:10,marginLeft:20,marginRight:20,elevation:2,borderRadius:10,alignItems:'center'}}>
                  <Image source={require('../images/speedometer.png')} style={{width:"55%",height:75,margin:10,marginBottom:5}}/>
                  <View style={{ position: 'absolute', transform: [{ rotate: this.getDeg(mainData.BSP.value) }], top: -5, bottom: 0, left: -5, right: -5, justifyContent: 'center',margin:60 }}>
                    <View  style={{ width: 25, borderWidth: 2, borderColor: '#1d3960', elevation: 4 }} />
                  </View>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',fontSize:12}}>{CONSTANTS.BSP}</Text>
                  <Text style={{color:COLORS.WHITE,textAlign:'center',justifyContent:"center",fontSize:12,fontWeight:"bold"}}>{Math.abs(mainData.BSP.diff)+"%"}<Icon name='ios-arrow-down' style={{color:COLORS.WHITE,justifyContent:'center',fontSize:14}}  /></Text>
                </LinearGradient>
                </TouchableWithoutFeedback>
              </View>
            </View>

          </View>
          <View style={{flex:1.0,justifyContent:'center',alignItems:'center',marginBottom:10}}>
          <View style={{flex:0.5,flexDirection:'row'}}>
              <View style={{flex:4,flexDirection:'column',justifyContent:'center',}}>
                <View style={{backgroundColor:COLORS.BLACK,height:2,margin:10}}/>
              </View>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',textAlign:'center'}}>
                <Text>{' Feed'}</Text>
              </View>
              <View style={{flex:4,flexDirection:'column',justifyContent:'center',}}>
                <View style={{backgroundColor:COLORS.BLACK,height:2,margin:10}}/>
              </View>
          </View>
            <Feed feed={this.state.feed}/>
          </View>

          </View>

          </SideMenu>
      </Container>
    );
  }
}
export default connect(mapStateToProps, {updateLogin})(Home);

// <ImageBackground source={require('../images/group3.png')} style= {{flex:1 , width: null,height:null}} resizeMode={'contain'}>
