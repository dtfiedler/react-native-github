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
    this.onLogin = this.onLogin.bind(this);
  }
  componentDidMount(){
    AuthService.getAuthInfo((error, authInfo) => {
      console.log(authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }
  onLogin(){
    this.setState({isLoggedIn: true})
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
        <AppContainer/>
      )
    } else {
      return (
        <View style={styles.container}>
          <Login onLogin={this.onLogin}/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
});
