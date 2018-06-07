import React from 'react';
import {TextInput, Text, View, ListView, StyleSheet, TabBarIOS, ActivityIndicator, TouchableHighlight} from 'react-native';
import moment from 'moment';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Octicons';
import AuthService from '../providers/AuthService';
import config from '../../config';

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: true
        }
    }

    logout(){
        console.log('logging user out')
        AuthService.logout(() => {
            console.log(this.props)
            this.props.onLogout();
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <TouchableHighlight underlayColor="#D7D7D7"
                onPress={() => this.logout()} style={styles.button}>
                <View style={styles.row}>   
                   <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>LOG OUT</Text>
                </View>
                </TouchableHighlight>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 5,
        width: 150,
        padding: 10,
        shadowColor: "#D7D7D7",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0,
        }
    }
});

module.exports = Settings;