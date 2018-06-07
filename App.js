/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
var Login = require('./Login');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    }
  }
  componentDidMount(){
    AuthService.getAuthInfo((error, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }
  onLogin(){
    this.setState({isLoggedIn: true})
  }
  onLogout(){
    this.setState({isLoggedIn: false})
  }
  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicator
            animating={true}
            size="large"
            />
        </View>
      )
    }
    if (this.state.isLoggedIn){
      return (
        <AppContainer onLogout={this.onLogout.bind(this)}/>
      )
    } else {
      return (
        <Login onLogin={this.onLogin.bind(this)}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
