import React, {Component} from 'react';

import {Provider} from 'react-redux';
import { persistor, store } from './store';
import BeforeLogin from './beforeLogin';
import AfterLogin from './navigation';
import { PersistGate } from 'redux-persist/integration/react';
import {Text,Platform,Linking} from 'react-native';
type Props = {};
export default class CheckState extends Component<Props> {
  constructor(props){
    super(props);
    let {auth}=store.getState()
    let comp=null
    if(auth.isLoggedIn==false){
      comp=<BeforeLogin/>
    }
    else{
      comp=<AfterLogin/>
    }
    this.state={
      comp:comp
    }
    this.reRender=this.reRender.bind(this)
    store.subscribe(this.reRender)
    console.log(store.getState())

  }

  reRender() {
    let {auth}=store.getState();
    let comp=null;
    console.log(auth);
    if(auth.isLoggedIn){
      comp = <AfterLogin/>;
    }
    else{
      comp=<BeforeLogin/>;
    }
    this.setState({
      comp:comp
    })

  }

  render() {
    return (
      this.state.comp
    );
  }
}
