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
  ScrollView
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
type Props = {};
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
      ]
    }
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
                <Text style={{fontSize:20,color:COLORS.BLACK,margin:15,justifyContent:'center'}}>{'Money optimization'} <Icon name='ios-arrow-down'
                 style={{ fontSize:20, color: COLORS.BLACK}} /></Text>
                 <View style={{flex:1,justifyContent:'center'}}>
                <Chart/>
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
            <View style={{flex:1.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('LeaderBoard')}>
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

export default connect(null, null)(BhmPage);
