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
    Content,
    Text,
  } from "native-base";
  import appImage from '../images/back.png';
  import {connect} from 'react-redux';
  import {CONSTANTS,COLORS,styles} from '../../Constants';
import {LOGINAPI} from '../api';
import {updateLogin} from '../actions/appAction';

type Props = {};

const mapStateToProps = state => ({
  isLoggedIn:state.auth.isLoggedIn
});
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
    let {email,password}=this.state;
    LOGINAPI(email,password)
      .then(res => {
        console.log(res)
        if(res.error==undefined){
            this.props.updateLogin(res.id,true,res.userId);
        }
      })
      .catch(err => {
        console.log(err)
      })
  //  this.props.updateLogin("token",true);

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
          <ImageBackground source={require('../images/back.png')} style={{width: '100%', height: '100%'}}>
        <View style={styles.MainView}>
        <Content>

        <View style={styles.headerView}>
        <Image
        style={{width: 60, height: 65}}
        source={require('../images/logo.png')}
        />
        </View>
        <View style={styles.loginView}>

        <ImageBackground source={require('../images/login-background.png')} style= {{flex:1 , width: null,height:null}} resizeMode={'contain'}>
        <Text style={{color:COLORS.BLACK,marginTop:70,marginLeft:20,fontSize:20}}>{CONSTANTS.LOGIN}</Text>
        <TextInput
          style={styles.textInputLayout}
          value={this.state.email}
          placeholder={CONSTANTS.USERNAME}
          placeholderTextColor={COLORS.BLACK}
          onChangeText={email => this.setState({ email: email  })}
          keyboardType='email-address'
          autoCapitalize="none"
        />

        <TextInput
          style={styles.textInputLayout}
          placeholder={CONSTANTS.PASSWORD}
          placeholderTextColor={COLORS.BLACK}
          secureTextEntry value={this.state.password}
          onChangeText={password => this.setState({ password: password  })}
        />

        <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity style={{marginRight:20,width:70,}}
          onPress={this.login.bind(this)}>
          <Image
          style={{width: 70, height: 70,borderRadius:25}}
          imageStyle={{borderRadius:20}}
          source={require('../images/login-button-image.png')}
          />
          </TouchableOpacity>
          </View>
            </ImageBackground>
        </View>
          </Content>
          </View>
          </ImageBackground>
      </Container>
    );
  }
}
export default connect(mapStateToProps, {updateLogin})(StartPage);


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
  // </Header>
