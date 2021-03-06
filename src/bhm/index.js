import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  StatusBar,
  AsyncStorage,
  ImageBackground,
  ScrollView,
  Picker
} from 'react-native';
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
import {CONSTANTS,COLORS,styles} from '../../Constants';
import Chart from './chart';
import Carousel from 'react-native-snap-carousel';
import Feed from '../feed';
import {GET_GRAPH_DETAILS} from '../api';
type Props = {};

const mapStateToProps = state => ({
  credentials:state.auth
});
class BhmPage extends Component<Props> {

  constructor(props){
    super(props);
    this.state= {
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
      credentials:this.props.credentials,
      submeasure:"KSFT",
      graph_data:{
        measurearray:[],
        montharray:[]
      }
    }
  }
  componentDidMount(){
    let {credentials} = this.state;
    this.getSubMeasureValues();
  }
  getSubMeasureValues(){
    let {submeasure,credentials} = this.state;
    GET_GRAPH_DETAILS(submeasure,credentials.token)
      .then(res =>{
        console.log(res);
        if(res.error==undefined){
          let feed=[];
          if(res.MoM!=undefined){
            let obj={};
            let MoM=res.MoM;
            if(MoM.diff>0)
            obj.title=`your MoM for  ${res.MoM.subMeasure} is increased by ${Math.abs(MoM.diff)}`;
            if(MoM.diff<0)
            obj.title=`your MoM for  ${res.MoM.subMeasure} is decreased by ${Math.abs(MoM.diff)}`;
            if(MoM.diff==0)
            obj.title=`your MoM for  is same as last month`;
            feed.push(obj);
          }
          if(res.leader_diff!=undefined){
            let obj={};
            let leader_diff=res.leader_diff;
            if(leader_diff.self)
            obj.title=`You are leading with Rank 1 in this sub Measure! `;
            else{
              obj.title=`You are lagging  by ${leader_diff.diff} points in this sub Measure `;
            }
            feed.push(obj);
          }
          this.setState({
            graph_data:res.graph_data,
            feed:feed
          })
        }
      })
      .catch(err =>{
        console.log(err)
      })
  }

  render() {
    let {measurearray,montharray} = this.state.graph_data
    return (
      <Container style={styles.container}>
      <StatusBar
        backgroundColor="#2B2B2B"
        barStyle="light-content"
        />

        <Header androidStatusBarColor={COLORS.WHITE} iosBarStyle='light-content' style={styles.containerStyle}>
            <Left>
              <Icon name='ios-menu' style={{color:COLORS.WHITE}} onPress={() => this.props.navigation.openDrawer()} />
              </Left>
            <Body >
              <Text style={styles.statusHead}>{CONSTANTS.BHM}</Text>
            </Body>
        </Header>
        <View style={{flex:1,flexDirection:'column'}}>
            <View style={{flex:3.5,margin:20,backgroundColor:COLORS.WHITE,borderRadius:10,elevation:5}}>
                <Picker
                selectedValue={this.state.submeasure}
                style={{ height: 50, width: 130 ,marginLeft:25,alignItems:'center',textAlign:'center',justifyContent:'center'}}
                onValueChange={(itemValue, itemIndex) => this.setState({submeasure: itemValue},()=>this.getSubMeasureValues())}>
                    <Picker.Item label="KSFT" value="KSFT" />
                    <Picker.Item label="LONGS" value="LONGS" />
                    <Picker.Item label="DSFT" value="DSFT" />
                    <Picker.Item label="FB1" value="FB1" />
                    <Picker.Item label="FB2" value="FB2" />
                </Picker>
                 <View style={{flex:1,justifyContent:'center'}}>
                <Chart data={measurearray} month={montharray}/>
                </View>
            </View>
            <View style={{flex:2}}>
              <View style={{flex:0.2,flexDirection:'row'}}>
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

              <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>

                  <Feed feed={this.state.feed}/>
              </View>

            </View>
            <View style={{flex:1.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('LeaderBoard',{measure:CONSTANTS.BHM})}>
              <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.THEME,COLORS.END_GRADIENT]} style={styles.linearGradient}>
                <Text style={styles.buttonText}>
                  LeaderBoard <Icon name='md-arrow-forward' style={{ fontSize:23, color: COLORS.WHITE,marginLeft:20}} />
                </Text>
              </LinearGradient>
              </TouchableOpacity>
            </View>

        </View>
      </Container>
    );
  }
}

export default connect(mapStateToProps, null)(BhmPage);
