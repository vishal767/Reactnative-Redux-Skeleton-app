import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  ImageBackground
} from 'react-native';
import {createDrawerNavigator, DrawerItems, createStackNavigator} from 'react-navigation';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  Thumbnail
} from "native-base";
import StartPage from './src/login/start';
import HomePage from './src/login/home';
import {styles,CONSTANTS,COLORS} from './Constants';
import {store} from './store';
import Profile from './src/profile';
import BhmPage from './src/bhm';
import LeaderBoard from './src/leaderboard';

const DN = createStackNavigator({
  Login: { screen: StartPage },
  Home:{screen:HomePage},
  Profile:{screen:Profile},
  LeaderBoard:{screen:LeaderBoard}

},{
  initialRouteName: 'Login',
  headerMode: 'none',
});

const Navigation = createDrawerNavigator(
      {
          Home: { screen: DN,
          navigationOptions: {
            drawerIcon: (
                <Icon name='ios-battery-full'
                 style={{ height: 25, width: 25, color: COLORS.WHITE}} />
            )
        }

        },
          Profile :{ screen:Profile,
            navigationOptions: {
              drawerIcon: (
                  <Icon name='ios-code'
                   style={{ height: 25, width: 25, color: COLORS.WHITE}} />
              )
          }

        },
          Bhm :{ screen:BhmPage,
            navigationOptions: {
              drawerIcon: (
                  <Icon name='ios-cut'
                   style={{ height: 25, width: 25, color: COLORS.WHITE}} />
              )
          }

        },
        LeaderBoard :{ screen:LeaderBoard,
          navigationOptions: {
            drawerIcon: (
                <Icon name='ios-cut'
                 style={{ height: 25, width: 25, color: COLORS.WHITE}} />
            )
        }

      }


      },{
        initialRouteName: 'Home',
        contentComponent: props => (<Container style={{backgroundColor:COLORS.BLACK}}>

          <View style={{ height: 200,backgroundColor:COLORS.THEME}}>
          <View style={{ paddingTop: 10}}>
          <Thumbnail source={{ uri: 'https://scontent.fmaa6-1.fna.fbcdn.net/v/t1.0-9/16196015_10154888128487744_6901111466535510271_n.png?_nc_cat=0&oh=6da437130d78e97d71766515a28ab5cc&oe=5BDFF2E9'}}
           style={{height: 85, width: 85, borderRadius: 42.5,paddingTop: 50, alignSelf: 'center'}} />
           <Text style={{ color: COLORS.WHITE, textAlign:'center', paddingTop: 20}}>{'Profile'}</Text>
          </View>
          </View>

          <Content >
          <DrawerItems {...props}
          getLabel = {(scene) => (
                  <View style={styles.Drawerbutton}>
                    <Text style={styles.DrawerbuttonText}>{props.getLabel(scene)}</Text>
                  </View>
                )}
          />
          </Content>
          </Container>),
          contentOptions: {
            activeTintColor :COLORS.WHITE,
            inactiveTintColor :COLORS.BLACK,
            activeBackgroundColor :COLORS.THEME,
            inactiveBackgroundColor :COLORS.BLACK,
          }
    }
    );

export default Navigation;
