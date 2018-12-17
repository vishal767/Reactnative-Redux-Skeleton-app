import React, {Component} from 'react';

import {Provider} from 'react-redux';
import { persistor, store } from './store';
import Navigation from './navigation';
import { PersistGate } from 'redux-persist/integration/react'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
      <PersistGate  persistor={persistor}>
          <Navigation />
        </PersistGate>
        </Provider>
    );
  }
}
