import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Alert,
  TextInput,
  StatusBar,
  AsyncStorage,
  ImageBackground
} from 'react-native';
import {
    Container,
    Content,
    Text,
  } from "native-base";
  import appImage from './src/images/back.png';
  import {connect} from 'react-redux';
  import {CONSTANTS} from './Constants';



type Props = {};


 class StartPage extends Component<Props> {
    constructor(props){
    super(props);
    this.state={

      email: '',
      password: ''
    }
    this.org = this.org.bind(this);
    }

  login(){

  }
  org()
{


}
  render() {

    return (
        <Container style={styles.container}>
        <StatusBar
          backgroundColor="#2B2B2B"
          barStyle="light-content"
          />
          <ImageBackground source={require('./src/images/back.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.MainView}>
        <Content>
        <View style={styles.headerView}>
          <Text style={styles.header}>{CONSTANTS.APPNAME}</Text>
        </View>
        <View style={styles.loginView}>

        <Text style={styles.textHeader}>{CONSTANTS.EMAIL}</Text>
        <TextInput
          style={styles.textInputLayout}
          value={this.state.email}
          onChangeText={email => this.setState({ email: email  })}
          keyboardType='email-address'
          autoCapitalize="none"
        />
        <Text style={styles.textHeader}>{CONSTANTS.PASSWORD}</Text>
        <TextInput
          style={styles.textInputLayout}
          secureTextEntry value={this.state.password}
          onChangeText={password => this.setState({ password: password  })}
        />
        </View>

          <TouchableHighlight style={styles.signin}
          onPress={this.login.bind(this)}>
            <Text style={styles.LoginText}>{CONSTANTS.LOGIN}</Text>
          </TouchableHighlight>
          </Content>
          </View>
          </ImageBackground>
      </Container>
    );
  }
}
export default connect(null, null)(StartPage);

const styles = StyleSheet.create({
  MainView:{
    height: '100%',
     width: '100%',
    flex:1,
   },
  headerView:{ justifyContent: 'center', alignItems: 'center', height: 200, paddingTop: 40},
  header:{
    color:CONSTANTS.APPCOLOR,
    fontFamily:'Lato',
    fontSize:70
  },
  loginView:{ marginLeft: '10%',marginRight: '10%'},
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
      borderRadius:70,
       backgroundColor: CONSTANTS.APPCOLOR,
        margin: 50,
         height: 50
       },
       textHeader:{ color:CONSTANTS.TEXTLABELCOLOR, marginTop: 10, marginBottom:5},
       textInputLayout:{borderBottomColor: 'gray', borderBottomWidth: 1, color: 'white', height: 40},
  });

  // <Header androidStatusBarColor='#2D2D2D' style={{backgroundColor:'#2B2B2B'}}>
  //       <Left style={{marginLeft:5}}>
  //         <Icon name='ios-menu' style={{color:'#fff'}} onPress={() => this.props.navigation.openDrawer()} />
  //         </Left>
  //       <Body style={{align:'center'}} >
  //         <Image source={require('../img/pragyaam-white.png')} style={{width:114.5, height: 20.5}} />
  //       </Body>
  //       <Right style={{marginRight:5}}>
  //         <Icon name='ios-menu' style={{color:'#2D2D2D'}}  />
  //         </Right>
  //     </Header>
