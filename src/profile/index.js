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
class Profile extends Component<Props> {
  constructor(props){
    super(props);
    this.state= {
      name:'',
      email:'',
      password:'',
      website:'',
      gst:''
    }
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
              <Text style={styles.statusHead}>{CONSTANTS.PROFILE}</Text>
            </Body>
        </Header>
        <View style={{flex:1,flexDirection:'column'}}>
            <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:3,justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../images/profile.png')}
                        style={{width:100,height:105}}
                      />
                  </View>
                  <View style={{flex:5,justifyContent:'center',alignItems:'flex-start',marginTop:20,marginBottom:20,paddingLeft:10}}>
                      <Text style={{fontSize:28,fontWeight:'bold'}}>{'Siva Agency'}</Text>
                      <Text style={{fontSize:18}}>{'Hosur'}</Text>
                  </View>
            </View>
            <View style={{flex:3}}>
              <ScrollView>
              <Text style={styles.profiletextHeader}>{CONSTANTS.LOGINFORM.NAME}</Text>
              <TextInput
                style={styles.profiletextInputLayout}
                 value={this.state.name}
                onChangeText={name => this.setState({ name: name  })}
              />
              <Text style={styles.profiletextHeader}>{CONSTANTS.LOGINFORM.EMAIL}</Text>
              <TextInput
                style={styles.profiletextInputLayout}
                 value={this.state.email}
                onChangeText={email => this.setState({ email: email  })}
              />
              <Text style={styles.profiletextHeader}>{CONSTANTS.LOGINFORM.WEBSITE}</Text>
              <TextInput
                style={styles.profiletextInputLayout}
                 value={this.state.website}
                onChangeText={website => this.setState({ website: website  })}
              />
              <Text style={styles.profiletextHeader}>{CONSTANTS.LOGINFORM.PASSWORD}</Text>
              <TextInput
                style={styles.profiletextInputLayout}
                 secureTextEntry value={this.state.password}
                onChangeText={password => this.setState({ password: password  })}
              />
              <Text style={styles.profiletextHeader}>{CONSTANTS.LOGINFORM.GST}</Text>
              <TextInput
                style={styles.profiletextInputLayout}
                secureTextEntry value={this.state.gst}
                onChangeText={gst => this.setState({ gst: gst  })}
              />
              </ScrollView>
            </View>
            <View style={{flex:0.4,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
            <TouchableHighlight style={styles.defaultbutton}>
                <Text style={styles.defaultbuttonText}>{CONSTANTS.DEFAULT}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.savebutton}>
                <Text style={styles.savebuttonText}>{CONSTANTS.SAVE}</Text>
            </TouchableHighlight>
            </View>

        </View>
      </Container>
    );
  }
}

export default connect(null, null)(Profile);
