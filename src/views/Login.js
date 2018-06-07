import React from 'react';
import {Modal, Text, View, StyleSheet, Image, TextInput, TouchableHighlight, ActivityIndicator} from 'react-native';
import AuthService from '../providers/AuthService';
import config from '../../config';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showProgress: false
        }
    }
    render() {
        var errorCtrl = <View/>;
        if (!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>Invalid username and/or password</Text>
        } 

        if (!this.state.success && this.state.unknownError){
            errorCtrl = <Text style={styles.error}>Something went wrong, please try again.</Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../assets/logo.png')}/>
                <TextInput 
                        style={styles.input} 
                        autoCapitalize='none'
                        placeholder="Github Username"
                        onChangeText={(text) => this.setState({username: text})}>
                    </TextInput>
                <TextInput 
                        style={styles.input} 
                        placeholder="Github Password" 
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}>
                    </TextInput>
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={this._onLoginPressed.bind(this)}>
                        <Text style={styles.buttonText}>Log in</Text>
                    </TouchableHighlight>
                
                    {errorCtrl}

                    <ActivityIndicator
                        animating={this.state.showProgress}
                        size="large"
                        style={styles.loader}
                        />
             </View>
        )
    }

    _onLoginPressed(){
        this.setState({showProgress: true});
        AuthService.login({
            username: this.state.username,
            password: this.state.password
        }, (results) => {
            this.setState(Object.assign({
                showProgress: false},results));
            if(results.success && this.props.onLogin){
                this.props.onLogin();
            }
        })
    }

};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    logo: {
        width:250,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    input: {
        height: 50,
        width: 300,
        marginTop: 10,
        padding:5,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#48BBEC',
        alignSelf: 'center'
    },
    button: {
        marginTop: 10, 
        height: 50,
        width: 300,
        backgroundColor: '#48BBEC',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }, 
    buttonText: {
        fontSize: 22,
        color: 'white',
        alignSelf: 'center'
    },
    loader: {
        marginTop: 20
    },
    error: {
        color: 'red',
        marginTop: 10,
        alignSelf: 'center'
    }
})
module.exports = Login;