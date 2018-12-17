import React, { Component } from 'react';
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
  import appImage from '../images/back.png';
  import {connect} from 'react-redux';
  import {CONSTANTS,COLORS,styles} from '../../Constants';
  import Notification from './notifications';
import Carousel from 'react-native-snap-carousel';
import SideMenu from 'react-native-side-menu';

type Props = {};


 class Home extends Component<Props> {
    constructor(props){
    super(props);
    this.state={

      email: '',
      password: '',
      feed:[
        {
          title:'name',
          name:'name'
        },
        {
          title:'name1',
          name:'name1'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        },
        {
          title:'name2',
          name:'name2'
        }
      ],
      notification:false
    }
    this.org = this.org.bind(this);
    }

  login(){
    this.props.navigation.navigate('Login');
  }
  org()
{


}
_renderItem ({item, index}) {
        return (
            <View style={{backgroundColor:COLORS.WHITE,height:90,justifyContent:'center',elevation:2,borderWidth:0,borderRadius:7}}>
                <View style={{flex:1,flexDirection:'row',borderRadius:10}}>
                  <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../images/rocket.png')}
                        style={{width:80,height:80}}
                      />
                  </View>
                  <View style={{flex:5,justifyContent:'center',alignItems:'center'}}>
                      <Text >{ 'Your Money optimization metric has been decresed by 10%'}</Text>
                  </View>
                </View>
            </View>
        );
    }
  render() {
    const menu = <Notification/>;
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
          <View style={{flex:1,justifyContent:'center',}}>

                  <View style={{flex:1,flexDirection:'row',borderRadius:10,margin:20,elevation:3,backgroundColor:COLORS.WHITE}}>
                                        <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../images/profile.png')}
                          style={{width:100,height:105}}
                        />
                    </View>
                    <View style={{flex:5,justifyContent:'center',alignItems:'flex-start',borderLeftColor:'red',borderLeftWidth:1,borderColor:COLORS.DIM_GREY,marginTop:20,marginBottom:20,paddingLeft:10}}>
                        <Text style={{fontSize:28,fontWeight:'bold'}}>{'Siva Agency'}</Text>
                        <Text style={{fontSize:18}}>{'Hosur'}</Text>
                    </View>

                  </View>

          </View>
          <View style={{flex:2,}}>
            <View style={{flex:1,flexDirection:'row',}}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Bhm')}>
                  <Image source={require('../images/group1.png')} style= {{ width: 135,height:135}}/>
                </TouchableOpacity>

              </View>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('Bhm')}>
                <Image source={require('../images/group2.png')} style= {{ width: 135,height:135}} />
              </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Bhm')}>
                  <Image source={require('../images/group4.png')} style= {{ width: 135,height:135}} />
                </TouchableOpacity>
              </View>
              <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Bhm')}>
                  <Image source={require('../images/group3.png')} style= {{ width: 135,height:135}}/>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex:0.3,flexDirection:'row'}}>
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
          </View>
          <View style={{flex:0.8,justifyContent:'center',alignItems:'center',marginBottom:10}}>

            <Carousel
                  ref={(c) => { this._carousel = c; }}
                  layout={'tinder'}
                  layoutCardOffset={10}
                  data={this.state.feed}
                  renderItem={this._renderItem}
                  sliderWidth={450}
                  itemWidth={400}
                  loop={true}

                />
          </View>

          </View>

          </SideMenu>
      </Container>
    );
  }
}
export default connect(null, null)(Home);

// <ImageBackground source={require('../images/group3.png')} style= {{flex:1 , width: null,height:null}} resizeMode={'contain'}>
