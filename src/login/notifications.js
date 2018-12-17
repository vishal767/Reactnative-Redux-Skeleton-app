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
type Props = {};
class Notification extends Component<Props> {
  constructor(props){
    super(props);
    this.state= {
      name:'',
      email:'',
      password:'',
      website:'',
      gst:'',
      notifications:[
        {
          desc:'Tomorrow new product launch',
          time:'2 days ago'
        },
        {
          desc:'Payment Due by $100',
          time:'1 month ago'
        },
        {
          desc:'Welcome to Our new UI',
          time:'2 months ago'
        }

      ]

    }
  }
  getNotifications(){
      let {notifications}=this.state;
      let renderer=[];
      notifications.forEach(index => {
        let comp = (
          <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:COLORS.DIM_GREY,marginBottom:5}}>
            <View style={{flex:0.1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Icon name='ios-notifications' style={{color:'red'}} />
            </View>
            <View style={{flex:0.9,flexDirection:'column',justifyContent:'center',marginBottom:5}}>
              <Text style={{fontSize:16,color:COLORS.BLACK,textAlign:'left',marginBottom:5}}>{index.desc}</Text>
              <Text style={{fontSize:12,color:COLORS.DIM_GREY,textAlign:'right',marginRight:10}}>{index.time}</Text>
            </View>
          </View>
        )
        renderer.push(comp)
      })
      return renderer;
  }
  render() {
    return (
      <Container style={styles.container}>
      <StatusBar
        backgroundColor="#2B2B2B"
        barStyle="light-content"
        />

        <Header androidStatusBarColor={COLORS.WHITE} iosBarStyle='light-content' style={styles.containerStyle}>

            <Body style={{alignItems:'center'}}>
              <Text style={{textAlign:'center',color:'#fff'}}>{CONSTANTS.NOTIFICATIONS}</Text>
            </Body>
        </Header>
        <View style={{flex:1,flexDirection:'column'}}>
          <ScrollView>
            {this.getNotifications()}
          </ScrollView>
        </View>
      </Container>
    );
  }

}

export default connect(null, null)(Notification);
