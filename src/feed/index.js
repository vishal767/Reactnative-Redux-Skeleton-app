import React, {Component} from 'react';

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
import {GET_OVERALL_DETAILS} from '../api';
import Carousel from 'react-native-snap-carousel';
type Props = {};
const mapStateToProps = state => ({
  credentials:state.auth
});
class Feed extends Component<Props> {
  constructor(props){
    super(props);
    this.state= {

      credentials:this.props.credentials,
      feed:this.props.feed
    }
  }

  _renderItem({item, index}) {
          return (
              <View style={{backgroundColor:COLORS.WHITE,height:90,justifyContent:'center',elevation:2,borderWidth:0,borderRadius:7}}>
                  <View style={{flex:1,flexDirection:'row',borderRadius:10}}>
                    <View style={{flex:2,justifyContent:'center',alignItems:'center'}}>
                      <Image source={require('../images/rocket.png')}
                          style={{width:80,height:80}}
                        />
                    </View>
                    <View style={{flex:5,justifyContent:'center',alignItems:'center',marginRight:20}}>
                        <Text >{ item.title}</Text>
                    </View>
                  </View>
              </View>
          );
      }

  render() {
    return (
      <Carousel
            ref={(c) => { this._carousel = c; }}
            layout={'tinder'}
            layoutCardOffset={10}
            data={this.props.feed}
            renderItem={this._renderItem}
            sliderWidth={450}
            itemWidth={400}
            loop={true}

          />
    );
  }
}

export default connect(mapStateToProps, null)(Feed);
