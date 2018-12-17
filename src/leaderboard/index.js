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

type Props = {};
class LeaderBoard extends Component<Props> {
  constructor(props){
    super(props);
    this.state= {
        ranks:[
          {
          name:'Ram Agnecy'
          },
          {
          name:'Monkey Agnecy'
          },
          {
          name:'Tiger Agnecy'
          },
          {
          name:'Elephant Agnecy'
          },
          {
          name:'Rat Agnecy'
          },
      ]
    }
  }

  getProfile(value,i){
      return(
        <View colors={[COLORS.END_GRADIENT,COLORS.THEME]} style={{margin:10,borderRadius:10,elevation:5,flexDirection:'row',height:100,backgroundColor:COLORS.WHITE}} >
           <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
             <Image source={require('../images/profile.png')} style={{width:70,height:70,borderWidth:1,borderColor:COLORS.WHITE,borderRadius:10}}/>
           </View>
           <View style={{flex:2,flexDirection:'column'}}>
               <View style={{flex:1,justifyContent:'center',flexDirection:'row',borderBottomWidth:1,marginBottom:10}}>
                 <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
                    <Text style={{fontSize:16,color:COLORS.BLACK}}>{value.name}</Text>
                 </View>
                 <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../images/medal.png')} style={{width:10,height:20,textAlign:'right'}}/>
                 </View>
               </View>
               <View style={{flex:0.8,justifyContent:'center',flexDirection:'row'}}>
                 <View style={{flex:1,flexDirection:'column',}}>
                   <Text style={{fontSize:14,color:COLORS.BLACK}}><Text style={{fontSize:16}}>{`300`}</Text>{' Points'}</Text>

                 </View>
                 <View style={{flex:1,flexDirection:'column',}}>
                   <Text style={{fontSize:14,color:COLORS.BLACK,textAlign:'center',marginRight:10}}>Rank <Text style={{fontSize:16}}>{`${i+1}`}</Text></Text>

                 </View>
               </View>
           </View>
        </View>
      )
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
              <Text style={styles.statusHead}>{CONSTANTS.LEADER_BOARD}</Text>
            </Body>
        </Header>
        <View style={{flex:1,flexDirection:'column'}}>


             <View style={{flex:0.7,margin:10,borderRadius:10,flexDirection:'row'}}>
             <ImageBackground source={require('../images/leader_background.png')} style={{flex:1,flexDirection:'row',width: '100%', height: '100%',}} resizeMode={'contain'}>
                 <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../images/profile.png')} style={{width:100,height:100,borderWidth:3,borderColor:COLORS.WHITE,borderRadius:20}}/>
                 </View>
                 <View style={{flex:2,flexDirection:'column'}}>
                     <View style={{flex:1,justifyContent:'center'}}>
                       <Text style={{fontSize:22,color:COLORS.WHITE}}>{'Siva Agency'}</Text>
                       <Text style={{fontSize:12,color:COLORS.WHITE}}>{'@Siva'}</Text>
                     </View>
                     <View style={{flex:0.8,justifyContent:'center',flexDirection:'row'}}>
                       <View style={{flex:1,flexDirection:'column'}}>
                         <Text style={{fontSize:14,color:COLORS.WHITE}}>{'300'}</Text>
                         <Text style={{fontSize:14,color:COLORS.WHITE}}>{'Points'}</Text>
                       </View>
                       <View style={{flex:1,flexDirection:'column'}}>
                         <Text style={{fontSize:14,color:COLORS.WHITE}}>{'1'}</Text>
                         <Text style={{fontSize:14,color:COLORS.WHITE}}>{'Rank'}</Text>
                       </View>
                     </View>
                 </View>
              </ImageBackground>
             </View>


            <View style={{flex:2,}}>
                <ScrollView>
                  {
                    this.state.ranks.map((item,i) => this.getProfile(item,i))
                  }
                </ScrollView>

            </View>


        </View>
      </Container>
    );
  }
}
// <View style={{flex:1.5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
//   <TouchableOpacity>
//   <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.THEME,COLORS.END_GRADIENT]} style={styles.linearGradient}>
//     <Text style={styles.buttonText}>
//       LeaderBoard <Icon name='md-arrow-forward' style={{ fontSize:23, color: COLORS.WHITE,marginLeft:20}} />
//     </Text>
//   </LinearGradient>
//   </TouchableOpacity>
// </View>
export default connect(null, null)(LeaderBoard);
// <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={[COLORS.END_GRADIENT,COLORS.THEME]} style={{flex:0.7,margin:10,borderRadius:10,elevation:5,flexDirection:'row'}} >
