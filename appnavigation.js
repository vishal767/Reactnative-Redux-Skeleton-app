import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator as StackNavigator,createDrawerNavigator as DrawerNavigator,createAppContainer } from 'react-navigation'
import LoginScreen from './src/login/start';
import HomeScreen from './src/login/home';



// drawer stack
const DrawerStack = DrawerNavigator({
  home:{screen:HomeScreen}
})

const DrawerNavigation = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({navigation}) => ({
    headerStyle: {backgroundColor: 'green'},
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
})

// login stack
const LoginStack = StackNavigator({
  loginScreen: { screen: LoginScreen },
}, {
  headerMode: 'float',
  navigationOptions: {
    headerStyle: {backgroundColor: 'red'},
    title: 'You are not logged in'
  }
})

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNavigation }
}, {
  // Default config for all screens
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'loginStack'
})

export default createAppContainer(PrimaryNav)
