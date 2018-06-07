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
import Login from './src/views/Login';
import AuthService from './src/providers/AuthService';
import AppContainer from './src/views/AppContainer';

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
