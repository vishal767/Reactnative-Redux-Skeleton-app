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



export default DN;
